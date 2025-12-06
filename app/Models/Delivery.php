<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Delivery extends Model
{
    protected $table = 'delivery';
    protected $primaryKey = 'id_delivery'; // ← OBLIGATORIO
    public $timestamps = false; // tu tabla NO usa updated_at ni created_at

    protected $fillable = [
        'id_usuario',
        'direccion',
        'referencia',
        'telefono',
        'pago',
        'tarjetaNumero',
        'tarjetaNombre',
        'tarjetaCVV',
        'tarjetaFecha',
        'yapeNumero',
        'yapeCodigo',
        'numeroPedido',
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }

    public function pedido(): HasOne
    {
        return $this->hasOne(Pedido::class, 'id_delivery', 'id_delivery');
    }
}
