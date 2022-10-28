<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Salas;
use Illuminate\Support\Facades\Redirect;

class mapaController extends Controller
{
    /** 
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function all()
    {
        $salas = Salas::all();
        return $salas;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $sala = new Salas();
        $sala -> $request = $request -> id;
        $sala -> $request = $request -> nombreSala;
        $sala -> $request = $request -> precio_1;
        $sala -> $request = $request -> precio_2;
        $sala -> $request = $request -> descripcionSala;
        $sala -> save();

        return Redirect("/sala");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $oneSala = Salas::find($id);
        return $oneSala;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $sala = Salas::findOrFail($request -> $id);
        $sala -> $request = $request -> id;
        $sala -> $request = $request -> nombreSala;
        $sala -> $request = $request -> precio_1;
        $sala -> $request = $request -> precio_2;
        $sala -> $request = $request -> descripcionSala;
        $sala -> save();
        return $sala;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Salas::destroy($id);
    }
}
