<?php

namespace App\Http\Controllers;

use App\Http\Resources\APICollection;
use App\Http\Resources\CutiResource;
use App\Http\Resources\CutiSisaResource;
use App\Models\Cuti;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CutiController extends Controller
{
    public function index(Request $request)
    {
        $karyawan = Cuti::query()
            ->select('cuti.*')
            ->selectRaw('DATE_ADD(tanggal_cuti, INTERVAL lama_cuti - 1 DAY) as date_end')
            ->join('karyawan', 'cuti.nomor_induk', '=', 'karyawan.nomor_induk')
            ->addSelect('karyawan.nama');

        if ($request->has('karyawan'))
            $karyawan = $karyawan->where('nomor_induk', '=', $request->query('karyawan'));

        if ($request->has('order_by')) {
            if ($request->query('dir') === 'desc')
                $karyawan = $karyawan->orderByDesc($request->query('order_by'));
            else
                $karyawan = $karyawan->orderBy($request->query('order_by'));
        }

        if ($request->has('q')) {
            $q = $request->query('q');
            $karyawan = $karyawan->where('cuti.nomor_induk', 'like', "%$q%")
                ->orWhere('karyawan.nama', 'like', "%$q%");
        }

        $karyawan = $karyawan->paginate($request->query('limit') ?? 10, ['*'], 'page', $request->query('page') ?? 1);

        return new APICollection(CutiResource::collection($karyawan), $karyawan->currentPage(), $karyawan->perPage(), $karyawan->total());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomor_induk' => 'required',
            'tanggal_cuti' => 'required',
            'lama_cuti' => 'required',
            'keterangan' => 'required'
        ]);

        $cuti = new Cuti;
        $cuti->nomor_induk = $request->nomor_induk;
        $cuti->tanggal_cuti = $request->tanggal_cuti;
        $cuti->lama_cuti = $request->lama_cuti;
        $cuti->keterangan = $request->keterangan;

        $cuti->save();

        return response(null, 201);
    }

    public function show(String $nomorInduk)
    {
        $cuti = Cuti::where('nomor_induk', '=', $nomorInduk);

        return response(['data' => new CutiResource($cuti)]);
    }

    public function update(Request $request, String $nomorInduk)
    {
        $cuti = Cuti::where('nomor_induk', '=', $nomorInduk);

        if ($cuti)
            return response(null, 404);

        $cuti->tanggal_cuti = $request->tanggal_cuti;
        $cuti->lama_cuti = $request->lama_cuti;

        $cuti->save();

        return response(null, 201);
    }

    public function destroy(String $id)
    {
        $karyawan = Cuti::find($id);

        if (!$karyawan)
            return response(null, 404);

        $karyawan->delete();

        return response(null, 201);
    }

    public function getSisaCuti(Request $request)
    {
        $tahun = $request->query('tahun') ?? date("Y");
        $cutiTahunIni = DB::table('cuti')
            ->select(
                'nomor_induk',
                'tanggal_cuti',
                DB::raw("DATE_ADD(tanggal_cuti, INTERVAL lama_cuti - 1 DAY) AS tanggal_selesai"),
                DB::raw("
                    CASE 
                        WHEN tanggal_cuti < '" . $tahun . "-01-01' AND DATE_ADD(tanggal_cuti, INTERVAL lama_cuti - 1 DAY) >= '" . $tahun . "-01-01' 
                        THEN '" . $tahun . "-01-01'
                        ELSE tanggal_cuti
                    END AS tanggal_mulai_2024
                "),
                DB::raw("
                    CASE
                        WHEN DATE_ADD(tanggal_cuti, INTERVAL lama_cuti - 1 DAY) > '" . $tahun . "-12-31' 
                        THEN '" . $tahun . "-12-31'
                        ELSE DATE_ADD(tanggal_cuti, INTERVAL lama_cuti - 1 DAY)
                    END AS tanggal_selesai_2024
                ")
            )
            ->where('tanggal_cuti', '<=', $tahun . '-12-31')
            ->whereRaw("DATE_ADD(tanggal_cuti, INTERVAL lama_cuti - 1 DAY) >= '" . $tahun . "-01-01'");

        $karyawan = DB::table('karyawan')
            ->leftJoinSub($cutiTahunIni, 'CutiTahunIni', function ($join) {
                $join->on('karyawan.nomor_induk', '=', 'CutiTahunIni.nomor_induk');
            })
            ->select(
                'karyawan.*',
                DB::raw("12 - COALESCE(SUM(DATEDIFF(CutiTahunIni.tanggal_selesai_2024, CutiTahunIni.tanggal_mulai_2024) + 1), 0) AS sisa_cuti")
            )->where('tanggal_bergabung', '<=', $tahun . '-12-31')
            ->groupBy('karyawan.id', 'karyawan.nomor_induk', 'karyawan.nama', 'karyawan.alamat', 'karyawan.tanggal_lahir', 'karyawan.tanggal_bergabung', 'karyawan.created_at', 'karyawan.updated_at');

        if ($request->has('q')) {
            $q = $request->query('q');
            $karyawan = $karyawan->where('karyawan.nomor_induk', 'like', "%$q%")
                ->orWhere('karyawan.nama', 'like', "%$q%")
                ->orWhere('karyawan.alamat', 'like', "%$q%");
        }

        if ($request->has('order_by')) {
            if ($request->query('dir') === 'desc')
                $karyawan = $karyawan->orderByDesc($request->query('order_by'));
            else
                $karyawan = $karyawan->orderBy($request->query('order_by'));
        }

        $karyawan = $karyawan->paginate($request->query('limit') ?? 10, ['*'], 'page', $request->query('page') ?? 1);

        return new APICollection(CutiSisaResource::collection($karyawan), $karyawan->currentPage(), $karyawan->perPage(), $karyawan->total());
    }
}
