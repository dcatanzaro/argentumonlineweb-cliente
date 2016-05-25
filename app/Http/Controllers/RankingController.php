<?php
namespace App\Http\Controllers;

use App\Characters;
use DB;

class RankingController extends Controller {

	public function getIndex() {
		return view('ranking');
	}

	public function getRanking() {
		$returnInfo = Characters::orderBy("level", "desc")->where("privileges", 0)->limit(50)->groupBy('characters.idCharacter')->get(array(
			'characters.nameCharacter',
			'characters.idHead',
			'characters.idBody',
			'characters.level',
			'characters.idClase',
			'characters.criminal',
			'characters.idLastHead',
			'characters.idLastBody',
			'characters.idRaza',
			'characters.navegando',
			DB::raw('SUM(characters.ciudadanosMatados + characters.criminalesMatados) as kills')
		));

		return $returnInfo;
	}
}