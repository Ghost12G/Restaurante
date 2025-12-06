<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class ProductoController extends Controller
{
    // LISTAR PRODUCTOS
    public function index()
    {
        $productos = Producto::all();
        return response()->json([
            'success' => true,
            'data' => $productos
        ], 200);
    }

    // AGREGAR PRODUCTO
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric',
            'categoria' => 'required|string|max:50',
            'stock' => 'nullable|integer',
            'imagen' => 'nullable|string'

        ]);

        $productos = Producto::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'categoria' => $request->categoria,
            'stock' => $request->stock ?? 0,
            'imagen' => $request->imagen,
            'fecha_registro' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Producto registrado correctamente',
            'data' => $productos
        ], 201);
    }

    // MOSTRAR UN PRODUCTO
    public function show($id)
    {
        $productos = Producto::find($id);
        if (!$productos) {
            return response()->json([
                'success' => false,
                'message' => 'Producto no encontrado'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $productos
        ], 200);
    }
// ELIMINAR PRODUCTO
public function destroy($id)
{
    $producto = Producto::find($id);
    if (!$producto) {
        return response()->json([
            'success' => false,
            'message' => 'Producto no encontrado'
        ], 404);
    }
    $producto->delete();
    return response()->json([
        'success' => true,
        'message' => 'Producto eliminado correctamente'
    ], 200);
}

// EDITAR PRODUCTO
public function update(Request $request, $id)
{
    $producto = Producto::find($id);

    if (!$producto) {
        return response()->json([
            'success' => false,
            'message' => 'Producto no encontrado'
        ], 404);
    }

    // Validar campos editables
    $request->validate([
        'nombre' => 'required|string|max:100',
        'descripcion' => 'nullable|string',
        'precio' => 'required|numeric',
        'categoria' => 'required|string|max:50',
        'stock' => 'nullable|integer',
        'imagen' => 'nullable|string|max:200'
    ]);

    $producto->update([
        'nombre' => $request->nombre,
        'descripcion' => $request->descripcion,
        'precio' => $request->precio,
        'categoria' => $request->categoria,
        'stock' => $request->stock ?? $producto->stock,
        'imagen' => $request->imagen ?? $producto->imagen
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Producto actualizado correctamente',
        'data' => $producto
    ], 200);
}

}
