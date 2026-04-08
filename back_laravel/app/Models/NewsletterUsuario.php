<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsletterUsuario extends Model
{
    protected $table = "newsletter_usuarios";
    
    protected $fillable = ['email', 'codigo', 'usado', 'is_active'];
    
    public $timestamps = false;
}
