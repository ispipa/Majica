<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\SalasController;
use App\Http\Controllers\PisosController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(SalasController::class)->group(function(){
    route::get("/sala",  "index");
    route::post("/sala", "store");
    route::get("/sala/{id}", "show");
    route::put("/sala/{id}", "update");
    route::delete("/sala/{id}", "destroy");
});
Route::controller(PisosController::Class)->group(function(){
    route::get("/piso", "index");
    route::post("/piso", "store");
    route::get("/piso/{id}", "show");
    route::put("/piso/{id}", "update");
    route::delete("/piso/{id}", "destroy");
});
Route::controller(PagosController::Class)->group(function(){
    route::get("/pago", "index");
    route::post("/pago", "store");
    route::get("/pago/{id}", "show");
    route::put("/pago/{id}", "update");
    route::delete("/pago/{id}", "destroy");
});
