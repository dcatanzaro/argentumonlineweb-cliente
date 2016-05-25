<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Argentum Online Web</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

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

    <link rel="stylesheet" href="{{ asset('css/style.css?v=125') }}">
    <link rel="stylesheet" href="{{ asset('assets/font-awesome/css/font-awesome.min.css') }}">
    <script data-main="js/app" src="{{ asset('js/lib/require.js') }}"></script>
</head>
<body>
    <div class="progressBar">
        <div class="logo_tmp"></div>
        <div class="text">
            <span id="porcentajeBarra">0 / 290 Mapas</span>
        </div>
        <div class="contentBar">
            <div class="carga"></div>
            <div class="barra"></div>
        </div>
        <div class="contBox">
            <div class="help">
                <p>Mover: Flechas</p>
                <p>Atacar: Ctrl</p>
                <p>Agarrar: A</p>
                <p>Usar: U</p>
                <p>Tirar: T</p>
                <p>Seguro: S</p>
                <p>Meditar: M</p>
                <p>Hablar: Enter</p>
            </div>
            <div class="news">
                <div class="news_content">
                    <div class="title">Actualización 06/02/2015</div>
                    <p>- Las vidas ahora suben fijas por nivel, no hay mas probabilidades.</p>
                    <p>- Se modificaron las vidas de todas las clases y razas.</p>
                    <p>- Se limitó el máximo de Agilidad y Fuerza segun atributos.</p>
                    <p>- Se arregló el daño de los bastones y báculos, ya no son mas porcentuales.</p>
                    <p>- Se arregló un error del cazador que podia tirar flechas sin tener el arco equipado.</p>
                    <p>- Ya no es necesario sacarse el seguro para atacar a otro en la arena.</p>

                    <div class="title">Actualización 14/01/2015</div>
                    <p>- Se agregó la defensa mágica en cascos y sombreros.</p>
                    <p>- Si un usuario muere navegando no se le caen los items.</p>
                    <p>- Si un usuario muere navegando se cambia el cuerpo de la barca a un galeón fantasmal.</p>
                    <p>- Se arreglo problema de equipamiento de items.</p>
                    <p>- Los items no usables aparecen en rojo.</p>
                    <p>- Se arregló la posición de los sombreros.</p>

                    <div class="title">Actualización 13/01/2015</div>
                    <p>- Mapa del juego.</p>

                    <div class="title">Actualización 12/01/2015</div>
                    <p>- Agregada la función apuñalar a los usuarios.</p>
                    <p>- Agregado el bonus de daño mágico con varas y bastones. (Solo Magos)</p>
                    <p>- Arreglo problema de bloqueo con escudos.</p>
                    <p>- Se cambió la tecla de ataque a Ctrl.</p>
                    <p>- Si el ancho de la pantalla es mayor o igual a 760px la consola se acomoda en la parte inferior de la pantalla.</p>
                    <p>- Se agregó la configuración de teclas.</p>
                    <p>- Se solucionaron problemas en los macros.</p>

                    <div class="title">Actualización 05/01/2015</div>
                    <p>- PvP.</p>
                    <p>- Se agregó un seguro para atacar a ciudadanos.</p>
                    <p>- Se agregaron los hechizos para curarse.</p>
                    <p>- Se agregó Celeridad y Fuerza.</p>
                    <p>- Se agregaron los hechizos de Paralizar, Inmovilizar y Remover Paralisis.</p>

                    <div class="title">Actualización 04/01/2015</div>
                    <p>- Se agregaron las pociones de Agilidad y Fuerza.</p>

                    <div class="title">Actualización 31/12/2015</div>
                    <p>- Se agregó apuñalar en las dagas.</p>
                    <p>- Se pusieron Armas, Tunicas, Armaduras, Escudos y Cascos en los vendedores de Ullathorpe.</p>
                    <p>- En el comercio ahora se puede ver el Daño o la Defensa de los items.</p>
                    <p>- Se arregló el agua que era caminable.</p>
                    <p>- Se agregó la restricción de items para Enanos y Gnomos.</p>
                    <p>- Se arregló el problema de que se podian agarrar items cuando tenias el inventario lleno.</p>
                    <p>- Se pueden vender los items newbies.</p>
                    <p>- Se arregló el valor de los items al venderlos.</p>
                    <p>- Los NPC's ahora al pegarte cambian su dirección hacia el usuario.</p>
                    <p>- Se agregaron puntos a los decimales de la maná, el oro y la experiencia.</p>

                    <div class="title">Actualización 29/12/2015</div>
                    <p>- Se agregó la barca.</p>
                    <p>- Ya no se puede paralizar a los dragones.</p>
                    <p>- Al escribir y apretar la tecla "M" no hace mas la acción de meditar.</p>
                    <p>- Corrección de errores en el sistema de combate contra NPC's.</p>
                    <p>- Se agregó el bloqueo con escudos.</p>
                    <p>- Corrección de la defensa de las armaduras y escudos contra NPC's</p>
                    <p>- Mientras meditas no puedes realizar ninguna acción.</p>
                    <p>- Se cambio el color de las letras grises por blancas en la consola.</p>
                    <p>- Corrección del ataque con armas y arcos.</p>

                    <div class="title">Actualización 28/12/2015</div>
                    <p>- Se puede meditar con la letra "M" y clickeando sobre la barra de maná.</p>
                    <p>- Los precios se redujeron todos a la mitad!.</p>
                    <p>- Se agregó un efecto a los textos para que tengan un efecto de "subida" desde la cabeza.</p>
                    <p>- Se arreglaron los textos para todos los NPC's y usuarios.</p>
                    <p>- Se agregó paralizar e inmovilizar para los NPC's.</p>
                    <p>- Los muertos ya no pueden agarrar items.</p>
                    <p>- Los NPC's se mueven con un intervalo de 650ms.</p>

                    <div class="title">Actualización 27/12/2015</div>
                    <p>- Se arregló el mapa 288 de la isla Micro AO.</p>
                    <p>- Se redujo la velocidad de movimiento de los NPC's.</p>
                    <p>- Se arregló la desconexión, algunos personajes quedaban conectados.</p>
                    <p>- Solo se puede ingresar con 1 personaje por cuenta a la vez.</p>
                    <p>- Se arregló el valor de los hechizos.</p>
                    <p>- Cuando se abre un nuevo comercio con un NPC's la cantidad siempre está en 1.</p>
                </div>
            </div>
        </div>
    </div>
        
    <div class="reporte" onclick="window.open('http://nogl.io/forums/29-General','new_window')"></div>
    
    <div class="modalMapa">
        <div class="close_map"></div>
        <div class="content_map">
            <img class="img_map" src="assets/imgs/mapa.png" width="459" height="644" alt="mapa">
            
            <div class="mark"></div>

            <div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_137"></div><div class="tile_map" id="map_136"></div><div class="tile_map" id="map_135"></div><div class="tile_map" id="map_134"></div><div class="tile_map" id="map_133"></div><div class="tile_map" id="map_132"></div><div class="tile_map" id="map_131"></div><div class="tile_map" id="map_130"></div><div class="tile_map" id="map_129"></div><div class="tile_map" id="map_128"></div><div class="tile_map" id="map_119"></div><div class="tile_map" id="map_110"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_61"></div><div class="tile_map"></div><div class="tile_map" id="map_47"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_127"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_60"></div><div class="tile_map"></div><div class="tile_map" id="map_243"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_126"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_154"></div><div class="tile_map" id="map_66"></div><div class="tile_map" id="map_59"></div><div class="tile_map" id="map_159"></div><div class="tile_map" id="map_160"></div><div class="tile_map" id="map_161"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_125"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_242"></div><div class="tile_map" id="map_155"></div><div class="tile_map" id="map_65"></div><div class="tile_map" id="map_58"></div><div class="tile_map" id="map_158"></div><div class="tile_map" id="map_157"></div><div class="tile_map" id="map_195"></div><div class="tile_map" id="map_196"></div><div class="tile_map" id="map_197"></div><div class="tile_map" id="map_149"></div><div class="tile_map" id="map_148"></div><div class="tile_map" id="map_147"></div><div class="tile_map" id="map_124"></div><div class="tile_map" id="map_138"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_209"></div><div class="tile_map" id="map_240"></div><div class="tile_map" id="map_67"></div><div class="tile_map" id="map_57"></div><div class="tile_map" id="map_193"></div><div class="tile_map" id="map_194"></div><div class="tile_map" id="map_244"></div><div class="tile_map" id="map_246"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_123"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_239"></div><div class="tile_map" id="map_237"></div><div class="tile_map" id="map_68"></div><div class="tile_map" id="map_56"></div><div class="tile_map" id="map_191"></div><div class="tile_map" id="map_192"></div><div class="tile_map" id="map_245"></div><div class="tile_map" id="map_247"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_122"></div><div class="tile_map" id="map_139"></div><div class="tile_map"></div><div class="tile_map" id="map_238"></div><div class="tile_map" id="map_236"></div><div class="tile_map" id="map_69"></div><div class="tile_map" id="map_55"></div><div class="tile_map" id="map_188"></div><div class="tile_map" id="map_189"></div><div class="tile_map" id="map_190"></div><div class="tile_map" id="map_248"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_261"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_121"></div><div class="tile_map"></div><div class="tile_map" id="map_201"></div><div class="tile_map" id="map_235"></div><div class="tile_map" id="map_76"></div><div class="tile_map" id="map_70"></div><div class="tile_map" id="map_54"></div><div class="tile_map" id="map_185"></div><div class="tile_map" id="map_186"></div><div class="tile_map" id="map_187"></div><div class="tile_map" id="map_249"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_260"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_120"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_234"></div><div class="tile_map" id="map_230"></div><div class="tile_map" id="map_71"></div><div class="tile_map" id="map_53"></div><div class="tile_map" id="map_86"></div><div class="tile_map" id="map_180"></div><div class="tile_map" id="map_253"></div><div class="tile_map" id="map_250"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_259"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_109"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_233"></div><div class="tile_map" id="map_229"></div><div class="tile_map" id="map_72"></div><div class="tile_map" id="map_7"></div><div class="tile_map" id="map_85"></div><div class="tile_map" id="map_256"></div><div class="tile_map" id="map_254"></div><div class="tile_map" id="map_251"></div><div class="tile_map" id="map_206"></div><div class="tile_map" id="map_207"></div><div class="tile_map" id="map_258"></div><div class="tile_map" id="map_262"></div><div class="tile_map" id="map_263"></div><div class="tile_map" id="map_108"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_232"></div><div class="tile_map" id="map_228"></div><div class="tile_map" id="map_73"></div><div class="tile_map" id="map_6"></div><div class="tile_map" id="map_83"></div><div class="tile_map" id="map_84"></div><div class="tile_map" id="map_255"></div><div class="tile_map" id="map_252"></div><div class="tile_map" id="map_205"></div><div class="tile_map" id="map_204"></div><div class="tile_map" id="map_257"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_107"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_231"></div><div class="tile_map" id="map_75"></div><div class="tile_map" id="map_74"></div><div class="tile_map" id="map_5"></div><div class="tile_map" id="map_77"></div><div class="tile_map" id="map_81"></div><div class="tile_map" id="map_82"></div><div class="tile_map" id="map_202"></div><div class="tile_map" id="map_21"></div><div class="tile_map" id="map_203"></div><div class="tile_map" id="map_171"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_106"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_10"></div><div class="tile_map" id="map_9"></div><div class="tile_map" id="map_8"></div><div class="tile_map" id="map_1"></div><div class="tile_map" id="map_11"></div><div class="tile_map" id="map_12"></div><div class="tile_map" id="map_13"></div><div class="tile_map" id="map_15"></div><div class="tile_map" id="map_16"></div><div class="tile_map" id="map_17"></div><div class="tile_map" id="map_103"></div><div class="tile_map" id="map_117"></div><div class="tile_map" id="map_104"></div><div class="tile_map" id="map_62"></div><div class="tile_map" id="map_64"></div><div class="tile_map"></div><div class="tile_map" id="map_227"></div><div class="tile_map" id="map_38"></div><div class="tile_map" id="map_39"></div><div class="tile_map" id="map_2"></div><div class="tile_map" id="map_14"></div><div class="tile_map" id="map_18"></div><div class="tile_map" id="map_19"></div><div class="tile_map" id="map_98"></div><div class="tile_map" id="map_20"></div><div class="tile_map" id="map_101"></div><div class="tile_map" id="map_102"></div><div class="tile_map" id="map_118"></div><div class="tile_map" id="map_105"></div><div class="tile_map" id="map_63"></div><div class="tile_map"></div><div class="tile_map" id="map_282"></div><div class="tile_map" id="map_226"></div><div class="tile_map" id="map_46"></div><div class="tile_map" id="map_36"></div><div class="tile_map" id="map_3"></div><div class="tile_map" id="map_25"></div><div class="tile_map" id="map_26"></div><div class="tile_map" id="map_27"></div><div class="tile_map" id="map_97"></div><div class="tile_map" id="map_99"></div><div class="tile_map" id="map_100"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_152"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_225"></div><div class="tile_map" id="map_80"></div><div class="tile_map" id="map_35"></div><div class="tile_map" id="map_4"></div><div class="tile_map" id="map_22"></div><div class="tile_map" id="map_23"></div><div class="tile_map" id="map_24"></div><div class="tile_map" id="map_96"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_153"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_211"></div><div class="tile_map" id="map_78"></div><div class="tile_map" id="map_34"></div><div class="tile_map" id="map_32"></div><div class="tile_map" id="map_29"></div><div class="tile_map" id="map_28"></div><div class="tile_map" id="map_94"></div><div class="tile_map" id="map_95"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_154"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_212"></div><div class="tile_map" id="map_79"></div><div class="tile_map" id="map_87"></div><div class="tile_map" id="map_31"></div><div class="tile_map" id="map_30"></div><div class="tile_map" id="map_91"></div><div class="tile_map" id="map_93"></div><div class="tile_map" id="map_92"></div><div class="tile_map" id="map_224"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_242"></div><div class="tile_map" id="map_155"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_213"></div><div class="tile_map" id="map_210"></div><div class="tile_map" id="map_88"></div><div class="tile_map" id="map_89"></div><div class="tile_map" id="map_90"></div><div class="tile_map" id="map_156"></div><div class="tile_map" id="map_151"></div><div class="tile_map" id="map_150"></div><div class="tile_map" id="map_223"></div><div class="tile_map" id="map_181"></div><div class="tile_map" id="map_182"></div><div class="tile_map" id="map_183"></div><div class="tile_map" id="map_209"></div><div class="tile_map" id="map_240"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_214"></div><div class="tile_map" id="map_215"></div><div class="tile_map" id="map_216"></div><div class="tile_map" id="map_217"></div><div class="tile_map" id="map_218"></div><div class="tile_map" id="map_219"></div><div class="tile_map" id="map_220"></div><div class="tile_map" id="map_221"></div><div class="tile_map" id="map_222"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_241"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_111"></div><div class="tile_map" id="map_112"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map"></div><div class="tile_map" id="map_114"></div><div class="tile_map" id="map_113"></div>
        </div>
    </div>

    <ul class="modalInfo">
    </ul>

    <div class="modalControlPanel">
        <div class="closeControlPanel"></div>
        <div class="sound">
            <!--<div class="soundButton"></div>-->
        </div>
        <div class="teclas">
            <input type="text" class="tecla margin_left_tecla">
            <input type="text" class="tecla">
            <input type="text" class="tecla">
            <input type="text" class="tecla">

            <input type="text" class="tecla margin_left_tecla">
            <input type="text" class="tecla">
            <input type="text" class="tecla">
            <input type="text" class="tecla">

            <input type="text" class="tecla margin_left_tecla">
            <input type="text" class="tecla">
            <input type="text" class="tecla">
            <input type="text" class="tecla">

            <div class="default_teclas"></div>
            <div class="save_cambios"></div>
            <div class="reset_macros"></div>
        </div>
    </div>

    <div class="modalReconnect">
    </div>

    <div class="modalMacro">
        <div class="cruz closeMacro"></div>
        <input type="text" id="keyMacro">
        <div class="img">
            <div class="spell"></div>
            <div class="item"></div>
        </div>
        <div class="guardarMacro"></div>
    </div>

    <div class="modalTrade">
        <div class="headTrade">
            <div class="imgItemTrade">
                <div class="imgItem"></div>
            </div>
            <div class="titleAndGold">
                <div class="titleItemTrade"></div>
                <div class="infoItem"></div>
                <div class="goldItemTrade"></div>
            </div>
            <div class="closeTrade"></div>
        </div>
        <div class="itemsTrade">
            <div class="trade">
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>

                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>

                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>

                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>

                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
                <div class="slotTrade">
                    <div class="imgItem"></div>
                </div>
            </div>
            <div class="inventary">
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>

                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>

                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>

                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>

                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
                <div class="slotInventary">
                    <div class="imgItem"></div>
                    <div class="cant"></div>
                    <div class="equipped">E</div>
                </div>
            </div>
        </div>
        <div class="footerTrade">
            <div class="buttonBuy"></div>
            <div class="buttonLess"></div>
            <input type="text" class="cantTrade" value="1">
            <div class="buttonMore"></div>
            <div class="buttonSell"></div>
        </div>
    </div>
    
    <div class="outer">
        <div class="middle">
            <div class="content">
                <div class="content_left">
                    <div class="render">
                        <input type="text" name="text" id="text">
                        <canvas width="544" height="544" id="background"></canvas>
                        <canvas width="544" height="544" id="foreground"></canvas>
                        <canvas width="544" height="544" id="items"></canvas>
                        <canvas width="544" height="544" id="characters"></canvas>
                        <canvas width="544" height="544" id="techos"></canvas>
                        <canvas width="544" height="544" id="textos"></canvas>
                        <canvas width="544" height="544" id="mouseEvent"></canvas>
                        <div id="console"></div>
                        <div class="openConsole" title="Abrir o cerrar consola">
                            <i class="fa fa-commenting"></i>
                        </div>
                    </div>
                    <div class="macros">
                        <div class="macro">
                            <div class="spell"></div>
                            <div class="item"></div>
                            <div class="key"></div>
                        </div>

                        <div class="macro">
                            <div class="spell"></div>
                            <div class="item"></div>
                            <div class="key"></div>
                        </div>

                        <div class="macro">
                            <div class="spell"></div>
                            <div class="item"></div>
                            <div class="key"></div>
                        </div>

                        <div class="macro">
                            <div class="spell"></div>
                            <div class="item"></div>
                            <div class="key"></div>
                        </div>

                        <div class="macro">
                            <div class="spell"></div>
                            <div class="item"></div>
                            <div class="key"></div>
                        </div>

                        <div class="macro">
                            <div class="spell"></div>
                            <div class="item"></div>
                            <div class="key"></div>
                        </div>
                    </div>
                </div>
                <div class="content_right">
                    <div class="header">
                        <div class="level"></div>
                        <div class="configuration"></div>
                        <div class="name"></div>
                        <div class="exp">
                            <div class="progress_bar"></div>
                            <div class="porcentaje"></div>
                            <div class="num"></div>
                        </div>
                        <div class="buttons">
                            <div class="button_inv" onclick="mostrarInventario()"></div>
                            <div class="button_spell" onclick="mostrarSpells()"></div>
                        </div>
                    </div>
                    <div class="body">
                        <div class="inventary">
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv last_slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>

                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv last_slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>

                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                            <div class="slot_inv last_slot_inv">
                                <div class="img_item"></div>
                                <div class="amount"></div>
                                <div class="equipped">E</div>
                            </div>
                        </div>
                        <div class="spell">
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell last_slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell last_slot_spell">
                                <div class="img_spell"></div>
                            </div>

                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell last_slot_spell">
                                <div class="img_spell"></div>
                            </div>

                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell last_slot_spell">
                                <div class="img_spell"></div>
                            </div>

                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell last_slot_spell">
                                <div class="img_spell"></div>
                            </div>

                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell last_slot_spell">
                                <div class="img_spell"></div>
                            </div>

                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell">
                                <div class="img_spell"></div>
                            </div>
                            <div class="slot_spell last_slot_spell">
                                <div class="img_spell"></div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="info_map">
                            <div class="name_map"></div>
                            <div class="pos_map"></div>
                        </div>
                        <div class="left_footer">
                            <div class="hp">
                                <div class="progress_bar"></div>
                                <div class="num"></div>
                            </div>
                            <div class="mana">
                                <div class="progress_bar"></div>
                                <div class="num"></div>
                            </div>
                            <div class="gold"></div>
                            <div class="attr">
                                <div class="agilidad"></div>
                                <div class="fuerza"></div>
                            </div>
                        </div>
                        <div class="right_footer">
                            <div class="minimap">
                                <div class="point_minimap"></div>
                            </div>

                            <div class="buttons_map">
                                <div class="open_map"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>