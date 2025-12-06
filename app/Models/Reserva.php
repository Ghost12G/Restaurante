<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reserva extends Model
{
    protected $table = 'reserva';
    protected $primaryKey = 'id_reserva';

    protected $fillable = [
        'id_usuario',
        'fecha',
        'hora',
        'mesa',
        'personas'
    ];

    public $timestamps = true;

    // Relación con Usuario
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    // Relación con Detalles de Reserva
    public function detalles(): HasMany
    {
        return $this->hasMany(DetalleReserva::class, 'id_reserva', 'id_reserva');
    }
}
