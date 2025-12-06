<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\PedidoDetalle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    // =================== LISTAR TODOS LOS PEDIDOS ===================
    public function index() {
        return response()->json(Pedido::all());
    }

    // =================== LISTAR PEDIDOS CON DATOS DEL CLIENTE Y DELIVERY ===================
    public function pedidosConDatos()
    {
        $data = DB::table('pedidos')
            ->join('usuarios', 'pedidos.id_usuario', '=', 'usuarios.id_usuario')
            ->leftJoin('delivery', 'pedidos.id_delivery', '=', 'delivery.id_delivery')
            ->select(
                'pedidos.id_pedido',
                'delivery.numeroPedido',
                'usuarios.nombre as cliente',
                'usuarios.correo as correo',
                'pedidos.total',
                'pedidos.fecha_pedido',
                'pedidos.hora',
                'pedidos.estado'
            )
            ->orderBy('pedidos.id_pedido', 'desc')
            ->get();

        return response()->json($data);
    }

    // =================== MOSTRAR UN PEDIDO CON DETALLES Y PRODUCTOS ===================
    public function show($id)
    {
        $pedido = Pedido::with(['usuario', 'delivery', 'detalles.producto'])->find($id);

        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado'], 404);
        }

        return response()->json($pedido);
    }

    // =================== LISTAR PEDIDOS POR USUARIO ===================
    public function porUsuario($id_usuario)
    {
        $pedidos = Pedido::join('delivery', 'pedidos.id_delivery', '=', 'delivery.id_delivery')
            ->where('delivery.id_usuario', $id_usuario)
            ->select('pedidos.*', 'delivery.numeroPedido', 'delivery.fechaHora')
            ->get();

        return response()->json($pedidos);
    }

    // =================== AGREGAR PEDIDO ===================
    public function store(Request $request)
    {
        $request->validate([
            'id_usuario' => 'required|integer|exists:usuarios,id_usuario',
            'total' => 'required|numeric',
            'fecha_pedido' => 'required|date',
            'hora' => 'required',
            'estado' => 'required|string|max:50',
        ]);

        $pedido = Pedido::create([
            'id_usuario' => $request->id_usuario,
            'total' => $request->total,
            'fecha_pedido' => $request->fecha_pedido,
            'hora' => $request->hora,
            'estado' => $request->estado,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pedido creado correctamente',
            'data' => $pedido
        ], 201);
    }

    // =================== EDITAR PEDIDO ===================
    public function update(Request $request, $id)
    {
        $pedido = Pedido::find($id);

        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado'], 404);
        }

        $request->validate([
            'estado' => 'required|string|max:50',
            'total' => 'nullable|numeric',
            'fecha_pedido' => 'nullable|date',
            'hora' => 'nullable',
        ]);

        $pedido->update([
            'estado' => $request->estado,
            'total' => $request->total ?? $pedido->total,
            'fecha_pedido' => $request->fecha_pedido ?? $pedido->fecha_pedido,
            'hora' => $request->hora ?? $pedido->hora,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pedido actualizado correctamente',
            'data' => $pedido
        ]);
    }

    // =================== ELIMINAR PEDIDO ===================
public function destroy($id_pedido) {
    $pedido = Pedido::find($id_pedido);

    if (!$pedido) {
        return response()->json(['message' => 'Pedido no encontrado'], 404);
    }

    // Elimina primero los detalles asociados
    $pedido->detalles()->delete();

    // Ahora elimina el pedido
    $pedido->delete();

    return response()->json([
        'success' => true,
        'message' => 'Pedido eliminado correctamente'
    ]);
}


}
