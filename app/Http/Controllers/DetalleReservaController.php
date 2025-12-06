<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DetalleReserva;

class DetalleReservaController extends Controller
{
    // Listar detalles por reserva
    public function detallesPorReserva($id_reserva)
    {
        $detalles = DetalleReserva::with('producto')
            ->where('id_reserva', $id_reserva)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $detalles
        ]);
    }
}
