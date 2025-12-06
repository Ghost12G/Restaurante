<?php

use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PedidoDetalleController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\DetalleReservaController;

// -------------------- USUARIOS --------------------
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::post('/login', [UsuarioController::class, 'login']);
Route::get('/usuarios/{id_usuario}', [UsuarioController::class, 'show']);




// -------------------- PRODUCTOS --------------------
Route::get('/productos', [ProductoController::class, 'index']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);
Route::put('/productos/{id}', [ProductoController::class, 'update']); 



// -------------------- DELIVERY --------------------
Route::post('/delivery', [DeliveryController::class, 'crearDelivery']); // ✔️ CORRECTO
Route::get('/delivery', [DeliveryController::class, 'listarDelivery']);





// -------------------- PEDIDOS --------------------
Route::get('/pedidos', [PedidoController::class, 'index']);             // Listar todos
Route::get('/pedidos/{id_pedido}', [PedidoController::class, 'show']); // Mostrar 1 pedido
Route::get('/pedidos/usuario/{id_usuario}', [PedidoController::class, 'porUsuario']); // Pedidos por usuario

Route::post('/pedidos', [PedidoController::class, 'store']);           // Agregar pedido
Route::put('/pedidos/{id_pedido}', [PedidoController::class, 'update']); // Editar pedido completo
Route::delete('/pedidos/{id_pedido}', [PedidoController::class, 'destroy']);

	

// Opcional: solo actualizar estado
Route::patch('/pedidos/{id_pedido}/estado', [PedidoController::class, 'update']);


// -------------------- DETALLE --------------------
Route::get('/pedido-detalle/{id_pedido}', [PedidoDetalleController::class, 'detallesPorPedido']);
Route::get('/detalle-reserva/{id_reserva}', [DetalleReservaController::class, 'detallesPorReserva']);




//Route::post('/reserva', [ReservaController::class, 'store']);
//Route::get('/reservas/validar', [ReservaController::class, 'validar']);
//Route::get('/reservas', [ReservaController::class, 'index']);


// -------------------- RESERVAS --------------------
Route::post('/reserva', [ReservaController::class, 'store']);      // Crear
Route::get('/reservas', [ReservaController::class, 'index']);      // Listar
Route::get('/reservas/{id_reserva}', [ReservaController::class, 'show']); // Mostrar 1
Route::put('/reservas/{id_reserva}', [ReservaController::class, 'update']); // Editar
Route::delete('/reservas/{id_reserva}', [ReservaController::class, 'destroy']); // Eliminar
Route::get('/reservas/validar', [ReservaController::class, 'validar']);      // Validar disponibilidad


Route::delete('/usuarios/{id}', [App\Http\Controllers\UsuarioController::class, 'destroy']); //Eliminar Usuario
Route::put('/usuarios/{id}', [App\Http\Controllers\UsuarioController::class, 'update']);  //Editar Usuario



// -------------------- TEST --------------------
Route::get('/test', function () {
    return 'api funcionando';
});
