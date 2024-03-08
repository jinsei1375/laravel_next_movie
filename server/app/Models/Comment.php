<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        "content",
        "user_id",
        "review_id"
    ];

    public function user()
    {
        return $this->BelongsTo(User::class);
    }

    public function review()
    {
        return $this->BelongsTo(Review::class);
    }
}
