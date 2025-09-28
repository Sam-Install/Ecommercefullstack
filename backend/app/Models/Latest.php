<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Latest extends Model
{
    protected $fillable = [


          'title',
          'description',
          'image',
          'price'
    ];
}
