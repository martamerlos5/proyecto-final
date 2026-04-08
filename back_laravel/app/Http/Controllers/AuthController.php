<?php

namespace App\Http\Controllers;

use App\Models\NewsletterUsuario;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // procesar/validar login
    public function validarLogin(Request $request)
    {

        // validar los datos (como en el front tengo que se pueda iniciar sesión con el username o el email, por eso lo llamo identificador)
        $request->validate([
            'identificador' => 'string|required',
            'password' => 'string|required'
        ]);

        $identificador = $request->identificador;
        $password = $request->password;

        $credencialesEmail = ['email' => $identificador, 'password' => $password];
        $credencialesUsername = ['username' => $identificador, 'password' => $password];

        if (Auth::attempt($credencialesEmail) || Auth::attempt($credencialesUsername)) {
            // se recoge el usuario que se acaba de loguear
            $usuario = Auth::user();

            // se devuelve la respuesta que React necesita (!!!! ver si hace falta poner más)
            return response()->json([
                'mensaje' => 'Login correcto',
                // no se envía la contraseña
                'usuario' => [
                    'id' => $usuario->id,
                    'nombre' => $usuario->nombre,
                    'email' => $usuario->email,
                    'username' => $usuario->username,
                    'apellido1' => $usuario->apellido1,
                    'apellido2' => $usuario->apellido2,
                    'fecha_nacimiento' => $usuario->fecha_nacimiento,
                    'provincia' => $usuario->provincia,
                    'localidad' => $usuario->localidad,
                    'direccion' => $usuario->direccion,
                    'codigo_postal' => $usuario->codigo_postal,
                    'movil' => $usuario->movil,
                    'rol' => $usuario->rol // CLIENTE O ADMINISTRADOR
                ]
            ], 200);
        }

        // si falla, en lugar de redireccionar, se devuelve error en JSON
        return response()->json([
            'error' => 'Usuario o contraseña incorrectos'
        ], 401);
    }


    public function validarRegistro(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|unique:usuarios,email',
            'username' => 'required|string|unique:usuarios,username',
            'password' => 'required|string|min:5|confirmed', // 'confirmed' busca el campo 'password_confirmation'
            'nombre' => 'required|string',
            'apellido1' => 'required|string',
            'apellido2' => 'nullable|string',
            'fecha_nacimiento' => 'nullable|date',
            'provincia' => 'nullable|string',
            'localidad' => 'nullable|string',
            'direccion' => 'nullable|string',
            'codigo_postal' => 'nullable|string',
            'movil' => 'required|string',
            'terminos' => 'accepted',
            'newsletter' => 'nullable|boolean'

        ]);

        try {
            // se crea el nuevo usuario con el modelo Usuario y se mapea a los campos de la bbdd
            $usuario = new Usuario();
            $usuario->email = $request->email;
            $usuario->username = $request->username;
            $usuario->password = Hash::make($request->password);
            $usuario->nombre = $request->nombre;
            $usuario->apellido1 = $request->apellido1;
            $usuario->apellido2 = $request->apellido2 ?? null;
            $usuario->fecha_nacimiento = $request->fecha_nacimiento ?? null;
            $usuario->provincia = $request->provincia ?? null;
            $usuario->localidad = $request->localidad ?? null;
            $usuario->direccion = $request->direccion ?? null;
            $usuario->codigo_postal = $request->codigo_postal ?? null;
            $usuario->movil = $request->movil;
            $usuario->rol = 'Cliente'; // por defecto los usuarios siempre se registran como Clientes

            $usuario->save();

            if ($request->newsletter) {

                // comprobar si ya estaba suscrito antes de crear uno nuevo
                $suscrito = NewsletterUsuario::where('email', $request->email)->first();

                if (!$suscrito) {
                    NewsletterUsuario::create([
                        'email' => $request->email,
                        'codigo' => strtoupper(Str::random(6)), // Generamos el código de descuento
                        'usado' => false,
                        'is_active' => true
                    ]);
                }
            }

            // respuesta para React
            return response()->json([
                'mensaje' => 'Cuenta creada con éxito',
                'usuario' => $usuario
            ], 201);
        } catch (\Exception $excepcion) {
            return response()->json([
                'error' => 'No se ha podido crear la cuenta',
                'detalle' => $excepcion->getMessage()
            ], 500);
        }
    }

    public function validarRegistroAdmin(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|unique:usuarios,email',
            'username' => 'required|string|unique:usuarios,username',
            'password' => 'required|string|min:5|confirmed', // 'confirmed' busca el campo 'password_confirmation'
            'nombre' => 'required|string',
            'apellido1' => 'required|string',
            'apellido2' => 'nullable|string',
            'fecha_nacimiento' => 'nullable|date',
            'provincia' => 'nullable|string',
            'localidad' => 'nullable|string',
            'direccion' => 'nullable|string',
            'codigo_postal' => 'nullable|string',
            'movil' => 'required|string',
            'terminos' => 'accepted',

        ]);

        try {
            // se crea el nuevo usuario con el modelo Usuario y se mapea a los campos de la bbdd
            $usuario = new Usuario();
            $usuario->email = $request->email;
            $usuario->username = $request->username;
            $usuario->password = Hash::make($request->password);
            $usuario->nombre = $request->nombre;
            $usuario->apellido1 = $request->apellido1;
            $usuario->apellido2 = $request->apellido2 ?? null;
            $usuario->fecha_nacimiento = $request->fecha_nacimiento ?? null;
            $usuario->provincia = $request->provincia ?? null;
            $usuario->localidad = $request->localidad ?? null;
            $usuario->direccion = $request->direccion ?? null;
            $usuario->codigo_postal = $request->codigo_postal ?? null;
            $usuario->movil = $request->movil;
            $usuario->rol = 'Administrador';

            $usuario->save();

            // respuesta para React
            return response()->json([
                'mensaje' => 'Cuenta creada con éxito',
                'usuario' => $usuario
            ], 201);
        } catch (\Exception $excepcion) {
            return response()->json([
                'error' => 'No se ha podido crear la cuenta',
                'detalle' => $excepcion->getMessage()
            ], 500);
        }
    }


    public function cerrarSesion(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'mensaje' => 'Sesión cerrada correctamente en el servidor'
        ], 200);
    }
}
