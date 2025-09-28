<?php

use App\Http\Controllers\admin\BestsellerController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\LatestController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MpesaController;


Route::post('authenticate',[AuthenticationController::class, 'authenticate']);


// Route::get('/user', function (Request $request) {
   // return $request->user();
 // })->middleware('auth:sanctum');


 Route::group(['middleware' => ['auth:sanctum']], function(){


    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']);
     Route::put('products/{product}', [ProductController::class, 'update']);

      
 });


 Route::post('products', [ProductController::class, 'store']);
 Route::get('products', [ProductController::class, 'index']);
 Route::get('products/{id}', [ProductController::class, 'show']);
 Route::delete('products/{id}', [ProductController::class, 'destroy']);


Route::get('items', [BestsellerController::class, 'index']);
Route::post('items', [BestsellerController::class, 'store']);
Route::get('items/{id}', [BestsellerController::class, 'show']);  
Route::post('items/{id}', [BestsellerController::class, 'update']);  
Route::delete('items/{id}', [BestsellerController::class, 'destroy']);


Route::get('itemsl', [LatestController::class, 'index']);
Route::post('itemsl', [LatestController::class, 'store']);
Route::get('itemsl/{id}', [LatestController::class, 'show']);  
Route::post('itemsl/{id}', [LatestController::class, 'update']); 
Route::delete('itemsl/{id}', [LatestController::class, 'destroy']);





Route::post('stkpush', [MpesaController::class, 'stkPush']);
Route::post('stkpush/callback', [MpesaController::class, 'callback']);
