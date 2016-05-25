<?php 
namespace App\Http\Controllers;

use App\Characters;
use App\Accounts;
use App\Inventary;
use App\Noticias;
use Auth;
use MongoClient;
use Hash;

class WelcomeController extends Controller {

	public function index() {
		//$noticias = Noticias::get();
		$noticias = array();

		return view('home')->with(array(
			"noticias" => $noticias,
			"isHome" => true
		));
	}

	public function getMigrar(){
		$m = new MongoClient();
		$bd = $m->aoweb;
		$collection = $bd->accounts;

		$cursor = $collection->find();

		foreach ($cursor as $account) {
			$nameAccount = $account["name"];
			$passwordAccount = $account["password"];
			$emailAccount = $account["email"];
			$idCharacterMongo = $account["idCharacter"];


			$collection = $bd->characters;
			$cursor2 = $collection->find(array("_id" => $idCharacterMongo));

			foreach ($cursor2 as $character) {
				$nameCharacter = $character["name"];
				$pjMatados = $character["pjMatados"];
				$exp = $character["exp"];
				$expNextLevel = $character["expNextLevel"];
				$lvl = $character["lvl"];

				$account = new Accounts();
		    	$account->nameAccount = $nameAccount;
		    	$account->password = Hash::make($passwordAccount);
		    	$account->email = $emailAccount;
		    	$account->save();

		    	$character = new Characters();
				$character->idAccount = $account->idAccount;
				$character->nameCharacter = $nameCharacter;
				$character->idClase = 1;
				$character->idHead = 1;
				$character->idBodyNaked = 1;
				$character->hp = 800;
				$character->maxHp = 800;
				$character->mana = 3000;
				$character->maxMana = 3000;
				$character->hit = 50;
				$character->acierto = 30;
				$character->countKilled = $pjMatados;

				$character->privileges = 0;
				$character->exp = $exp;
				$character->expNextLevel = $expNextLevel;
				$character->level = $lvl;
				$character->save();

				$vault = new Inventary();
				$vault->idCharacter = $character->idCharacter;
				$vault->idPos = 1;
				$vault->idGeneratedItem = 1;
				$vault->save();

				$vault = new Inventary();
				$vault->idCharacter = $character->idCharacter;
				$vault->idPos = 2;
				$vault->idGeneratedItem = 2;
				$vault->save();

				$vault = new Inventary();
				$vault->idCharacter = $character->idCharacter;
				$vault->idPos = 3;
				$vault->idGeneratedItem = 3;
				$vault->save();

				$magoBody = array(1, 3, 4, 6, 7, 9, 10, 12);
				$itemRandom = array_rand($magoBody);

				$vault = new Inventary();
				$vault->idCharacter = $character->idCharacter;
				$vault->idPos = 4;
				$vault->idGeneratedItem = $magoBody[$itemRandom] + 5;
				$vault->save();

				$character->idBody = $magoBody[$itemRandom] + 5;
				$character->idWeapon = 3;
				$character->save();
			}
		}
	}

}
