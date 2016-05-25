<?php
namespace App\Http\Controllers;

use App\BalanceRazas;
use App\Characters;
use App\Inventary;
use App\Spells;
use Auth;
use Input;
use Response;

class CreateCharacterController extends Controller {

	public function getIndex() {
		return view('createCharacter');
	}

	public function postCreateCharacter() {
		$nameCharacter = Input::get('name');
		$idClase = intval(Input::get('idClase'));
		$idGenero = intval(Input::get('idGenero'));
		$idRaza = intval(Input::get('idRaza'));
		$idHead = intval(Input::get('idHead'));

		$humanoHombreFirstHead = 1;
		$humanoHombreLastHead = 40;
		$elfoHombreFirstHead = 101;
		$elfoHombreLastHead = 122;
		$elfoDHombreFirstHead = 201;
		$elfoDHombreLastHead = 221;
		$enanoHombreFirstHead = 301;
		$enanoHombreLastHead = 319;
		$gnomoHombreFirstHead = 401;
		$gnomoHombreLastHead = 416;

		$arIDClases = [
			1 => 'mago',
			2 => 'clerigo',
			3 => 'guerrero',
			4 => 'asesino',
			6 => 'bardo',
			7 => 'druida',
			8 => 'paladin',
			9 => 'cazador',
		];

		$arIDRazas = [
			1 => 'humano',
			2 => 'elfo',
			3 => 'elfoDrow',
			4 => 'enano',
			5 => 'gnomo',
		];

		$arClases = [
			'mago' => 1,
			'clerigo' => 2,
			'guerrero' => 3,
			'asesino' => 4,
			'bardo' => 6,
			'druida' => 7,
			'paladin' => 8,
			'cazador' => 9,
		];

		$arRazas = [
			'humano' => 1,
			'elfo' => 2,
			'elfoDrow' => 3,
			'enano' => 4,
			'gnomo' => 5,
		];

		$arGeneros = [
			'hombre' => 1,
			'mujer' => 2,
		];

		$headValida = false;

		switch ($idRaza) {
		case $arRazas['humano']:
			if ($idHead >= $humanoHombreFirstHead && $idHead <= $humanoHombreLastHead) {
				$headValida = true;
			}
			break;
		case $arRazas['elfo']:
			if ($idHead >= $elfoHombreFirstHead && $idHead <= $elfoHombreLastHead) {
				$headValida = true;
			}
			break;
		case $arRazas['elfoDrow']:
			if ($idHead >= $elfoDHombreFirstHead && $idHead <= $elfoDHombreLastHead) {
				$headValida = true;
			}
			break;
		case $arRazas['enano']:
			if ($idHead >= $enanoHombreFirstHead && $idHead <= $enanoHombreLastHead) {
				$headValida = true;
			}
			break;
		case $arRazas['gnomo']:
			if ($idHead >= $gnomoHombreFirstHead && $idHead <= $gnomoHombreLastHead) {
				$headValida = true;
			}
			break;
		}

		if (!$headValida) {
			return Response::json(array('err' => true, 'msg' => 'La cabeza no es valida.'));
		}

		if (!$nameCharacter) {
			return Response::json(array('err' => true, 'msg' => 'Debes ingresar un nombre.'));
		}

		if (!preg_match("/(^[A-Za-z0-9 ]+$)+/", $nameCharacter)) {
			return Response::json(array('err' => true, 'msg' => 'El nombre tiene caracteres invalidos.'));
		}

		if (!$arIDClases[$idClase]) {
			return Response::json(array('err' => true, 'msg' => 'Clase invalida.'));
		}

		if (!$arIDRazas[$idRaza]) {
			return Response::json(array('err' => true, 'msg' => 'Raza invalida.'));
		}

		if ($idGenero != $arGeneros['hombre'] && $idGenero != $arGeneros['mujer']) {
			return Response::json(array('err' => true, 'msg' => 'Género invalido.'));
		}

		/*if ($idBody < 1 || $idBody > 12){
			return Response::json(array('err' => true, 'msg' => 'Ropa invalida.'));
		*/

		$countCharacters = Characters::where('idAccount', Auth::user()->idAccount)->count();

		if ($countCharacters == 10) {
			return Response::json(array('err' => true, 'msg' => 'Ya tienes el limite de personajes creados.'));
		}

		if (strlen($nameCharacter) > 15) {
			return Response::json(array('err' => true, 'msg' => 'El nombre puede tener como máximo 15 caracteres.'));
		}

		$existName = Characters::where('nameCharacter', $nameCharacter)->first();

		$balanceRazas = BalanceRazas::where('idRaza', $idRaza)->first();

		if (!$existName) {
			$character = new Characters();
			$character->idAccount = Auth::user()->idAccount;
			$character->nameCharacter = $nameCharacter;
			$character->idClase = $idClase;
			$character->idHead = $idHead;
			$character->muerto = 0;
			$character->idRaza = $idRaza;
			$character->idGenero = $idGenero;

			$character->attrFuerza = 18 + $balanceRazas->fuerza;
			$character->attrAgilidad = 18 + $balanceRazas->agilidad;
			$character->attrInteligencia = 18 + $balanceRazas->inteligencia;
			$character->attrConstitucion = 18 + $balanceRazas->constitucion;

			$character->hp = $character->attrConstitucion;
			$character->maxHp = $character->attrConstitucion;

			if ($idClase == $arClases['mago']) {
				$miInt = $character->attrInteligencia * 3;
			} else {
				if ($idClase != $arClases['guerrero'] && $idClase != $arClases['cazador']) {
					$miInt = 50;
				} else {
					$miInt = 0;
				}
			}

			$character->mana = $miInt;
			$character->maxMana = $miInt;

			$character->minHit = 1;
			$character->maxHit = 2;

			$character->privileges = 0;
			$character->exp = 0;
			$character->expNextLevel = 300;
			$character->level = 1;

			$character->map = 1;
			$character->posX = 50;
			$character->posY = 50;

			if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
				$ip = $_SERVER['HTTP_CLIENT_IP'];
			} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
				$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
			} else {
				$ip = $_SERVER['REMOTE_ADDR'];
			}

			$character->ip = $ip;
			$character->save();

			//Pociones rojas
			$idSlot = 1;
			self::saveItemInventary($character->idCharacter, $idSlot, 857, 200);

			if ($character->mana > 0) {
				//Pociones azules
				$idSlot++;
				self::saveItemInventary($character->idCharacter, $idSlot, 856, 200);
			}

			//Ropa
			$idSlot++;

			switch ($idRaza) {
			case $arRazas['humano']:
				$idRopa = 463;
				$character->idBody = 1;
				break;
			case $arRazas['elfo']:
				$idRopa = 464;
				$character->idBody = 2;
				break;
			case $arRazas['elfoDrow']:
				$idRopa = 465;
				$character->idBody = 3;
				break;
			case $arRazas['enano']:
				$idRopa = 466;
				$character->idBody = 300;
				break;
			case $arRazas['gnomo']:
				$idRopa = 466;
				$character->idBody = 300;
				break;
			}
			self::saveItemInventary($character->idCharacter, $idSlot, $idRopa, 1, true);

			//Arma
			$idSlot++;

			switch ($idClase) {
			case $arClases['cazador']:
				$idWeapon = 859;
				$character->idWeapon = 40;
				break;

			default:
				$idWeapon = 460;
				$character->idWeapon = 48;
				break;
			}
			self::saveItemInventary($character->idCharacter, $idSlot, $idWeapon, 1, true);

			//Municiones
			if ($idClase == $arClases['cazador']) {
				$idSlot++;
				$idMunicion = 860;
				$cant = 150;

				self::saveItemInventary($character->idCharacter, $idSlot, $idMunicion, $cant, true);
			}

			$character->save();

			if ($character->maxMana > 0) {
				$spells = new Spells();
				$spells->idCharacter = $character->idCharacter;
				$spells->idSpell = 2;
				$spells->idPos = 1;
				$spells->save();
			}

			return Response::json(array('success' => true));
		} else {
			return Response::json(array('err' => true, 'msg' => 'Ya existe un personaje con ese nombre.'));
		}
	}

	private function saveItemInventary($idCharacter, $idPos, $idItem, $cant, $equipped = false) {
		$inventary = new Inventary();
		$inventary->idCharacter = $idCharacter;
		$inventary->idPos = $idPos;
		$inventary->idItem = $idItem;
		$inventary->cant = $cant;
		$inventary->equipped = $equipped;
		$inventary->save();
	}
}