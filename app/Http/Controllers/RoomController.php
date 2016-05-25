<?php 
namespace App\Http\Controllers;

use App\Rooms;
use App\Characters;
use App\Accounts;
use Auth;
use Input;
use Session;
use Response;
use Redirect;

class RoomController extends Controller {

	public function getIndex($idRoom = null){
		if (!Auth::check()){
			return Redirect::to('register');
		}

		$rooms = Rooms::where('visible', true)->leftJoin('accounts', 'accounts.idAccount', '=', 'rooms.idAccount')->get(array('rooms.*', 'accounts.nameAccount'));

		return view('rooms')->with(array('rooms' => $rooms));
	}

	public function getRoom($idRoom, $nameAccount){
		if (!Auth::check()){
			return Redirect::to('register');
		}

		if (!$idRoom || !$nameAccount){
			return;
		}

		$passwordRoom = Input::get('password');

		$nameAccount = urldecode($nameAccount);
		$account = Accounts::where('nameAccount', $nameAccount)->first();

		if ($account){
			$room = Rooms::where('idRoom', $idRoom)->where('idAccount', $account->idAccount)->where('visible', true)->first();

			if ($room){
				if ($room->password){
					if ($room->password == $passwordRoom){
						return view('room')->with(array('room' => $room, 'nameCreator' => $account->nameAccount, 'modalPassword' => false));
					} else {
						$room->password = "";
						
						return view('room')->with(array('room' => $room, 'modalPassword' => true));
					}
				} else {
					return view('room')->with(array('room' => $room, 'nameCreator' => $account->nameAccount, 'modalPassword' => false));
				}
			} else {
				return Redirect::to('rooms');
			}
		} else {
			return Redirect::to('rooms');
		}
	}

	public function getCreateRoom(){
		if (!Auth::check()){
			return Redirect::to('register');
		}

		$account = Accounts::where('idAccount', Auth::user()->idAccount)->whereNull('idRoom')->count();

		if (!$account){
			Session::flash('err', 'Ya tienes una sala creada.');
			return Redirect::to('rooms');
		} else {
			return view('createRoom');
		}
	}

	public function redirectToCreateRoom(){
		if (!Auth::check()){
			return Redirect::to('register');
		}

		$nameCharacter = Input::get('nameCharacter');

		$character = Characters::where('nameCharacter', $nameCharacter)->where('idAccount', Auth::user()->idAccount)->first(array('level', 'idCharacter'));

		if ($character){
			Session::put('levelCharacter', $character->level);
			Session::put('idCharacter', $character->idCharacter);

			return '1';
		}
	}

	public function postCreateRoom(){
		if (!Auth::check()){
			return;
		}

		$checkRoom = Accounts::where('idAccount', Auth::user()->idAccount)->whereNull('idRoom')->count();

		if (!$checkRoom){
			return;
		}

		$nameRoom = Input::get("nameRoom");
		$password = Input::get("password");
		$levelMax = intval(Input::get("levelMax"));
		$userMax = intval(Input::get("userMax"));
		$numBots = intval(Input::get("numBots"));

		if (!$nameRoom || ($levelMax && $levelMax < Session::get('levelCharacter')) || $userMax < 0 || $userMax > 12 || $numBots < 0 || $numBots > 10){
			return;
		}

		$room = new Rooms();
		$room->nameRoom = $nameRoom;

		if ($password){
			$room->password = $password;
		} else {
			$room->password = "";
		}

		if ($levelMax){
			$room->maxLevel = $levelMax;
		} else {
			$room->maxLevel = 0;
		}

		$room->visible = false;

		if ($userMax){
			$room->maxUsers = $userMax;
		} else {
			$room->maxUsers = 0;
		}

		$room->bots = $numBots;

		$room->idAccount = Auth::user()->idAccount;
		$room->cantUsers = 0;
		$room->save();

		return Response::json(array($room));
	}

	public function postCheckRoom(){
		if (!Auth::check()){
			return Redirect::to('register');
		}

		$idRoom = Input::get('idRoom');

		$room = Rooms::where('idRoom', $idRoom)->first(array('cantUsers', 'maxUsers'));

		return Response::json(array('cantUsers' => $room->cantUsers, 'maxUsers' => $room->maxUsers));
	}

	public function postCheckPassword(){
		if (!Auth::check()){
			return Redirect::to('register');
		}

		$idRoom = Input::get('idRoom');
		$password = Input::get('password');

		$room = Rooms::where('idRoom', $idRoom)->first(array('password'));

		if ($room){
			if ($room->password == $password){
				return Response::json(array('error' => 0));
			} else {
				return Response::json(array('error' => 1));
			}
		} else {
			return Response::json(array('error' => 1));
		}
	}
}