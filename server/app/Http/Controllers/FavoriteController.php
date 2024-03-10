<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function toggleFavorite(Request $request)
    {
        $validatedData = $request->validate([
            "media_type" => 'required|string',
            "media_id" => 'required|integer',
        ]);

        $existingFavorite = Favorite::where('user_id', Auth::id())
            ->where('media_type', $validatedData['media_type'])
            ->where('media_id', $validatedData['media_id'])
            ->first();

        if($existingFavorite) {
            //お気に入りがすでに存在している場合
            $existingFavorite->delete();
            return response()->json(["status" => "revmove"]);
        } else {
            //お気に入りが存在していない場合
            Favorite::create([
                'media_type' => $validatedData['media_type'],
                'media_id' => $validatedData['media_id'],
                'user_id' => Auth::id(),
            ]);
            return response()->json(["status" => "added"]);
        }
    }

    public function checkFavoriteStatus(Request $request)
    {
        $validatedData = $request->validate([
            "media_type" => 'required|string',
            "media_id" => 'required|integer',
        ]);

        $isFavorite = Favorite::where('user_id', Auth::id())
            ->where('media_type', $validatedData['media_type'])
            ->where('media_id', $validatedData['media_id'])
            ->exists();
        
        return response()->json($isFavorite);
    }
}
