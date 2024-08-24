<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuti extends Model
{
    use HasFactory;

    protected $table = 'cuti';

    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class, 'nomor_induk', 'nomor_induk');
    }
}
