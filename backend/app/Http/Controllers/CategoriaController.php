<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            "nome" => "required|string|max:30",
            "iva" => "required|numeric|in:4,10,22",
        ]);

        try {
            $categoria = Categoria::create([
                "nome" => $request->nome,
                "iva" => $request->iva
            ]);
        } catch (\Exception $e) {
            return response()->json(["errore nella crezione della categoria" => $e->getMessage()], 500);
        }

        return response()->json($categoria, 201);
    }
}
