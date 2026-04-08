<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Usuario extends Authenticatable
{
    use Notifiable;

    protected $table = 'usuarios';

    // revisar esto
    protected $fillable = ['email', 'username', 'password', 'rol', 'nombre', 'apellido1', 'apellido2', 'fecha_nacimiento',
    'provincia', 'localidad', 'direccion', 'codigo_postal', 'movil'];

    public $timestamps = false;

    
    protected $hidden = ['password'];


}


