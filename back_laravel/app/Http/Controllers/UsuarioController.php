<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function getUsuarios()
    {
        $usuarios = Usuario::all();

        return response()->json($usuarios, 200);
    }

    public function getUsuariosClientes()
    {
        $usuarios = Usuario::where('rol', 'Cliente')->get();

        return response()->json($usuarios, 200);
    }

    public function editarPerfil(Request $request, $id)
    {
        $usuario = Usuario::find($id);

        $usuario->update($request->only([
            'email',
            'nombre',
            'apellido1',
            'apellido2',
            'fecha_nacimiento',
            'movil'
        ]));

        return response()->json(["usuario" => $usuario]);
    }

    public function editarDireccion(Request $request, $id)
    {
        $usuario = Usuario::find($id);

        $usuario->update($request->only([
            'direccion',
            'localidad',
            'provincia',
            'codigo_postal'
        ]));

        return response()->json(["usuario" => $usuario]);
    }

    public function cambiarPassword(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|string|min:5|confirmed'
            // busca automáticamente password_confirmation . es como el registro
        ]);

        $usuario = Usuario::find($id);

        // hashea la nueva contraseña
        $usuario->password = Hash::make($request->password);
        $usuario->save();

        return response()->json([
            "mensaje" => "Contraseña actualizada correctamente"
        ]);
    }

    public function eliminarCuenta($id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json([
                "error" => "Usuario no encontrado"
            ], 404);
        }

        $usuario->delete();

        return response()->json([
            "mensaje" => "Cuenta eliminada correctamente"
        ]);
    }

    public function recuperarPassword(Request $request)
    {
        $request->validate([
            'identificador' => 'required|string'
        ]);

        $identificador = $request->identificador;

        // buscar por email o por username
        $usuario = Usuario::where('email', $identificador)
            ->orWhere('username', $identificador)
            ->first();

        if (!$usuario) {
            return response()->json([
                "error" => "Usuario no encontrado"
            ], 404);
        }

        // simulación: devolver el id para poder cambiar contraseña
        return response()->json([
            "mensaje" => "Usuario encontrado",
            "usuario_id" => $usuario->id
        ]);
    }
}
