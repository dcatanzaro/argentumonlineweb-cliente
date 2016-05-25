<?php 
namespace App\Http\Controllers;

class IndexadorController extends Controller {

	public function getIndex(){
		return view('indexador');
	}

}