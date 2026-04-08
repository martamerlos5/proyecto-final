<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


// ----- AUTHCONTROLLER ----
Route::post('/login', [AuthController::class, 'validarLogin']);
Route::post('/registro', [AuthController::class, 'validarRegistro']);
Route::post('/logout', [AuthController::class, 'cerrarSesion']);



// ----- USUARIOS ----
Route::get('/usuarios', [UsuarioController::class, 'getUsuarios']);