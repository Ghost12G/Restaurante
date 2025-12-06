<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class ProductoController extends Controller
{
    // 🔹 LISTAR PRODUCTOS
    public function index()
    {
        return response()->json(Producto::all(), 200);
    }

    // 🔹 CREAR PRODUCTO
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric',
            'categoria' => 'required|string|max:255',
            'stock' => 'required|integer',
            'imagen' => 'nullable|string',
        ]);

        $producto = Producto::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Producto creado correctamente',
            'producto' => $producto
        ], 201);
    }

    // 🔹 OBTENER UN PRODUCTO POR ID
    public function show($id_producto)
    {
        $producto = Producto::find($id_producto);

        if (!$producto) {
            return response()->json([
                'success' => false,
                'message' => 'Producto no encontrado'
            ], 404);
        }

        return response()->json($producto, 200);
    }

    // 🔹 EDITAR PRODUCTO
    public function update(Request $request, $id_producto)
    {
        $producto = Producto::find($id_producto);

        if (!$producto) {
            return response()->json([
                'success' => false,
                'message' => 'Producto no encontrado'
            ], 404);
        }

        $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'sometimes|numeric',
            'categoria' => 'sometimes|string|max:255',
            'stock' => 'sometimes|integer',
            'imagen' => 'nullable|string',
        ]);

        $producto->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Producto actualizado correctamente',
            'producto' => $producto
        ], 200);
    }

    // 🔹 ELIMINAR PRODUCTO
    public function destroy($id_producto)
    {
        $producto = Producto::find($id_producto);

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
}
