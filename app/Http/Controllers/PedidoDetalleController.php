<?php

namespace App\Http\Controllers;

use App\Models\PedidoDetalle;
use Illuminate\Http\Request;

class PedidoDetalleController extends Controller
{
    public function index()
    {
        return PedidoDetalle::all();
    }

    public function detallesPorPedido($id_pedido)
    {
        return PedidoDetalle::where('id_pedido', $id_pedido)->get();
    }
}

