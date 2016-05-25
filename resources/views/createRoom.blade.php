@extends('layouts.layout')

@section('css')
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{ asset('css/createRoom.css') }}">
@endsection

@section('content')
    <div id="modalPlay">
        <div class="shadow">
            <div class="header">
                <p class="nameRoom"></p>
                <i class="fa fa-times closeWindow" onclick='$("#modalPlay").hide();'></i>
                <p class="help"></p>
            </div>
            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>

            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>

            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>

            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>

            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>


            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>

            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>

            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>

            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>

            <div class="contentGral">
                <span class="name"></span>
                <div class="contentImgA" onclick="createCharacter();">
                    <div class="bodyNakedImgA"></div>
                    <div class="bodyImgA"></div>
                    <div class="headImgA"></div>
                    <div class="helmetImg"></div>
                    <div class="weaponImgA"></div>
                </div>
            </div>

            <div class="createCharacter">
                <a class="buttonRegister" href="{{ url('createCharacter') }}">Crear Personaje</a>
            </div>
        </div>
    </div>

    <div class="contentLeft">
        <div class="shadow">
            <h4>Crear Sala</h4>
            <div class="contentBox" style="display: none;" id="infoRoom">
                <div class="groupInput infoLink">
                    <label for="">Link (URL): </label>
                    <input type="text" class="inputText" name="linkRoom" id="linkRoom" value="">
                </div>
                <p class="infoSala first-child"><strong>Nombre:</strong> <span id="nameRoom"></span></p>
                <p class="infoSala"><strong>Creador:</strong> <span id="creatorRoom"></span></p>
                <p class="infoSala"><strong>Privada:</strong> <span id="private"></span></p>
                <p class="infoSala"><strong>Nivel Máximo:</strong> <span id="limitLevel"></span></p>
                <p class="infoSala"><strong>Usuarios Online:</strong> <span id="usersOnline"></span></p>
                <p class="infoSala last-child"><strong>Limite de Usuarios:</strong> <span id="limitUsers"></span></p>
                <div class="enterRoom" onclick="enterRoom();">Entrar</div>
            </div>
            <div class="contentBox" id="createRoom">
                <div class="groupInput">
                    <label for="">Nombre </label>
                    <input type="text" class="inputText" name="nameCreateRoom" id="nameCreateRoom">
                </div>

                <div class="groupInput groupCheck">
                    <label for="" style="margin-top: 1px;">Privada </label>
                    <input type="checkbox" name="privateRoom" id="privateRoom">
                </div>

                <div class="groupInput groupCheck" style="margin-right: 45px;">
                    <label for="" style="margin-top: 1px;">Restricción de Nivel </label>
                    <input type="checkbox" name="privateLevel" id="privateLevel">
                </div>

                <div class="groupInput groupCheck">
                    <label for="" style="margin-top: 1px;">Bots </label>
                    <input type="checkbox" name="bots" id="bots">
                </div>

                <div class="groupInput groupPassword" id="divPassword" style="display: none;">
                    <label for="">Contraseña </label>
                    <input type="text" class="inputText" name="password" id="password">
                </div>

                <div class="groupInput maxUser">
                    <label for="">Cantidad máxima (usuarios): </label>
                    <select name="userMax" id="userMax">
                        <option value="0">Ilimitado</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>

                <div class="groupInput groupLevelMax" id="divLevelMax" style="display: none;">
                    <label for="">Nivel Máximo </label>
                    <select name="levelMax" id="levelMax">
                        @for ($i = Session::get('levelCharacter'); $i <= 50; $i++)
                        @if ($i == 10)
                        <option value="{{ $i }}" selected>{{ $i }}</option>
                        @else
                        <option value="{{ $i }}">{{ $i }}</option>
                        @endif
                        @endfor
                    </select>
                </div>

                <div class="groupInput groupLevelMax bots" style="display: none;">
                    <label for="">Bots: </label>
                    <select name="numBots" id="numBots">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="createRoom" onclick="createRoom();">Crear Sala</div>
            </div>
        </div>
    </div>
    
    <script>
        $(document).ready(function() {
            loadCharacters();

            $("#privateRoom").click(function(event) {
                $("#divPassword").toggle();
            });

            $("#privateLevel").click(function(event) {
                $("#divLevelMax").toggle();
            });

            $("#bots").click(function(event) {
                $(".bots").toggle();
            });

            $("#linkRoom").on("click", function () {
               $(this).select();
            });
        });

        function enterRoom(){
            $("#modalPlay").show();
        }

        function createRoom(){
            var nameRoom = $("#nameCreateRoom").val();
            var private = $("#privateRoom").is(':checked');
            var privateLevel = $("#privateLevel").is(':checked');
            var bots = $("#bots").is(':checked');
            var userMax = $("#userMax").val();
            var numBots = 0;
            var password = "";
            var levelMax = "";

            if (bots){
                numBots = $("#numBots").val();
            }

            if (private){
                password = $("#password").val();
            }

            if (privateLevel){
                levelMax = $("#levelMax").val();
            }

            if (!nameRoom){
                alert("El nombre de la sala es requerido.");
                return;
            }

            if (nameRoom.length > 30){
                alert("El nombre no puede tener mas de 30 caracteres.");
                return;
            }

            if (private && !password){
                alert("Si la sala es privada el campo contraseña no puede estar vacio.");
                return;
            }

            $.post("{{ url('postCreateRoom') }}", {nameRoom: nameRoom, password: password, levelMax: levelMax, userMax: userMax, numBots: numBots}, function(data, textStatus, xhr) {
                var room = data[0];
                if (room){
                    localStorage.setItem('room', room.idRoom);

                    if (password){
                        localStorage.setItem('passwordRoom', password);
                    }

                    window.open('{{ url("play") }}', '_blank');

                    var linkRoom = "{{ url('room') }}";
                    var linkConcat = linkRoom + "/" + room.idRoom + "/" + "{{ urlencode(Auth::user()->nameAccount) }}";
                    var linkPassword = (room.password)?'?password=' + room.password:'';

                    $("h4").html('Sala: ' + room.nameRoom);

                    $("#linkRoom").val(linkConcat + linkPassword);

                    $("#nameRoom").html(room.nameRoom);
                    $("#creatorRoom").html("{{ Auth::user()->nameAccount }}");
                    $("#private").html((room.password)?'Si':'No');
                    $("#limitLevel").html((room.maxLevel > 0)?room.maxLevel:'-');
                    $("#usersOnline").html(room.cantUsers);
                    $("#limitUsers").html((room.maxUsers > 0)?room.maxUsers:'-');

                    window.history.pushState('', 'Argentum Online Web', linkConcat + linkPassword);

                    $("#createRoom").hide();
                    $("#infoRoom").show();
                }
            }, 'json');
        }

        function loadCharacters(){
            var count = 0;

            $.post("{{ url('api/characters/getAll') }}", function(characters, textStatus, xhr) {
                $.each(characters, function(index, character) {
                    $($(".contentGral .contentImgA")[count]).attr('onclick', 'play("' + character.nameCharacter + '")');

                    $($(".contentGral .name")[count]).html(character.nameCharacter);

                    $($(".bodyNakedImgA")[count]).css('background', 'url("/assets/bodies/bodyNaked.png")').css('background-repeat', 'no-repeat');

                    $($(".headImgA")[count]).css('background', 'url("/assets/heads/' + character.idHead + '.png")').css('background-repeat', 'no-repeat');

                    if (character.animationBody){
                        $($(".bodyImgA")[count]).css('background', 'url("/assets/items/animation/' + character.animationBody + '.png")').css('background-repeat', 'no-repeat');
                    } else {
                        $($(".bodyImgA")[count]).css('background', 'none');
                    }

                    if (character.animationHelmet){
                        $($(".helmetImg")[count]).css('background', 'url("/assets/items/animation/' + character.animationHelmet + '.png")').css('background-repeat', 'no-repeat');
                    } else {
                        $($(".helmetImg")[count]).css('background', 'none');
                    }

                    if (character.animationWeapon){
                        $($(".weaponImgA")[count]).css('background', 'url("/assets/items/animation/' + character.animationWeapon + '.png")').css('background-repeat', 'no-repeat');
                        if (character.animationWeapon == 'ArcoNewbie'){
                            $($(".weaponImgA")[count]).css('margin-top', '35px');
                            $($(".weaponImgA")[count]).css('margin-left', '26px');
                        } else {
                            $($(".weaponImgA")[count]).css('margin-top', '28px');
                            $($(".weaponImgA")[count]).css('margin-left', '26px');
                        }
                    } else {
                        $($(".weaponImgA")[count]).css('background', 'none');
                    } 
                    count++;
                });
            }, 'json');
        }

        function play(nameCharacter){
            localStorage.setItem('character', nameCharacter);

            window.open('{{ url("play") }}', '_blank');
            
            $("#modalPlay").hide();
        }

        function createCharacter(){
            location.href = '{{ url("createCharacter") }}';
        }
    </script>
@endsection