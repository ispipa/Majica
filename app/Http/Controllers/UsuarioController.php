<?php

namespace App\Http\Controllers;


use App\Models\Usuarios;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use \stdClass;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
       $request->validate([
            'email' => ['required','email','unique:App\Models\Usuarios,email'],
            'password' => ['required']
        ]);
        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json(["message" => 'Unauthorized'], 401);
        }
       $user = Usuarios::where('email', $request->email)->first();
       $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            "message" => "Hi ". $user->nombre,
            "access_token" => $token,
            "token_type" => "Bearer",
            "user" => $user
        ], 200);
        //return $request->all();*/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => ['required'],
            'email' => ['required','email','unique:App\Models\Usuarios,email'],
            'password' => ['required'],
            'apellidos' => ['required'],
            'telefono' => ['required'],
            'codigo_postal' => ['required'],
            'direccion' => ['required']
        ]);


        $user = new Usuarios();
        $user->nombre = $request->nombre;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->apellidos = $request->apellidos;
        $user->telefono = $request->telefono;
        $user->codigo_postal = $request->codigo_postal;
        $user->direccion = $request->direccion;
        $user->save();

        $token = $user->createToken("authToken")->plainTextToken;

        return response()->json(['data' => $user,'token' => $token, 'token_type' => 'Bearer'], 200);

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
