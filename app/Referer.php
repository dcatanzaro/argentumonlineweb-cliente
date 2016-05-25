<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Referer extends Model {

    protected $connection = 'mongodb';
    protected $table = 'referer';
}