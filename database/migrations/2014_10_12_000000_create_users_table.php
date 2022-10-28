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
        Schema::create('usuario', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->nullable();
            $table->string('correo')->unique();
            $table->string('contraseña')->nullable();
            $table->string('apellidos')->nullable();
            $table->string('telefono')->nullable();
            $table->string('codigo_postal')->nullable();
            $table->string('direccion')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuario');
    }
};
