<?php

namespace App\Http\Controllers;

use App\Http\Resources\APICollection;
use App\Http\Resources\KaryawanResource;
use App\Models\Karyawan;
use Illuminate\Http\Request;

class KaryawanController extends Controller
{
    public function index(Request $request)
    {
        $karyawan = Karyawan::query();

        if ($request->has('order_by')) {
            if ($request->query('dir') === 'desc')
                $karyawan = $karyawan->orderByDesc($request->query('order_by'));
            else
                $karyawan = $karyawan->orderBy($request->query('order_by'));
        }

        if ($request->has('q')) {
            $q = $request->query('q');
            $karyawan = $karyawan->where('nomor_induk', 'like', "%$q%")
                ->orWhere('nama', 'like', "%$q%")
                ->orWhere('alamat', 'like', "%$q%");
        }

        $karyawan = $karyawan->paginate($request->query('limit') ?? 10, ['*'], 'page', $request->query('page') ?? 1);

        return new APICollection(KaryawanResource::collection($karyawan), $karyawan->currentPage(), $karyawan->perPage(), $karyawan->total());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomor_induk' => 'required',
            'nama' => 'required',
            'alamat' => 'required',
            'tanggal_lahir' => 'required',
            'tanggal_bergabung' => 'required'
        ]);

        $karyawan = new Karyawan;
        $karyawan->nomor_induk = $request->nomor_induk;
        $karyawan->nama = $request->nama;
        $karyawan->alamat = $request->alamat;
        $karyawan->tanggal_lahir = $request->tanggal_lahir;
        $karyawan->tanggal_bergabung = $request->tanggal_bergabung;

        $karyawan->save();

        return response(null, 201);
    }

    public function show(String $nomorInduk)
    {
        $karyawan = Karyawan::where('nomor_induk', $nomorInduk)->first();
        return response(['data' => new KaryawanResource($karyawan)]);
    }

    public function update(Request $request, String $nomorInduk)
    {
        $karyawan = Karyawan::where('nomor_induk', $nomorInduk)->first();

        if (!$karyawan)
            return response(null, 404);

        $karyawan->nama = $request->nama ?? $karyawan->nama;
        $karyawan->alamat = $request->alamat ?? $karyawan->alamat;
        $karyawan->tanggal_lahir = $request->tanggal_lahir ?? $karyawan->tanggal_lahir;
        $karyawan->tanggal_bergabung = $request->tanggal_bergabung ?? $karyawan->tanggal_bergabung;

        $karyawan->save();

        return response(null, 201);
    }

    public function destroy(String $nomorInduk)
    {
        $karyawan = Karyawan::where('nomor_induk', $nomorInduk)->first();

        if (!$karyawan)
            return response(null, 404);

        $karyawan->delete();

        return response(null, 201);
    }
}
