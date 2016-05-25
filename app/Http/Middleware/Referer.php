<?php

namespace App\Http\Middleware;

use Closure;
use URL;
use Request;
use DB;
use Auth;

class Referer
{
    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
    	/*$referer = URL::previous();

    	if (strpos($referer, url()) === false){
            if (Auth::check()){
                DB::connection('mongodb')->table('referer')->insert(array(
                    'page' => $referer,
                    'idAccount' => Auth::user()->idAccount,
                    'time' => time()
                ));
            } else {
                DB::connection('mongodb')->table('referer')->insert(array(
                    'page' => $referer,
                    'time' => time()
                ));
            }
    		
    	}*/

        return $next($request);
    }

}