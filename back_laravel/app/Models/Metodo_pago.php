<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Metodo_pago extends Model
{
    protected $table = 'metodos_pago';
    protected $fillable = ['metodo'];
}
