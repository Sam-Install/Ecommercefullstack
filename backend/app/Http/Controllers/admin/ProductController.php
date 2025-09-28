<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();

        // Add full URL for frontend (but DB only stores filename)
        $products->transform(function ($product) {
            if ($product->image) {
                $product->image_url = asset('uploads/' . $product->image);
            } else {
                $product->image_url = null;
            }
            return $product;
        });

        return response()->json([
            'status' => true,
            'message' => 'Products retrieved successfully',
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'image' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $model = new Product();
        $model->title = $request->title;
        $model->description = $request->description;
        $model->price = $request->price;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename); // Save in public/uploads
            $model->image = $filename; // Store filename only
        }

        $model->save();

        return response()->json([
            'status' => true,
            'message' => 'Product added Successfully',
            'product' => $model
        ]);
    }

    /**
     * Display the specified resource.
     */
  public function show($id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['status' => false, 'message' => 'Product not found'], 404);
    }

    return response()->json([
        'status' => true,
        'product' => $product
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|unique:products,title,' . $product->id,
            'description' => 'sometimes|required',
            'price' => 'sometimes|required|numeric',
            'image' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        if ($request->has('title')) $product->title = $request->title;
        if ($request->has('description')) $product->description = $request->description;
        if ($request->has('price')) $product->price = $request->price;

        if ($request->hasFile('image')) {
            // Delete old file if exists
            if ($product->image && file_exists(public_path('uploads/' . $product->image))) {
                unlink(public_path('uploads/' . $product->image));
            }

            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $product->image = $filename;
        }

        $product->save();

        return response()->json([
            'status' => true,
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found',
            ]);
        }

        // Delete file if exists
        if ($product->image && file_exists(public_path('uploads/' . $product->image))) {
            unlink(public_path('uploads/' . $product->image));
        }

        $product->delete();

        return response()->json([
            'status' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
}
