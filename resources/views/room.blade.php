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
            <h4>Sala: {{{ $room->nameRoom }}}</h4>
            <div class="contentBox" id="infoRoom">
                @if (!$modalPassword)
                <div class="groupInput infoLink">
                    <label for="">Link (URL): </label>
                    <input type="text" class="inputText" name="linkRoom" id="linkRoom" value="{{ url('room/' . $room->idRoom . '/' . urlencode($nameCreator)) }}{{ ($room->password)?'?password=' . $room->password:'' }}">
                </div>
                <p class="infoSala first-child"><strong>Nombre:</strong> <span id="nameRoom">{{{ $room->nameRoom }}}</span></p>
                <p class="infoSala"><strong>Creador:</strong> <span id="creatorRoom">{{ $nameCreator }}</span></p>
                <p class="infoSala"><strong>Privada:</strong> <span id="private">{{ ($room->password)?'Si':'No' }}</span></p>
                <p class="infoSala"><strong>Nivel Máximo:</strong> <span id="limitLevel">{{ ($room->maxLevel)?$room->maxLevel:'-' }}</span></p>
                <p class="infoSala"><strong>Usuarios Online:</strong> <span id="usersOnline">{{ $room->cantUsers }}</span></p>
                <p class="infoSala last-child"><strong>Limite de Usuarios:</strong> <span id="limitUsers">{{ ($room->maxUsers)?$room->maxUsers:'-' }}</span></p>
                <div class="enterRoom" onclick="enterRoom();">Entrar</div>
                @else
                <div class="groupInput infoLink">
                    <label for="">Contraseña: </label>
                    <input type="text" class="inputText" name="password" id="password" style="width: 445px;">
                </div>
                <div class="enterRoom" onclick="checkPassword();" style="margin-left: 240px;">Entrar</div>
                @endif
            </div>
            
        </div>
    </div>
    
    <script>
        @if (!$modalPassword)
        $(document).ready(function() {
            loadCharacters();

            $("#linkRoom").on("click", function () {
               $(this).select();
            });
        });

        function enterRoom(){
            $("#modalPlay").show();
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
            localStorage.setItem('room', '{{ $room->idRoom }}');

            @if ($room->password)
                localStorage.setItem('passwordRoom', '{{ $room->password }}');
            @endif

            window.open('{{ url("play") }}', '_blank');
            
            $("#modalPlay").hide();
        }

        function createCharacter(){
            location.href = '{{ url("createCharacter") }}';
        }
        @else
            function checkPassword(){
                var idTempRoom = "{{ $room->idRoom }}";
                var password = $("#password").val();

                $.post('{{ url("checkPassword") }}', {idRoom: idTempRoom, password: password}, function(data, textStatus, xhr) {
                    if (data.error){
                        alert('La contraseña es incorrecta.');
                    } else {
                        window.location.href = window.location.href + "?password=" + password;
                    }
                }, 'json');
            }
        @endif
    </script>
@endsection