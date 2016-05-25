<?php 
namespace App\Http\Controllers;

use App\Accounts;
use Validator;
use Input;
use Hash;
use Auth;
use Session;
use Redirect;

class RegisterController extends Controller {

	public function getIndex(){
		if (Auth::check()){
			return Redirect::to('/');
		}

		return view('register');
	}

	public function postRegister(){
		$rules = array(
			'nameAccount' => 'required|unique:accounts|regex:/(^[A-Za-z0-9 ]+$)+/',
			'password' => 'required|min:6|confirmed',
			'password_confirmation' => 'required|min:6',
    		'email' => 'required|email',
		);

		$validator = Validator::make(Input::all(), $rules);

	    if ($validator->fails()) {
	      	return redirect('register')->withInput()->withErrors($validator);
	    } else {

	    	$account = new Accounts();
	    	$account->nameAccount = Input::get('nameAccount');
	    	$account->password = Hash::make(Input::get('password'));
	    	$account->email = Input::get('email');
	    	$account->save();

	    	Auth::login($account);

	    	Session::flash('login', true);
			Session::flash('name', Input::get('nameAccount'));
			Session::flash('password', Input::get('password'));
	    	Session::flash('info', 'Cuenta creada con éxito.');

	    	return redirect('/');
	    }
	}

}