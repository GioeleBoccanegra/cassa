<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Category;
use App\Models\Prodotto;
use App\Models\Product;
use Exception;
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

    public function getProducts()
    {
        try {
            $prodotti = Product::all();
            return response()->json($prodotti);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function modProduct(Request $request, $productId)
    {

        if (!Product::where("id", $productId)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Categoria non trovata'
            ], 404);
        }


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


            $product = Product::findOrFail($productId);
            $iva = $product->iva;
            $imponibile = $request->ivato * 100 / (100 + $iva);
            $val_iva = $request->ivato - $imponibile;

            $product->nome = $request->nome;
            $product->imponibile = round($imponibile, 2);
            $product->ivato = $request->ivato;
            $product->val_iva = round($val_iva, 2);
            $product->save();

            return response()->json([
                "success" => true,
                "message" => "prodotto aggiornata con successo",
                "categoria" => "prodotto"
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
