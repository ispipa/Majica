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
            $table->enum('precios_pagos',['0','1','2']);
           /* $table->string('sala',50);
            $table->integer('usuario');*/

            /*$table->foreign('usuario')->references('id')->on('usuarios');
            $table->foreign('sala')->references('id')->on('salas');
            $table->foreign('precios_pagos')->references('precio_sala')->on('salas');*/
            $table->foreignId('sala')->constrained('salas');
            $table->foreignId('usuario')->constrained('usuarios');

            //falta esta relacion
           $table->foreign('precios_pagos')->references('precio_sala')->on('salas');

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
