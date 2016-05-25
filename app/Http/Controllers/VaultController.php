<?php
namespace App\Http\Controllers;

use App\Accounts;
use App\Characters;
use App\Inventary;
use App\Vault;
use Auth;
use Input;
use Redirect;

class VaultController extends Controller {

	public function getIndex() {
		return Redirect::to('/');

		if (!Auth::check()) {
			return Redirect::to('register');
		}

		$characters = Accounts::where('nameAccount', Auth::user()->nameAccount)
			->join('characters', 'characters.idAccount', '=', 'accounts.idAccount')
			->leftJoin('generatedItems AS giWeapon', 'giWeapon.idGeneratedItem', '=', 'characters.idWeapon')
			->leftJoin('generatedItems AS giBody', 'giBody.idGeneratedItem', '=', 'characters.idBody')
			->leftJoin('generatedItems AS giHelmet', 'giHelmet.idGeneratedItem', '=', 'characters.idHelmet')
			->leftJoin('items AS iWeapon', 'iWeapon.idItem', '=', 'giWeapon.idItem')
			->leftJoin('items AS iBody', 'iBody.idItem', '=', 'giBody.idItem')
			->leftJoin('items AS iHelmet', 'iHelmet.idItem', '=', 'giHelmet.idItem')
			->leftJoin('animationsItems AS animWeapon', 'animWeapon.idAnimationItem', '=', 'iWeapon.idAnimationItem')
			->leftJoin('animationsItems AS animBody', 'animBody.idAnimationItem', '=', 'iBody.idAnimationItem')
			->leftJoin('animationsItems AS animHelmet', 'animHelmet.idAnimationItem', '=', 'iHelmet.idAnimationItem')
			->groupBy('characters.idCharacter')
			->get(array(
				'characters.idCharacter',
				'characters.nameCharacter',
				'characters.idClase',
				'characters.level',
				'characters.idHead',
				'animBody.nameAnimationItem AS animationBody',
				'animHelmet.nameAnimationItem AS animationHelmet',
			));

		return view('vault')->with(array("characters" => $characters));
	}

	public function postItemsVault() {
		$itemsVault = Vault::where('idAccount', Auth::user()->idAccount)
			->join('generatedItems', 'generatedItems.idGeneratedItem', '=', 'vault.idGeneratedItem')
			->join('items', 'items.idItem', '=', 'generatedItems.idItem')
			->join('imagesItems', 'imagesItems.idImageItem', '=', 'items.idImageItem')
			->get()
			->toJson();

		return $itemsVault;
	}

	public function postNewPosItem() {
		$idItem = Input::get('idItem');
		$oldPosItem = Input::get('oldPosItem');
		$newPosItem = Input::get('newPosItem');

		$vaultItem = Vault::where('idAccount', Auth::user()->idAccount)
			->where('idPos', $oldPosItem)
			->where('idGeneratedItem', $idItem)
			->first(array('idVault'));

		if ($vaultItem) {
			$vault = Vault::where('idAccount', Auth::user()->idAccount)->where('idPos', $newPosItem)->count();

			if (!$vault) {
				$item = Vault::find($vaultItem->idVault);
				$item->idPos = $newPosItem;
				$item->save();
			}
		}
	}

	public function postNewPosItemInventary() {
		$idItem = Input::get('idItem');
		$oldPosItem = Input::get('oldPosItem');
		$newPosItem = Input::get('newPosItem');
		$idCharacter = Input::get('idCharacter');

		$inventaryItem = Inventary::where('idCharacter', $idCharacter)
			->where('idPos', $oldPosItem)
			->where('idGeneratedItem', $idItem)
			->first(array('idInventary'));

		if ($inventaryItem) {
			$inventary = Inventary::where('idCharacter', $idCharacter)->where('idPos', $newPosItem)->count();

			if (!$inventary) {
				$item = Inventary::find($inventaryItem->idInventary);
				$item->idPos = $newPosItem;
				$item->save();
			}
		}
	}

	public function postItemsInventary() {
		$idCharacter = Input::get('idCharacter');

		$items = Characters::where('characters.idCharacter', $idCharacter)
			->leftJoin('inventary', 'inventary.idCharacter', '=', 'characters.idCharacter')
			->leftJoin('generatedItems AS giInventary', 'giInventary.idGeneratedItem', '=', 'inventary.idGeneratedItem')
			->leftJoin('items AS iInventary', 'iInventary.idItem', '=', 'giInventary.idItem')
			->leftJoin('imagesItems', 'imagesItems.idImageItem', '=', 'iInventary.idImageItem')
			->get(array(
				'iInventary.nameItem',
				'giInventary.idGeneratedItem',
				'inventary.idPos',
				'imagesItems.nameImageItem',
				'iInventary.idClase',
				'iInventary.levelMin',
				'giInventary.dmg',
				'giInventary.armor',
				'giInventary.vida',
				'giInventary.mana',
				'giInventary.lifeSteal',
				'giInventary.critChance',
				'giInventary.critDmg',
				'giInventary.cdr',
				'giInventary.rm',
				'giInventary.magicPen',
				'giInventary.armorPen',
				'giInventary.hpRegen',
				'giInventary.manaRegen',
				'giInventary.socket',
			))
			->toJson();

		return $items;
	}

	public function postItemToInventary() {
		$idItemVault = Input::get('idItemVault');
		$idPosInventary = Input::get('idPosInventary');
		$idCharacter = Input::get('idCharacter');

		if ($idItemVault && $idCharacter && $idPosInventary >= 1 && $idPosInventary <= 21) {
			$vaultItem = Vault::where('idAccount', Auth::user()->idAccount)
				->where('idGeneratedItem', $idItemVault)
				->count();

			if ($vaultItem) {
				$character = Characters::where('idCharacter', $idCharacter)->where('idAccount', Auth::user()->idAccount)->count();

				if ($character) {
					$inventary = Inventary::where('idCharacter', $idCharacter)->where('idPos', $idPosInventary)->count();

					if (!$inventary) {
						Vault::where('idAccount', Auth::user()->idAccount)
							->where('idGeneratedItem', $idItemVault)
							->delete();

						$inventary = new Inventary();
						$inventary->idCharacter = $idCharacter;
						$inventary->idPos = $idPosInventary;
						$inventary->idGeneratedItem = $idItemVault;
						$inventary->save();
					}
				}
			}
		}
	}

	public function postItemToVault() {
		$idItemInventary = Input::get('idItemInventary');
		$idPosVault = Input::get('idPosVault');
		$idCharacter = Input::get('idCharacter');

		if ($idItemInventary && $idCharacter && $idPosVault >= 1 && $idPosVault <= 100) {
			$inventaryItem = Inventary::where('idCharacter', $idCharacter)
				->where('idGeneratedItem', $idItemInventary)
				->count();

			if ($inventaryItem) {
				$character = Characters::where('idCharacter', $idCharacter)->where('idAccount', Auth::user()->idAccount)->count();

				if ($character) {
					$vault = Vault::where('idAccount', Auth::user()->idAccount)->where('idPos', $idPosVault)->count();

					if (!$vault) {
						Inventary::where('idCharacter', $idCharacter)
							->where('idGeneratedItem', $idItemInventary)
							->delete();

						$vault = new Vault();
						$vault->idAccount = Auth::user()->idAccount;
						$vault->idPos = $idPosVault;
						$vault->idGeneratedItem = $idItemInventary;
						$vault->save();
					}
				}
			}
		}
	}
}
