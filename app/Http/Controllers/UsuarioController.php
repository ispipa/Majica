<?php

namespace App\Http\Controllers;


use App\Models\Usuario;
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
    public function index(Request $request)
    {
        $response = ["status" => 0, "msg" => ""];
        $request->validate([
            "correo" => "required","email","unique:App\Models\Usuario,correo","max:150",

        ]);
        $credentials = $request->only("correo");
        if(!Auth::attempt($credentials))
        {
            $response["msg"] = "Unauthorized";
            return response()->json($$response, 401);
        }
        /*$usuario = Usuario::where('correo', "usuario1@gmail.com")->get();
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return $response->json(["status" => 1, "msg" => "Login correcto"]);
        }
        else{
            return $response->json(["status" => 0, "msg" => "Login incorrecto"]);
        }
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
        $usuario = new Usuario();
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
        $usuario = Usuario::find($id);
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
        $usuario = Usuario::findOrfail($request->id);
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
        $usuario = Usuario::destroy($id);
        return $usuario;
    }
}
