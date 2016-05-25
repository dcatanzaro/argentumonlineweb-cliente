<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="canonical" href="{{ URL::current() }}">

    <link rel="shortcut icon" href="{{ asset('icon/favicon.ico') }}">

    <meta name="google-site-verification" content="A_qYRLJ20xVi_t1wQk6YPB29y7sxMAnFPbylPhYvQfQ" />

    <link rel="apple-touch-icon" sizes="57x57" href="{{ asset('icon/apple-icon-57x57.png') }}">
    <link rel="apple-touch-icon" sizes="60x60" href="{{ asset('icon/apple-icon-60x60.png') }}">
    <link rel="apple-touch-icon" sizes="72x72" href="{{ asset('icon/apple-icon-72x72.png') }}">
    <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('icon/apple-icon-76x76.png') }}">
    <link rel="apple-touch-icon" sizes="114x114" href="{{ asset('icon/apple-icon-114x114.png') }}">
    <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('icon/apple-icon-120x120.png') }}">
    <link rel="apple-touch-icon" sizes="144x144" href="{{ asset('icon/apple-icon-144x144.png') }}">
    <link rel="apple-touch-icon" sizes="152x152" href="{{ asset('icon/apple-icon-152x152.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('icon/apple-icon-180x180.png') }}">
    <link rel="icon" type="image/png" sizes="192x192"  href="{{ asset('icon/android-icon-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('icon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('icon/favicon-96x96.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('icon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('icon/manifest.json') }}">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ asset('icon/ms-icon-144x144.png') }}">
    <meta name="theme-color" content="#ffffff">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="keywords" content="argentum online web, argentum online, juego gratis, juegos gratis pvp, juego pvp, juego online gratis, argentum pvp, ao pvp" >
    <meta name="description" content="Argentum Online Web es un juego de Rol gratuito, en el que podrás demostrar tus habilidades combatiendo contra otros usuarios. - http://argentumonlineweb.com"/>
    <title>Argentum Online Web</title>
    <link rel="stylesheet" href="{{ asset('css/web.css?v=15') }}">
    <link rel="stylesheet" href="{{ asset('css/play.css') }}">

    <meta property="og:title" content="Argentum Online Web" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="http://i.imgur.com/jztDObp.png" />
    <meta property="og:url" content="http://argentumonlineweb.com" />
    <meta property="og:description" content="Argentum Online Web es un juego de PvP gratuito, en el que podrás demostrar tus habilidades combatiendo contra otros usuarios." />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="http://argentumonlineweb.com" />
    <meta name="twitter:title" content="Argentum Online Web" />
    <meta name="twitter:description" content="Argentum Online Web es un juego de PvP gratuito, en el que podrás demostrar tus habilidades combatiendo contra otros usuarios." />
    <meta name="twitter:image" content="http://i.imgur.com/jztDObp.png" />

    @yield('css')

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <script src="{{ asset('js/jquery-2.1.4.min.js') }}"></script>
    <script src="{{ asset('js/renderCharacters.js') }}"></script>
</head>

<body>
    <div class="background">
        <div class="container">

            <div class="logo">
                <a href="/"><img src="{{ asset('assets/imgs/logo.png') }}" alt="logo"></a>
            </div>
            <nav>
                <ul>
                    <a href="{{ URL::to('/') }}"><li class="inicio">INICIO</li></a>

                    @if (Auth::check())
                        <a href="{{ URL::to('vault') }}"><li class="registro">BÓVEDA</li></a>
                    @else
                        <a href="{{ URL::to('register') }}"><li class="registro">REGISTRO</li></a>
                    @endif

                    <a href="{{ URL::to('shop') }}"><li class="tienda">TIENDA</li></a>
                    <?php
if (Auth::check()) {
	$characters = DB::table('characters')->where('idAccount', Auth::user()->idAccount)->count();
} else {
	$characters = 0;
}
?>
                    @if (Auth::check())
                        @if ($characters > 0)
                            <a onclick="selectCharacter();"><li class="jugar"></li></a>
                        @else
                            <a href="{{ URL::to('createCharacter') }}"><li class="jugar"></li></a>
                        @endif
                    @else
                        <a href="{{ URL::to('register') }}"><li class="jugar"></li></a>
                    @endif

                    <a href="{{ url('ranking') }}"><li class="ranking-nav">RANKING</li></a>
                    <a onclick="proximamente()"><li class="clanes">CLANES</li></a>
                    <a href="http://foro.argentumonlineweb.com/" target="_blank"><li class="foro">FORO</li></a>
                </ul>
                <img src="{{ asset('assets/imgs/web/navbar.png') }}" alt="">
            </nav>

            @if (isset($isHome)):
            <div class="slider" style="display: none;">
                <div class="content">

                </div>
            </div>

            <div class="gralinfo">
                <div class="shadow">
                    <h2>¡Bienvenidos a Argentum Online Web!</h2>
                    <p>
                        <a href="{{ url('register') }}" title="">Regístrate</a> o <strong>Ingresa</strong> para poder jugar!
                    </p>
                </div>
            </div>
            @endif

            <div class="servidores">
                <div class="svtitulo">
                    <img src="{{ asset('assets/imgs/web/deco.png') }}" alt="">
                    <p class="servidorTxt">SERVIDOR</p>

                    <?php $usersOnline = DB::table('usersOnline')->first();?>

                    <p class="cantUser" style="color: green;">Online</span></p>
                </div>
                @if (Auth::check())
                <div class="login" style="height: 150px;">
                    <div class="avatar">
                        <img src="http://www.gravatar.com/avatar/{{ md5(strtolower(trim(Auth::user()->mail))) }}" alt="">
                        <a href="{{ URL::to('logout') }}">SALIR <i class="fa fa-sign-out"></i></a>
                    </div>
                    <span class="name">{{ Auth::user()->nameAccount }}</span>
                    <div class="buttons">
                        <a href="{{ URL::to('profile/' . urlencode(Auth::user()->nameAccount)) }}"><i class="fa fa-user"></i> PERFIL</a>
                        <a href="{{ URL::to('vault') }}" style="margin-top: 12px;"><i class="fa fa-archive"></i> BÓVEDA</a>

                        <div class="price">
                            <div class="cont" style="margin-right: 15px;">
                                <img src="{{ asset('assets/imgs/web/coin.png') }}" alt="">
                                <span>{{ Auth::user()->gold }}</span>
                            </div>
                            <div class="cont">
                                <img src="{{ asset('assets/imgs/ruby.png') }}" alt="">
                                <span>{{ Auth::user()->gems }}</span>
                            </div>
                        </div>
                    </div>
                    @else
                <div class="login" style="height: 140px;">
                    <form method="POST" action="{{ URL::to('login') }}">
                        <div class="user">
                            <p>USUARIO</p>
                            <div class="contentInput">
                                <input type="text" name="name" id="name">
                            </div>
                        </div>
                        <div class="pass">
                            <p>CONTRASEÑA</p>
                            <div class="contentInput">
                                <input type="password" name="password" id="password">
                            </div>
                        </div>
                        <a href="register" style="text-decoration: none; color: #006e2e; margin-right: 44px;">CREAR CUENTA</a>
                        <input type="submit" value="ENTRAR" class="bold" style="color: #ff9000; margin-right: 29px;">
                    </form>
                    @endif
                </div>
                <div class="ranking" style="display: none;">
                    <div class="ranking-title-content">
                        <div class="ranking-title">
                            <h3>RANKING</h3>
                        </div>
                    </div>
                    <div class="ranking-positions">
                        <!--Determinar como va el ranking-->
                    </div>
                </div>
            </div>

            <div id="modalPlay">
                <div class="shadow">
                    <div class="header">
                        <p class="nameRoom"></p>
                        <i class="fa fa-times closeWindow" onclick='$("#modalPlay").hide();'></i>
                        <p class="help"></p>
                    </div>
                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>

                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>

                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>

                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>

                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>


                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>

                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>

                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>

                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>

                    <div class="contentGral">
                        <span class="name"></span>
                        <canvas class="contentImgA" width="80" height="100" onclick="createCharacter();"></canvas>
                    </div>

                    <div class="createCharacter">
                        <a class="buttonRegister" href="{{ url('createCharacter') }}">Crear Personaje</a>
                    </div>
                </div>
            </div>

            @yield('content')
        </div>
        <footer></footer>
    </div>

    <script>
        @if (Session::get('err'))
            alert("{{ Session::get('err') }}");
        @endif

        @if (Session::get('info'))
            alert("{{ Session::get('info') }}");
        @endif

        @if (Session::get('login'))
            localStorage.setItem('name', "{{ Session::get('name') }}");
            localStorage.setItem('password', "{{ Session::get('password') }}");
        @endif

        function proximamente(){
            alert("Proximamente: Funcion aun en desarrollo");
        }
    </script>

    <script>
        $(document).ready(function() {
            loadCharacters();
        });

        function selectCharacter() {
            $("#modalPlay").show();
        }

        function loadCharacters(){
            var count = 0;

            $.post("{{ url('api/characters/getAll') }}", function(characters, textStatus, xhr) {
                initialize(characters);

                $.each(characters, function(index, character) {
                    $($(".contentGral .contentImgA")[count]).attr('onclick', 'play("' + character.nameCharacter + '")');

                    $($(".contentGral .name")[count]).html(character.nameCharacter);

                    count++;
                });
            }, 'json');
        }

        function play(nameCharacter){
            localStorage.setItem('character', nameCharacter);

            window.open('{{ url("play") }}', '_blank');

            $("#modalPlay").hide();
        }
    </script>

    <script>
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-28173560-6', 'auto');
    ga('send', 'pageview');
    </script>
</body>

</html>