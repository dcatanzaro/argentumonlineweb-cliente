@extends('layouts.layout')

@section('css')
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{ asset('css/rooms.css?v=10') }}">
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

    <div id="modalPassword">
        <div class="shadow">
            <div class="header">
                <i class="fa fa-times closeWindow" onclick='$("#modalPassword").hide();'></i>
            </div>

            <div class="groupInput">
                <label for="">Contraseña </label>
                <input type="text" class="inputText" name="password" id="password">
            </div>

            <div class="createRoom" onclick="checkPassword();">Ingresar</div>
        </div>
    </div>


    <div class="contentLeft">
        <div class="shadow">
            <h4>Salas</h4>
            <div class="contentBox">
                <div class="createRoom" onclick="showCharactersCreateRoom();">CREAR SALA</div>
                <div class="tableHeader">
                    <div class="li nameRoom">Nombre</div>
                    <div class="li playersRoom">Jugadores</div>
                    <div class="li passRoom"><i class="fa fa-lock"></i></div>
                    <div class="li lvlMaxRoom">Nivel Máximo</div>
                    <div class="li inspectRoom"></div>
                </div>
                @foreach ($rooms as $room)
                @if ($room->password)
                <div class="row" onclick="password({{ $room->idRoom }})">
                @else
                <div class="row" onclick="openCharacters({{ $room->idRoom }})">
                @endif
                    <div class="li nameRoom" id="nameRoom_roomId{{ $room->idRoom }}">{{ $room->nameRoom }}</div>
                    <div class="li playersRoom" id="players_roomId{{ $room->idRoom }}">{{ $room->cantUsers }} / {{ ($room->maxUsers)?$room->maxUsers:'-' }}</div>
                    <div class="li passRoom">
                        @if ($room->password)
                            Si
                        @else
                            No
                        @endif
                    </div>
                    <div class="li lvlMaxRoom">{{ ($room->maxLevel)?$room->maxLevel:'-' }}</div>
                    @if ($room->idRoom != 1 && $room->idRoom != 2)
                    <div class="li inspectRoom"><a href="{{ url('room/' . $room->idRoom . '/' . urlencode($room->nameAccount)) }}"><i class="fa fa-search"></i></a></div>
                    @else
                    <div class="li inspectRoom"></div>
                    @endif
                </div>
                @endforeach
            </div>
        </div>
    </div>
    
    <script>
        var createRoom = false;
        var idTempRoom = 0;

        var isInspect = false;

        $(document).ready(function() {
            loadCharacters();

            $(".fa-search").click(function(event) {
                isInspect = true;
            });
        });

        function showCharactersCreateRoom(){
            createRoom = true;
            localStorage.setItem('passwordRoom', '');

            $(".header .nameRoom").html("Crear Sala").show();
            $(".header .help").html('*Elige un personaje para crear a la sala');

            $("#modalPlay").show();
        }

        function password(idRoom){
            if (isInspect){
                return;
            }
            
            idTempRoom = idRoom;

            $.post('{{ url("checkRoom") }}', {idRoom: idRoom}, function(data, textStatus, xhr) {

                if (parseInt(data.maxUsers) !== 0){
                    $("#players_roomId" + idRoom).html(parseInt(data.cantUsers) + " / " + parseInt(data.maxUsers));
                }

                if (parseInt(data.cantUsers) == parseInt(data.maxUsers) && parseInt(data.maxUsers) !== 0){
                    alert("La sala se encuentra llena.");
                } else {
                    $("#password").val("");
                    $("#modalPassword").show();
                }
            }, 'json');
        }

        function checkPassword(){
            var password = $("#password").val();

            $.post('{{ url("checkPassword") }}', {idRoom: idTempRoom, password: password}, function(data, textStatus, xhr) {
                if (data.error){
                    alert('La contraseña es incorrecta.');
                } else {
                    localStorage.setItem('passwordRoom', password);
                    localStorage.setItem('room', idTempRoom);

                    $("#modalPassword").hide();

                    $(".header .nameRoom").html($("#nameRoom_roomId" + idTempRoom).text()).show();
                    $(".header .help").html('*Elige un personaje para entrar a la sala');

                    $("#modalPlay").show();
                }
            }, 'json');
        }

        function openCharacters(idRoom){
            if (isInspect){
                return;
            }

            createRoom = false;

            localStorage.setItem('passwordRoom', '');

            $.post('{{ url("checkRoom") }}', {idRoom: idRoom}, function(data, textStatus, xhr) {

                if (parseInt(data.maxUsers) !== 0){
                    $("#players_roomId" + idRoom).html(parseInt(data.cantUsers) + " / " + parseInt(data.maxUsers));
                }

                if (parseInt(data.cantUsers) == parseInt(data.maxUsers) && parseInt(data.maxUsers) !== 0){
                    alert("La sala se encuentra llena.");
                } else {
                    localStorage.setItem('room', idRoom);

                    $(".header .nameRoom").html($("#nameRoom_roomId" + idRoom).text()).show();
                    $(".header .help").html('*Elige un personaje para entrar a la sala');
                    
                    $("#modalPlay").show();
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

            if (createRoom){
                $.post("{{ url('redirectToCreateRoom') }}", {nameCharacter: nameCharacter}, function(data, textStatus, xhr) {
                    if (data){
                        window.location = "{{ url('createRoom') }}";
                    }
                });
            } else {
                window.open('{{ url("play") }}', '_blank');
            }
            
            $("#modalPlay").hide();
        }

        function createCharacter(){
            location.href = '{{ url("createCharacter") }}';
        }
    </script>
@endsection