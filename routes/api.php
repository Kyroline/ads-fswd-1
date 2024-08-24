<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CutiController;
use App\Http\Controllers\KaryawanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/karyawan', [KaryawanController::class, 'index']);
    Route::post('/karyawan', [KaryawanController::class, 'store']);
    Route::get('/karyawan/sisa-cuti', [CutiController::class, 'getSisaCuti']);
    Route::get('/karyawan/{nomorInduk}', [KaryawanController::class, 'show']);
    Route::put('/karyawan/{nomorInduk}', [KaryawanController::class, 'update']);
    Route::delete('/karyawan/{nomorInduk}', [KaryawanController::class, 'destroy']);

    Route::get('/cuti', [CutiController::class, 'index']);
    Route::post('/cuti', [CutiController::class, 'store']);
    Route::get('/cuti/{id}', [CutiController::class, 'show']);
    Route::put('/cuti/{id}', [CutiController::class, 'update']);
    Route::delete('/cuti/{id}', [CutiController::class, 'destroy']);
});
