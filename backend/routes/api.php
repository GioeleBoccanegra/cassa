<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/categorie', [CategoryController::class, 'store']);
Route::get('/categorie', [CategoryController::class, 'seeCategorie']);
Route::post('/prodotti', [ProductController::class, 'store']);
Route::get('/categorie/{id}', [CategoryController::class, 'seeProductInCategory']);
Route::get('/prodotti', [ProductController::class, 'getProducts']);
Route::put('/categorie/{id}', [CategoryController::class, 'modCategoria']);
Route::patch('/prodotti/{id}', [ProductController::class, 'modProduct']);

Route::delete('/categorie/{id}', [CategoryController::class, 'deleteCategoria']);
Route::delete('/prodotti/{id}', [ProductController::class, 'deleteProduct']);
