<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prodotto extends Model
{
    use HasFactory;

    protected $fillable = [
        "categoria_id",
        "nome",
        "iva",
        "imponibile",
        "ivato",
        "val_iva"
    ];

    public function category()
    {
        return $this->belongsTo(Categoria::class);
    }
}
