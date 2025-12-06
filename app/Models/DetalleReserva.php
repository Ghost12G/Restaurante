<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;

class DetalleReserva extends Model
{
    use HasFactory;

    protected $table = 'detalle_reserva';
    protected $primaryKey = 'id_detalle';
    protected $fillable = ['id_reserva', 'id_producto', 'cantidad', 'precio', 'subtotal'];

    public $timestamps = true;

    // Relación con Reserva
    public function reserva()
    {
        return $this->belongsTo(Reserva::class, 'id_reserva');
    }

    // Relación con Producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto');
    }
}
