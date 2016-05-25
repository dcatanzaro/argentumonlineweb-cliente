<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Foundation\Inspiring;
use App\Accounts;
use App\RankingGeneral;
use App\RankingClases;
use App\Characters;
use DB;

class GenerarRanking extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'GenerarRanking';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Ranking General';

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function handle() {
		/*$accounts = Accounts::join('characters', 'characters.idAccount', '=', 'accounts.idAccount')
						->where('characters.privileges', 0)
						->groupBy('accounts.idAccount')
						->orderBy('countKills', 'DESC')
						->limit(50)
						->get(array('accounts.idAccount', DB::raw('SUM(characters.countKilled) AS countKills')))
						->toArray();

		$countPos = 0;
		foreach ($accounts as $account) {
			$countPos++;

			$ranking = RankingGeneral::where('pos', $countPos)->first(array('idRankingGeneral'));

			if ($ranking){
				$rankingGeneral = RankingGeneral::find($ranking->idRankingGeneral);
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idAccount = $account["idAccount"];
				$rankingGeneral->countKills = $account["countKills"];
				$rankingGeneral->save();
			} else {
				$rankingGeneral = new RankingGeneral();
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idAccount = $account["idAccount"];
				$rankingGeneral->countKills = $account["countKills"];
				$rankingGeneral->save();
			}
		}*/

		$characters = Characters::where('idClase', 1)
						->where('privileges', 0)
						->groupBy('idCharacter')
						->orderBy('countKills', 'DESC')
						->limit(50)
						->get(array('idCharacter', DB::raw('SUM(characters.countKilled) AS countKills')))
						->toArray();

		$countPos = 0;
		foreach ($characters as $character) {
			$countPos++;

			$ranking = RankingClases::where('pos', $countPos)->where('idClase', 1)->first(array('idRankingClases'));

			if ($ranking){
				$rankingGeneral = RankingClases::find($ranking->idRankingClases);
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idClase = 1;
				$rankingGeneral->idCharacter = $character["idCharacter"];
				$rankingGeneral->countKills = $character["countKills"];
				$rankingGeneral->save();
			} else {
				$rankingGeneral = new RankingClases();
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idClase = 1;
				$rankingGeneral->idCharacter = $character["idCharacter"];
				$rankingGeneral->countKills = $character["countKills"];
				$rankingGeneral->save();
			}
		}

		$characters = Characters::where('idClase', 2)
						->where('privileges', 0)
						->groupBy('idCharacter')
						->orderBy('countKills', 'DESC')
						->limit(50)
						->get(array('idCharacter', DB::raw('SUM(characters.countKilled) AS countKills')))
						->toArray();

		$countPos = 0;
		foreach ($characters as $character) {
			$countPos++;

			$ranking = RankingClases::where('pos', $countPos)->where('idClase', 2)->first(array('idRankingClases'));

			if ($ranking){
				$rankingGeneral = RankingClases::find($ranking->idRankingClases);
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idClase = 2;
				$rankingGeneral->idCharacter = $character["idCharacter"];
				$rankingGeneral->countKills = $character["countKills"];
				$rankingGeneral->save();
			} else {
				$rankingGeneral = new RankingClases();
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idClase = 2;
				$rankingGeneral->idCharacter = $character["idCharacter"];
				$rankingGeneral->countKills = $character["countKills"];
				$rankingGeneral->save();
			}
		}

		$characters = Characters::where('idClase', 3)
						->where('privileges', 0)
						->groupBy('idCharacter')
						->orderBy('countKills', 'DESC')
						->limit(50)
						->get(array('idCharacter', DB::raw('SUM(characters.countKilled) AS countKills')))
						->toArray();

		$countPos = 0;
		foreach ($characters as $character) {
			$countPos++;

			$ranking = RankingClases::where('pos', $countPos)->where('idClase', 3)->first(array('idRankingClases'));

			if ($ranking){
				$rankingGeneral = RankingClases::find($ranking->idRankingClases);
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idClase = 3;
				$rankingGeneral->idCharacter = $character["idCharacter"];
				$rankingGeneral->countKills = $character["countKills"];
				$rankingGeneral->save();
			} else {
				$rankingGeneral = new RankingClases();
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idClase = 3;
				$rankingGeneral->idCharacter = $character["idCharacter"];
				$rankingGeneral->countKills = $character["countKills"];
				$rankingGeneral->save();
			}
		}

		$characters = Characters::where('privileges', 0)
						->groupBy('idCharacter')
						->orderBy('countKills', 'DESC')
						->limit(50)
						->get(array('idCharacter', DB::raw('SUM(characters.countKilled) AS countKills')))
						->toArray();

		$countPos = 0;
		foreach ($characters as $character) {
			$countPos++;

			$ranking = RankingClases::where('pos', $countPos)->where('idClase', 0)->first(array('idRankingClases'));

			if ($ranking){
				$rankingGeneral = RankingClases::find($ranking->idRankingClases);
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idClase = 0;
				$rankingGeneral->idCharacter = $character["idCharacter"];
				$rankingGeneral->countKills = $character["countKills"];
				$rankingGeneral->save();
			} else {
				$rankingGeneral = new RankingClases();
				$rankingGeneral->pos = $countPos;
				$rankingGeneral->idClase = 0;
				$rankingGeneral->idCharacter = $character["idCharacter"];
				$rankingGeneral->countKills = $character["countKills"];
				$rankingGeneral->save();
			}
		}

		echo "Ranking general actualizado \n";
	}

}
