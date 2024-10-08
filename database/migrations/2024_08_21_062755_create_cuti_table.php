<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cuti', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_induk')->index();
            $table->date('tanggal_cuti');
            $table->unsignedTinyInteger('lama_cuti');
            $table->string('keterangan');
            $table->timestamps();

            $table->foreign('nomor_induk')
                ->references('nomor_induk')
                ->on('karyawan')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cuti');
    }
};
