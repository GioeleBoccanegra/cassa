<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/categorie', [CategoryController::class, 'store']);
Route::get('/categorie', [CategoryController::class, 'seeCategorie']);
Route::post('/prodotti', [ProductController::class, 'store']);
Route::get('/categorie/{id}', [CategoryController::class, 'seeProductInCategory']);
