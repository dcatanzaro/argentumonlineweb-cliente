<?php
namespace App\Http\Controllers;

use App\Accounts;
use App\GeneratedItems;
use App\Items;
use App\Vault;
use Auth;
use Input;
use Redirect;
use Response;

class ShopController extends Controller {

	public function getIndex() {
		return Redirect::to('/');

		if (!Auth::check()) {
			return Redirect::to('register');
		}

		return view('shop');
	}

	public function postItems() {
		$objType = Input::get('objType');

		if ($objType === "1") {
			$items = Items::whereIn('objType', array(4, 5))->where('shop', true)->join('imagesItems', 'imagesItems.idImageItem', '=', 'items.idImageItem')->orderBy('items.valorOro')
				->get(array(
					'nameItem',
					'nameImageItem',
					'extensionImageItem',
					'valorOro',
					'valorGema',
					'idItem',
				))->toJson();
		} else {
			if ($objType == 2) {
				//Armaduras
				$objType = 3;
			} elseif ($objType == 3) {
				//Cascos
				$objType = 2;
			}

			$items = Items::where('objType', $objType)->where('shop', true)->join('imagesItems', 'imagesItems.idImageItem', '=', 'items.idImageItem')->orderBy('items.valorOro')
				->get(array(
					'nameItem',
					'nameImageItem',
					'extensionImageItem',
					'valorOro',
					'valorGema',
					'idItem',
				))->toJson();
		}

		return $items;
	}

	public function postItem() {
		$idItem = Input::get('idItem');

		$item = Items::where('idItem', $idItem)->join('imagesItems', 'imagesItems.idImageItem', '=', 'items.idImageItem')->first()->toJson();

		return $item;
	}

	public function postBuyWithGold() {

		$idItem = Input::get('idItem');

		$item = Items::find($idItem);

		if (Auth::user()->gold < $item->valorOro) {
			return Response::json(array(
				'err' => 'No tienes sufiente oro para hacer esta compra.',
			));
		}

		$account = Accounts::find(Auth::user()->idAccount);
		$account->gold -= $item->valorOro;
		$account->save();

		$stats = $this->generateNewItem($item);

		$generatedItem = new GeneratedItems();
		$generatedItem->idItem = $idItem;
		$generatedItem->dmg = $stats['dmg'];
		$generatedItem->armor = $stats['armor'];
		$generatedItem->vida = $stats['vida'];
		$generatedItem->mana = $stats['mana'];
		$generatedItem->lifeSteal = $stats['lifeSteal'];
		$generatedItem->critChance = $stats['critChance'];
		$generatedItem->critDmg = $stats['critDmg'];
		$generatedItem->cdr = $stats['cdr'];
		$generatedItem->rm = $stats['rm'];
		$generatedItem->magicPen = $stats['magicPen'];
		$generatedItem->armorPen = $stats['armorPen'];
		$generatedItem->hpRegen = $stats['hpRegen'];
		$generatedItem->manaRegen = $stats['manaRegen'];
		$generatedItem->socket = $stats['socket'];
		$generatedItem->save();

		$idGeneratedItem = $generatedItem->idGeneratedItem;
		$itemsVault = Vault::where('idAccount', Auth::user()->idAccount)->get(array('idPos'));

		if (!count($itemsVault)) {
			$vault = new Vault();
			$vault->idAccount = Auth::user()->idAccount;
			$vault->idPos = 1;
			$vault->idGeneratedItem = $idGeneratedItem;
			$vault->save();
		} else {
			$itemsPosVault = array();

			foreach ($itemsVault as $item) {
				$itemsPosVault[] = $item->idPos;
			}

			for ($idPos = 1; $idPos <= 40; $idPos++) {
				if (!in_array($idPos, $itemsPosVault)) {

					$vault = new Vault();
					$vault->idAccount = Auth::user()->idAccount;
					$vault->idPos = $idPos;
					$vault->idGeneratedItem = $idGeneratedItem;
					$vault->save();

					break;
				}
			}
		}

		return Response::json(array('err' => false, 'item' => $generatedItem));
	}

	public function generateNewItem($item) {
		$stats = array();

		if ($item->dmgMax > 0) {
			$stats['dmg'] = mt_rand($item->dmgMin, $item->dmgMax);
		} else {
			$stats['dmg'] = 0;
		}

		if ($item->armorMax > 0) {
			$stats['armor'] = mt_rand($item->armorMin, $item->armorMax);
		} else {
			$stats['armor'] = 0;
		}

		if ($item->vidaMax > 0) {
			$stats['vida'] = mt_rand($item->vidaMin, $item->vidaMax);
		} else {
			$stats['vida'] = 0;
		}

		if ($item->manaMax > 0) {
			$stats['mana'] = mt_rand($item->manaMin, $item->manaMax);
		} else {
			$stats['mana'] = 0;
		}

		if ($item->lifeStealMax > 0) {
			$stats['lifeSteal'] = mt_rand($item->lifeStealMin, $item->lifeStealMax);
		} else {
			$stats['lifeSteal'] = 0;
		}

		if ($item->critChanceMax > 0) {
			$stats['critChance'] = mt_rand($item->critChanceMin, $item->critChanceMax);
		} else {
			$stats['critChance'] = 0;
		}

		if ($item->critDmgMax > 0) {
			$stats['critDmg'] = mt_rand($item->critDmgMin, $item->critDmgMax);
		} else {
			$stats['critDmg'] = 0;
		}

		if ($item->cdrMax > 0) {
			$stats['cdr'] = mt_rand($item->cdrMin, $item->cdrMax);
		} else {
			$stats['cdr'] = 0;
		}

		if ($item->rmMax > 0) {
			$stats['rm'] = mt_rand($item->rmMin, $item->rmMax);
		} else {
			$stats['rm'] = 0;
		}

		if ($item->magicPenMax > 0) {
			$stats['magicPen'] = mt_rand($item->magicPenMin, $item->magicPenMax);
		} else {
			$stats['magicPen'] = 0;
		}

		if ($item->armorPenMax > 0) {
			$stats['armorPen'] = mt_rand($item->armorPenMin, $item->armorPenMax);
		} else {
			$stats['armorPen'] = 0;
		}

		if ($item->hpRegenMax > 0) {
			$stats['hpRegen'] = mt_rand($item->hpRegenMin, $item->hpRegenMax);
		} else {
			$stats['hpRegen'] = 0;
		}

		if ($item->manaRegenMax > 0) {
			$stats['manaRegen'] = mt_rand($item->manaRegenMin, $item->manaRegenMax);
		} else {
			$stats['manaRegen'] = 0;
		}

		if ($item->socketMax > 0) {
			$stats['socket'] = mt_rand($item->socketMin, $item->socketMax);
		} else {
			$stats['socket'] = 0;
		}

		return $stats;
	}
}
