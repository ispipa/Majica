<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pagos extends Model
{
    use HasFactory;
    protected $fillable = [
        'precio_pagos',
        'piso_pagos',
        'sala_pagos',
        'pagado',
        'usuario'
    ];
}
