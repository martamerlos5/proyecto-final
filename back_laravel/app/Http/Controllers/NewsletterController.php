<?php

namespace App\Http\Controllers;

use App\Models\NewsletterUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsletterController extends Controller
{

    public function suscribirse(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email'
        ]);

        $email = $request->email;

        // buscar si ya existe el email
        $usuario = NewsletterUsuario::where('email', $email)->first();

        // caso 1: si ya existe y está activo (is_active) -> error
        if ($usuario && $usuario->is_active) {
            return response()->json([
                'errors' => [
                    'email' => ['Este email ya está suscrito']
                ]
            ], 422);
        }

        // caso 2: si existe pero está inactivo -> reactivar (post darse de baja)
        if ($usuario && !$usuario->is_active) {

            $usuario->is_active = true;
            // se genera un nuevo cupón
            $usuario->codigo = strtoupper(Str::random(6));
            $usuario->usado = false;
            $usuario->save();

            return response()->json([
                'message' => 'Te has vuelto a suscribir',
                'codigo' => $usuario->codigo
            ]);
        }

        // caso 3: no existe → crear nuevo
        $codigo = strtoupper(Str::random(6));

        NewsletterUsuario::create([
            'email' => $email,
            'codigo' => $codigo,
            'usado' => false,
            'is_active' => true
        ]);

        return response()->json([
            'message' => 'Suscripción realizada',
            'codigo' => $codigo
        ]);
    }


    public function getCupones($email)
    {
        // se busca todos los registros de newsletter para ese email
        $cupones = NewsletterUsuario::where('email', $email)->get();

        return response()->json($cupones);
    }

    // para que el usuario se pueda dar de baja . en lugar de borrarlo, se marca el activo como false (un actualizar)
    public function bajaNewsletter($email)
    {
        $usuario = NewsletterUsuario::where('email', $email)->first();

        if (!$usuario) {
            return response()->json([
                'error' => 'Usuario no suscrito'
            ], 404);
        }

        $usuario->is_active = false;
        $usuario->save();

        return response()->json([
            'message' => 'Te has dado de baja correctamente'
        ]);
    }

    public function usarCupon($email, $codigo)
    {
        $cupon = NewsletterUsuario::where('email', $email)
            ->where('codigo', $codigo)
            ->where('usado', false)
            ->first();

        if (!$cupon) {
            return response()->json([
                'error' => 'Cupón no válido'
            ], 404);
        }

        $cupon->usado = true;
        $cupon->save();

        return response()->json([
            'message' => 'Cupón aplicado correctamente'
        ]);
    }
}
