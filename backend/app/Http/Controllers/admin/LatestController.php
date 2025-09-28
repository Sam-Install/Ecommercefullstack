<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Latest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LatestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Latest::all();

        return response()->json([
            'status' => true,
            'data' => $items
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $model = new Latest();
        $model->title = $request->title;
        $model->description = $request->description;
        $model->price = $request->price;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $model->image = $filename;
        }

        $model->save();

        return response()->json([
            'status' => true,
            'message' => 'Latest item added successfully',
            'item' => $model
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = Latest::find($id);

        if (!$item) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'item' => $item
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $item = Latest::find($id);
        if (!$item) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric',
            'image' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->has('title')) {
            $item->title = $request->title;
        }
        if ($request->has('description')) {
            $item->description = $request->description;
        }
        if ($request->has('price')) {
            $item->price = $request->price;
        }
        if ($request->hasFile('image')) {
            // delete old image if exists
            if ($item->image) {
                $oldPath = public_path('uploads') . '/' . $item->image;
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
            }
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $item->image = $filename;
        }

        $item->save();

        return response()->json([
            'status' => true,
            'message' => 'Latest item updated successfully',
            'item' => $item
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = Latest::find($id);

        if (!$item) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found'
            ], 404);
        }

        if ($item->image) {
            $imagePath = public_path('uploads') . '/' . $item->image;
            if (file_exists($imagePath)) {
                @unlink($imagePath);
            }
        }

        $item->delete();

        return response()->json([
            'status' => true,
            'message' => 'Latest item deleted successfully'
        ], 200);
    }
}
