<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Category;
use App\Models\Prodotto;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    public function store(Request $request)
    {

        try {
            $request->validate([
                "category_id" => "required|exists:categories,id",
                "nome" => "required|string|max:30",
                "ivato" => "required|numeric|min:0",
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errore nella validazione dei dati' => $e->errors()], 422);
        };


        try {

            $categoria = Category::find($request->category_id);

            $iva = $categoria->iva;

            $imponibile = $request->ivato * 100 / (100 + $iva);

            $val_iva = $request->ivato - $imponibile;

            $prodotto = Product::create([
                "category_id" => $request->category_id,
                "nome" => $request->nome,
                "iva" => $iva,
                "imponibile" => round($imponibile, 2),
                "ivato" => round($request->ivato, 2),
                "val_iva" => round($val_iva, 2)

            ]);

            return response()->json($prodotto, 201);
        } catch (\Exception $e) {
            return response()->json(['errore nella creazione del prodotto' => $e->getMessage()], 500);
        };
    }
}
