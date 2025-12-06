<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Pedido extends Model
{
    protected $table = 'pedidos';
    protected $primaryKey = 'id_pedido'; // ← IMPORTANTE
    public $timestamps = false; // tu tabla NO usa created_at ni updated_at

    protected $fillable = [
        'id_usuario',
        'id_delivery',
        'total',
        'estado'
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    public function delivery(): BelongsTo
    {
        return $this->belongsTo(Delivery::class, 'id_delivery', 'id_delivery');
    }

    public function detalles(): HasMany
    {
        return $this->hasMany(PedidoDetalle::class, 'id_pedido', 'id_pedido');
    }
}
