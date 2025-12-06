<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Delivery;
use App\Models\Pedido;
use App\Models\PedidoDetalle;

class DeliveryController extends Controller
{
    // Crear delivery (POST)
    public function crearDelivery(Request $request)
    {
        DB::beginTransaction();

        try {
            // Crear Delivery
            $delivery = Delivery::create([
                'id_usuario' => $request->id_usuario,
                'direccion' => $request->direccion,
                'referencia' => $request->referencia,
                'telefono' => $request->telefono,
                'pago' => $request->pago,
                'tarjetaNumero' => $request->tarjetaNumero ?? null,
                'tarjetaNombre' => $request->tarjetaNombre ?? null,
                'tarjetaCVV' => $request->tarjetaCVV ?? null,
                'tarjetaFecha' => $request->tarjetaFecha ?? null,
                'yapeNumero' => $request->yapeNumero ?? null,
                'yapeCodigo' => $request->yapeCodigo ?? null,
                'numeroPedido' => 'PED-' . str_pad(rand(1, 99999), 5, '0', STR_PAD_LEFT)
            ]);

            // Validar que productos existan
            $productos = $request->productos ?? [];

            // Calcular total correctamente
            $total = 0;
            foreach ($productos as $p) {
                $precio = isset($p['precio']) ? floatval($p['precio']) : 0;
                $cantidad = isset($p['cantidad']) ? intval($p['cantidad']) : 0;
                $total += $precio * $cantidad;
            }

            // Crear pedido con total calculado
            $pedido = Pedido::create([
                'id_usuario' => $request->id_usuario,
                'id_delivery' => $delivery->id_delivery,
                'total' => $total
            ]);

            // Crear detalle del pedido
            foreach ($productos as $p) {
                $precio = isset($p['precio']) ? floatval($p['precio']) : 0;
                $cantidad = isset($p['cantidad']) ? intval($p['cantidad']) : 0;
                PedidoDetalle::create([
                    'id_pedido' => $pedido->id_pedido,
                    'id_producto' => $p['id_producto'],
                    'precio' => $precio,
                    'cantidad' => $cantidad,
                    'subtotal' => $precio * $cantidad
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'numeroPedido' => $delivery->numeroPedido,
                'total' => $total
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    // Listar todos los deliveries (GET)
    public function listarDelivery()
    {
        $delivery = Delivery::all();
        return response()->json([
            'success' => true,
            'data' => $delivery
        ]);
    }
}
