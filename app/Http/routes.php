<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
 */
Route::get('/', 'WelcomeController@index');

Route::get('sitemap', 'SitemapController@getSitemap');

Route::get('profile/{nameProfile}', 'PerfilController@getIndex');

Route::get('shop', 'ShopController@getIndex');
Route::get('ranking', 'RankingController@getIndex');
Route::get('vault', 'VaultController@getIndex');
Route::get('register', 'RegisterController@getIndex');
Route::post('register', 'RegisterController@postRegister');
Route::get('createCharacter', 'CreateCharacterController@getIndex');
Route::post('createCharacter', 'CreateCharacterController@postCreateCharacter');

Route::get('rooms/{idRoom?}', 'RoomController@getIndex');
Route::get('room/{idRoom}/{nameAccount}', 'RoomController@getRoom');
Route::get('createRoom', 'RoomController@getCreateRoom');
Route::post('postCreateRoom', 'RoomController@postCreateRoom');
Route::post('redirectToCreateRoom', 'RoomController@redirectToCreateRoom');
Route::post('checkRoom', 'RoomController@postCheckRoom');
Route::post('checkPassword', 'RoomController@postCheckPassword');

Route::get('play', 'PlayController@getIndex');

Route::post('login', 'LoginController@postLogin');
Route::get('logout', 'LoginController@getLogout');

Route::post('get', 'ShopController@postItems');

Route::group(['prefix' => 'api'], function () {
	Route::group(['prefix' => 'characters'], function () {
		Route::post('get', 'CharactersController@postCharacters');
		Route::post('getAll', 'CharactersController@postAllCharacters');
	});

	Route::group(['prefix' => 'profile'], function () {
		Route::post('get', 'PerfilController@postProfile');
	});

	Route::group(['prefix' => 'item'], function () {
		Route::post('get', 'ShopController@postItem');
		Route::post('vault/moveItem', 'VaultController@postNewPosItem');
		Route::post('inventary/moveItem', 'VaultController@postNewPosItemInventary');
		Route::post('vault/toInventary', 'VaultController@postItemToInventary');
		Route::post('vault/toVault', 'VaultController@postItemToVault');
	});

	Route::group(['prefix' => 'inventary'], function () {
		Route::post('get', 'VaultController@postItemsInventary');
	});

	Route::group(['prefix' => 'items'], function () {
		Route::post('get', 'ShopController@postItems');
		Route::post('vault/get', 'VaultController@postItemsVault');
	});

	Route::group(['prefix' => 'buy'], function () {
		Route::post('withGold', 'ShopController@postBuyWithGold');
		//Route::post('withGems', 'ShopController@postBuyWithGems');
	});

	Route::group(['prefix' => 'ranking'], function () {
		Route::get('get', 'RankingController@getRanking');
	});
});

Route::group(['prefix' => 'intranet'], function () {
	Route::get('indexador', 'IndexadorController@getIndex');
});