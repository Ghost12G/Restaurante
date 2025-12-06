<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    // 📌 LISTAR USUARIOS
        public function index()
    {
       $usuario = Usuario::all();
        return response()->json($usuario, 200);
		
    }

    // 📌 REGISTRAR USUARIO
    public function store(Request $request)
    {
        try {
            $request->validate([
                'dni' => 'required|string|max:15|unique:usuario,dni',
                'nombre' => 'required|string|max:100',
                'correo' => 'required|email|max:100|unique:usuario,correo',
                'telefono' => 'nullable|string|max:20',
				'direccion' => 'required|string|max:200',
				'referencia' => 'required|string|max:200',
                'password' => 'required|string|min:6'
            ]);

            $usuario = Usuario::create([
                'dni' => $request->dni,
                'nombre' => $request->nombre,
                'correo' => $request->correo,
                'telefono' => $request->telefono,
				'direccion' =>$request->direccion,
				'referencia' =>$request->referencia,
                'password' => Hash::make($request->password),
                'rol' => 'usuario',
                'fecha_registro' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Usuario registrado correctamente',
                'data' => $usuario
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {

            return response()->json([
                'success' => false,
                'errors' => $e->errors(),
                'message' => 'Errores de validación'
            ], 422);
        }
    }

    // 📌 LOGIN
    public function login(Request $request)
    {
        $usuario = Usuario::where('dni', $request->dni)->first();

        if (!$usuario) {
            return response()->json([
                'success' => false,
                'message' => 'DNI o contraseña incorrectos'
            ], 401);
        }

        if (!Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'success' => false,
                'message' => 'DNI o contraseña incorrectos'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login correcto',
            'data' => [
                'id_usuario' => $usuario->id_usuario,
                'nombre' => $usuario->nombre,
                'rol' => $usuario->rol
            ]
        ], 200);
    }
	
	
	public function show($id_usuario)
{
    $usuario = Usuario::find($id_usuario);

    if (!$usuario) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    return response()->json($usuario);
}
public function destroy($id)
{
    try {

        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        // Si quieres evitar borrar administradores
        if ($usuario->rol === "admin") {
            return response()->json([
                'message' => 'No puedes eliminar un administrador'
            ], 403);
        }

        $usuario->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente'
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error al eliminar usuario',
            'error' => $e->getMessage()
        ], 500);
    }
}
public function update(Request $request, $id)
{
    $usuario = Usuario::find($id);

    if (!$usuario) {
        return response()->json([
            'message' => 'Usuario no encontrado'
        ], 404);
    }

    // No permitir editar administradores (opcional)
    if ($usuario->rol === "admin") {
        return response()->json([
            'message' => 'No se puede editar un administrador'
        ], 403);
    }

    $usuario->update([
        "nombre"   => $request->nombre,
        "dni"      => $request->dni,
        "telefono" => $request->telefono,
        "correo"   => $request->correo,
        "rol"      => $request->rol,
    ]);

    return response()->json([
        'message' => 'Usuario actualizado correctamente',
        'usuario' => $usuario,
    ], 200);
}

}
