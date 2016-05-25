<?php 
namespace App\Http\Controllers;

use App;
use URL;
use App\Accounts;

class SitemapController extends Controller {

	public function getSitemap(){
		$sitemap = App::make("sitemap");

		$sitemap->add(URL::to('/'), '2015-06-07', '1.0', 'daily');

		$accounts = Accounts::get(array('nameAccount', 'updated_at'))->toArray();

		foreach ($accounts as $account) {
			$sitemap->add(URL::to('profile/' . urlencode($account['nameAccount'])), date('Y-m-d', strtotime($account['updated_at'])), '0.7', 'daily');
		}

		return $sitemap->render('xml');
	}
}
