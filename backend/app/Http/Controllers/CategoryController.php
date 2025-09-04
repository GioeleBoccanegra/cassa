<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Numeric;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            "nome" => "required|string|max:30",
            "iva" => "required|numeric|in:4,10,22",
        ]);

        try {
            $category = Category::create([
                "nome" => $request->nome,
                "iva" => $request->iva
            ]);
        } catch (\Exception $e) {
            return response()->json(["errore nella crezione della categoria" => $e->getMessage()], 500);
        }

        return response()->json($category, 201);
    }

    public function seeCategorie()
    {
        try {
            $categories = Category::all();

            return response()->json($categories);
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }


    public function modCategoria(Request $request, $categoryId)
    {

        if (!Category::where("id", $categoryId)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Categoria non trovata'
            ], 404);
        }

        try {
            $request->validate([
                "nome" => "required|string|max:30",
                "iva" => "required|numeric|in:4,10,22",
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errore nella validazione dei dati' => $e->errors()], 422);
        };


        try {
            $category = Category::findOrFail($categoryId);
            $category->nome = $request->nome;
            $category->iva = $request->iva;
            $category->save();

            $products = Product::where("category_id", $categoryId)->get();
            foreach ($products as $prod) {
                $prod->iva = $category->iva;
                $prod->save();
            }

            return response()->json([
                "success" => true,
                "message" => "categoria aggiornata con successo",
                "categoria" => "categoria"
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }




    /*public function seeProductInCategory($categoryid)
    {

        try {

            $category = Category::findOrFail($categoryid);
            if (!$category) {
                return response()->json(['error' => 'Categoria non trovata'], 404);
            }


            $products = $category->products;

            return response()->json($products);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
        */
}
