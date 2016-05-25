<?php
namespace App\Http\Controllers;

use App\Accounts;
use Input;
use Redirect;

class PerfilController extends Controller {

	public function getIndex($nameProfile) {
		return Redirect::to('/');

		$nameProfile = urldecode($nameProfile);
		$profile = Accounts::where('nameAccount', $nameProfile)->first();

		if ($profile) {
			return view('profile')->with(array('profile' => $profile));
		} else {
			return Redirect::to('/');
		}
	}

	public function postProfile() {

		$profileType = Input::get('profileType');
		$nameAccount = Input::get('nameAccount');

		switch ($profileType) {
		case 1:
			$infoReturn = Accounts::where('nameAccount', $nameAccount)->first()->toJson();
			break;

		case 2:
			$infoReturn = Accounts::where('nameAccount', $nameAccount)
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
				->leftJoin('inventary', 'inventary.idCharacter', '=', 'characters.idCharacter')
				->leftJoin('generatedItems AS giInventary', 'giInventary.idGeneratedItem', '=', 'inventary.idGeneratedItem')
				->leftJoin('items AS iInventary', 'iInventary.idItem', '=', 'giInventary.idItem')
				->leftJoin('imagesItems', 'imagesItems.idImageItem', '=', 'iInventary.idImageItem')
				->groupBy('characters.idCharacter')
				->get(array(
					'characters.idCharacter',
					'characters.nameCharacter',
					'characters.idClase',
					'characters.level',
					'characters.idHead',
					'characters.idBody',
					'characters.idWeapon',
					'characters.idHelmet',
					'characters.maxHp',
					'characters.maxMana',
					'characters.hit',
					'characters.dmg',
					'characters.armor',
					'characters.fireDmg',
					'characters.aquaDmg',
					'characters.windDmg',
					'characters.earthDmg',
					'characters.magicDmg',
					'characters.lifeSteal',
					'characters.magicResist',
					'characters.criticalChance',
					'characters.criticalDmg',
					'characters.cooldownReduction',
					'characters.fireResist',
					'characters.aquaResist',
					'characters.windResist',
					'characters.earthResist',
					'characters.magicPen',
					'characters.armorPen',
					'characters.hpRegen',
					'characters.manaRegen',
					'giBody.armor AS bodyArmor',
					'giWeapon.dmg AS weaponDmg',
					'giHelmet.armor AS helmetArmor',
					'iBody.nameItem AS nameArmor',
					'iWeapon.nameItem AS nameWeapon',
					'iHelmet.nameItem AS nameHelmet',
					'animBody.nameAnimationItem AS animationBody',
					'animWeapon.nameAnimationItem AS animationWeapon',
					'animHelmet.nameAnimationItem AS animationHelmet',
				))
				->toJson();
			break;

		case 3:
			$infoReturn = Accounts::where('nameAccount', $nameAccount)->first();
			break;
		}

		return $infoReturn;
	}
}
