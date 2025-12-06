<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reserva;

class ReservaController extends Controller
{
    // =================== REGISTRAR RESERVA ===================
    public function store(Request $request)
    {
        $request->validate([
            'id_usuario' => 'required|integer',
            'fecha' => 'required|date',
            'hora' => 'required',
            'mesa' => 'required',
            'personas' => 'required|integer|min:1'
        ]);

        // Verificar disponibilidad
        $existe = Reserva::where('fecha', $request->fecha)
            ->where('hora', $request->hora)
            ->where('mesa', $request->mesa)
            ->exists();

        if ($existe) {
            return response()->json([
                'success' => false,
                'message' => 'La mesa ya está reservada para esa hora.'
            ], 409);
        }

        $reserva = Reserva::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Reserva creada correctamente.',
            'reserva' => $reserva
        ]);
    }

    // =================== VALIDAR DISPONIBILIDAD ===================
    public function validar(Request $request)
    {
        $existe = Reserva::where('fecha', $request->fecha)
            ->where('hora', $request->hora)
            ->where('mesa', $request->mesa)
            ->exists();

        return response()->json([
            'disponible' => !$existe
        ]);
    }

    // =================== LISTAR TODAS LAS RESERVAS ===================
    public function index()
    {
        return Reserva::all();
    }

    // =================== ACTUALIZAR RESERVA ===================
    public function update(Request $request, $id)
    {
        $reserva = Reserva::find($id);

        if (!$reserva) {
            return response()->json([
                'success' => false,
                'message' => 'Reserva no encontrada.'
            ], 404);
        }

        $request->validate([
            'id_usuario' => 'required|integer',
            'fecha' => 'required|date',
            'hora' => 'required',
            'mesa' => 'required',
            'personas' => 'required|integer|min:1'
        ]);

        $reserva->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Reserva actualizada correctamente.',
            'reserva' => $reserva
        ]);
    }

    // =================== ELIMINAR RESERVA ===================
    public function destroy($id)
    {
        $reserva = Reserva::find($id);

        if (!$reserva) {
            return response()->json([
                'success' => false,
                'message' => 'Reserva no encontrada.'
            ], 404);
        }

        $reserva->delete();

        return response()->json([
            'success' => true,
            'message' => 'Reserva eliminada correctamente.'
        ]);
    }
}
