<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;


// ----- AUTHCONTROLLER ----
// validaciones usuario
Route::post('/login', [AuthController::class, 'validarLogin']);
Route::post('/registro', [AuthController::class, 'validarRegistro']);
Route::post('/logout', [AuthController::class, 'cerrarSesion']);

// validaciones usuario Administrador
Route::post('/login-admin', [AuthController::class, 'validarLogin']);
Route::post('/registro-admin',[AuthController::class,'validarRegistroAdmin']);



// ----- USUARIOCONTROLLER ----

// get all usuarios
Route::get('/usuarios', [UsuarioController::class, 'getUsuarios']);
// get usuarios clientes
Route::get('/dashboard-admin/usuarios', [UsuarioController::class, 'getUsuariosClientes']);
// editar perfil
Route::put('/usuario/perfil/{id}', [UsuarioController::class, 'editarPerfil']);
// editar dirección
Route::put('/usuario/direccion/{id}', [UsuarioController::class, 'editarDireccion']);
// cambiar contraseña
Route::put('/usuario/password/{id}', [UsuarioController::class, 'cambiarPassword']);
// eliminar cuenta
Route::delete('/usuario/{id}', [UsuarioController::class, 'eliminarCuenta']);
// recuperar contraseña
Route::post('/recuperar-password', [UsuarioController::class, 'recuperarPassword']);




// -- NEWSLETTERCONTROLLER -- 

// suscribirse en la newsletter
Route::post('/newsletter', [NewsletterController::class, 'suscribirse']);
// get all cupones
Route::get('/newsletter/cupones/{email}', [NewsletterController::class, 'getCupones']);
// darse de baja en la newsletter
Route::put('/newsletter/baja/{email}', [NewsletterController::class, 'bajaNewsletter']);
// usar los cupones en la pasarela de pago
Route::put('/newsletter/usar/{email}/{codigo}', [NewsletterController::class, 'usarCupon']);
