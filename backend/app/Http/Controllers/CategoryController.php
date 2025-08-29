<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

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
