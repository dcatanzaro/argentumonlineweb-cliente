<?php
namespace App\Http\Controllers;

use App\Accounts;
use App\Characters;
use Auth;

class CharactersController extends Controller {

	public function postCharacters() {
		if (Auth::check()) {
			$characters = Characters::where('idAccount', Auth::user()->idAccount)->get()->toJson();

			return $characters;
		}
	}

	public function postAllCharacters() {
		if (Auth::check()) {
			$characters = Accounts::where('accounts.idAccount', Auth::user()->idAccount)
				->join('characters', 'characters.idAccount', '=', 'accounts.idAccount')
				->get(array(
					'characters.nameCharacter',
					'characters.idHead',
					'characters.idBody',
					'characters.idShield',
					'characters.idWeapon',
					'characters.idHelmet',
				))
				->toJson();

			return $characters;
		}
	}
}
