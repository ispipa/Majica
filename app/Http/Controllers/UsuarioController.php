<?php

namespace App\Http\Controllers;


use App\Models\Usuarios;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
       $credentials = $request->validate([
            'correo' => ['required'],
            'password' => ['required']
        ]);
        if(!Auth::attempt($credentials)){
            return response()->json("Bienvenido");
        }
        /*$usuario = Usuarios::where('correo', $request->correo)->first();
        if(isset($usuario)){
            if(Auth::attempt(['correo' => $request->correo, 'password' => $request->contraseña])){
                $token = $usuario->createToken('authToken')->accessToken;
                return response()->json(['token' => $token], 200);
            }else{
                return response()->json(['error' => 'Contraseña incorrecta'], 401);
            }
        }*/
        return response()->json(["message" => "usuario login"], 201);
        //return $request->all();*/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $usuario = new Usuarios();
        $usuario->nombre = $request->nombre;
        $usuario->correo = $request->correo;
        $usuario->contraseña = $request->contraseña;
        $usuario->apellidos = $request->apellidos;
        $usuario->telefono = $request->telefono;
        $usuario->codigo_postal = $request->codigo_postal;
        $usuario->direccion = $request->direccion;
        $usuario->save();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $usuario = Usuarios::find($id);
        return $usuario;
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
        $usuario = Usuarios::findOrfail($request->id);
        $usuario->nombre = $request->nombre;
        $usuario->apellido = $request->apellido;
        $usuario->email = $request->email;
        $usuario->password = $request->password;
        return $usuario;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $usuario = Usuarios::destroy($id);
        return $usuario;
    }
}
