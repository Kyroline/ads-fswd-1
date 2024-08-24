<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CutiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nomor_induk' => $this->nomor_induk,
            'nama' => $this->karyawan->nama ?? $this->nama ?? null,
            'tanggal_cuti' => $this->tanggal_cuti,
            'lama_cuti' => $this->lama_cuti,
            'tanggal_akhir' => $this->date_end,
            'keterangan' => $this->keterangan
        ];
    }
}
