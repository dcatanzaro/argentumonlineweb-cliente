<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model {

	protected $primaryKey = 'idTransaction';
	protected $table = 'transactions';

}