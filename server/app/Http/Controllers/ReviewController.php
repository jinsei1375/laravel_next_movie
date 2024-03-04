<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($media_type, $media_id)
    {
        $reviews = Review::with('user')
            ->where('media_type', $media_type)
            ->where('media_id', $media_id)
            ->get();

        return response()->json($reviews);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $review = $request->input("rating");

        $validatedData = $request->validate([
            "content" => 'required|string',
            "rating" => 'required|integer',
            "media_type" => 'required|string',
            "media_id" => 'required|integer',
        ]);

        $review = Review::create([
            "user_id" => 1,
            "content" => $validatedData["content"],
            "rating" => $validatedData["rating"],
            "media_type" => $validatedData["media_type"],
            "media_id" => $validatedData["media_id"],
        ]);
        
        $review->load('user');
        return response()->json($review);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        //
    }
}
