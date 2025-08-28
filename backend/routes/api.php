<?php

use App\Http\Controllers\CategoriaController;

use Illuminate\Support\Facades\Route;

Route::post('/categorie', [CategoriaController::class, 'store']);
