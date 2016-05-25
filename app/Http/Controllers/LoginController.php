<?php 
namespace App\Http\Controllers;

use Input;
use Auth;
use Redirect;
use Session;

class LoginController extends Controller {

	public function postLogin() {
		if (Auth::attempt(array('nameAccount' => Input::get('name'), 'password' => Input::get('password')), true)){
			Session::flash('login', true);
			Session::flash('name', Input::get('name'));
			Session::flash('password', Input::get('password'));
			return Redirect::to('/');
		} else {
			Session::flash('err', 'Los datos son incorrectos.');
			return Redirect::to('/');
		}
	}

	public function getLogout(){
		Auth::logout();
		return Redirect::to('/');
	}
}
