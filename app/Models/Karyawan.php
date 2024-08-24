<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    use HasFactory;

    protected $table = 'karyawan';

    public function cuti()
    {
        return $this->hasMany(Cuti::class, 'nomor_induk', 'nomor_induk');
    }

}
