<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CutiSisaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'nomor_induk' => $this->nomor_induk,
            'nama' => $this->karyawan->nama ?? $this->nama ?? null,
            'sisa_cuti' => $this->sisa_cuti,
        ];
    }
}
