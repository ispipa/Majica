<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->string('precio_pagos');
            $table->foreignId('piso_pagos')->constrained('pisos');
            $table->foreignId('sala_pagos')->constrained('salas');
            $table->foreignId('usuario')->constrained('usuarios');
            //$table->foreign('precios_pagos')->references('precio_sala')->on('salas');
            $table->timestamps();
            $table->string('pagado');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pagos');
    }
};
