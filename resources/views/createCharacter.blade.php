@extends('layouts.layout')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/createCharacter.css') }}">
@endsection

@section('content')
    <div class="contentLeft">
        <div class="shadow">
            <h4>Crear Personaje</h4>

            <div class="createCharacter">
                <div class="content_general">
                    <div class="content_left">
                        <label for="name" class="text">Nombre</label>
                        <input type="text" class="input_text" id="name">
                        <div class="canvasCharacter">
                            <i class="fa fa-angle-left" onclick="prevHead();"></i>
                            <canvas class="character" width="80" height="100"></canvas>
                            <i class="fa fa-angle-right" onclick="nextHead();"></i>
                        </div>
                    </div>
                    <div class="content_right">
                        <label for="name" class="text">Clase</label>

                        <div class="content_input_text">
                            <i class="fa fa-angle-left" onclick="prevClase();"></i>
                            <input type="text" class="input_text" id="clase" disabled value="Mago">
                            <i class="fa fa-angle-right" onclick="nextClase();"></i>
                        </div>

                        <label for="name" class="text">Raza</label>

                        <div class="content_input_text">
                            <i class="fa fa-angle-left" onclick="prevRaza();"></i>
                            <input type="text" class="input_text" id="raza" value="Humano" disabled>
                            <i class="fa fa-angle-right" onclick="nextRaza();"></i>
                        </div>

                        <label for="name" class="text">Género</label>

                        <div class="content_input_text">
                            <i class="fa fa-angle-left" onclick="prevGenero();"></i>
                            <input type="text" class="input_text" id="genero" value="Hombre" disabled>
                            <i class="fa fa-angle-right" onclick="nextGenero();"></i>
                        </div>

                        <label for="name" class="text">Ciudad</label>

                        <div class="content_input_text margin_left">
                            <input type="text" class="input_text" id="ciudad" value="Ullathorpe" disabled>
                        </div>
                    </div>
                </div>

                <button onclick="crearPersonaje();">Crear personaje</button>
            </div>
        </div>
    </div>

    <script>
        var character = {
            idBody: 1,
            idHead: 1,
            idWeapon: 48,
            idShield: 0,
            idHelmet: 0
        };

        var humanoHombreFirstHead = 1,
            humanoHombreLastHead = 40,
            elfoHombreFirstHead = 101,
            elfoHombreLastHead = 122,
            elfoDHombreFirstHead = 201,
            elfoDHombreLastHead = 221,
            enanoHombreFirstHead = 301,
            enanoHombreLastHead = 319,
            gnomoHombreFirstHead = 401,
            gnomoHombreLastHead = 416;

        $(document).ready(function() {
            canvas.characters[10] = {};
            canvas.characters[10].element = $(".character");
            canvas.characters[10].ctx = canvas.characters[10].element.get(0).getContext("2d");

            initialize2(function(success) {
                drawChar(character, 10, 24, 60);
            });
        });

        var idClaseSelected = 1,
            idRazaSelected = 1,
            idGeneroSelected = 1,
            idHeadSelected = 1;

        var clases = {
            'mago': 1,
            'clerigo': 2,
            'guerrero': 3,
            'asesino': 4,
            'bardo': 6,
            'druida': 7,
            'paladin': 8,
            'cazador': 9,
        };

        var nameClases = [];
        nameClases[clases.mago] = 'Mago';
        nameClases[clases.clerigo] = 'Clérigo';
        nameClases[clases.guerrero] = 'Guerrero';
        nameClases[clases.asesino] = 'Asesino';
        nameClases[clases.bardo] = 'Bardo';
        nameClases[clases.druida] = 'Druida';
        nameClases[clases.paladin] = 'Paladín';
        nameClases[clases.cazador] = 'Cazador';

        var generos = {
            'hombre': 1
            //'mujer': 2,
        };

        var nameGeneros = [];
        nameGeneros[generos.hombre] = 'Hombre';
        nameGeneros[generos.mujer] = 'Mujer';

        var razas = {
            'humano': 1,
            'elfo': 2,
            'elfoDrow': 3,
            'enano': 4,
            'gnomo': 5
        };

        var nameRazas = [];
        nameRazas[razas.humano] = 'Humano';
        nameRazas[razas.elfo] = 'Elfo';
        nameRazas[razas.elfoDrow] = 'Elfo Drow';
        nameRazas[razas.enano] = 'Enano';
        nameRazas[razas.gnomo] = 'Gnomo';

        function prevHead() {
            if (idRazaSelected == razas.humano) {
                if (idHeadSelected > humanoHombreFirstHead) {
                    idHeadSelected--;
                }
            } else if (idRazaSelected == razas.elfo) {
                if (idHeadSelected > elfoHombreFirstHead) {
                    idHeadSelected--;
                }
            } else if (idRazaSelected == razas.elfoDrow) {
                if (idHeadSelected > elfoDHombreFirstHead) {
                    idHeadSelected--;
                }
            } else if (idRazaSelected == razas.enano) {
                if (idHeadSelected > enanoHombreFirstHead) {
                    idHeadSelected--;
                }
            } else if (idRazaSelected == razas.gnomo) {
                if (idHeadSelected > gnomoHombreFirstHead) {
                    idHeadSelected--;
                }
            }

            character.idHead = idHeadSelected;
            drawChar(character, 10, 24, 60);
        }

        function nextHead() {
            if (idRazaSelected == razas.humano) {
                if (idHeadSelected < humanoHombreLastHead) {
                    idHeadSelected++;
                }
            } else if (idRazaSelected == razas.elfo) {
                if (idHeadSelected < elfoHombreLastHead) {
                    idHeadSelected++;
                }
            } else if (idRazaSelected == razas.elfoDrow) {
                if (idHeadSelected < elfoDHombreLastHead) {
                    idHeadSelected++;
                }
            } else if (idRazaSelected == razas.enano) {
                if (idHeadSelected < enanoHombreLastHead) {
                    idHeadSelected++;
                }
            } else if (idRazaSelected == razas.gnomo) {
                if (idHeadSelected < gnomoHombreLastHead) {
                    idHeadSelected++;
                }
            }

            character.idHead = idHeadSelected;
            drawChar(character, 10, 24, 60);
        }

        function prevClase() {
            if (idClaseSelected > 1) {
                idClaseSelected--;
                if (idClaseSelected == 5) {
                    idClaseSelected--;
                }
                $("#clase").val(nameClases[idClaseSelected]);

                if (idClaseSelected == clases.cazador) {
                    character.idWeapon = 40;
                } else {
                    character.idWeapon = 48;
                }

                drawChar(character, 10, 24, 60);
            }
        }

        function nextClase() {
            if (idClaseSelected < 9) {
                idClaseSelected++;
                if (idClaseSelected == 5) {
                    idClaseSelected++;
                }

                $("#clase").val(nameClases[idClaseSelected]);

                if (idClaseSelected == clases.cazador) {
                    character.idWeapon = 40;
                } else {
                    character.idWeapon = 48;
                }

                drawChar(character, 10, 24, 60);
            }
        }

        function prevRaza() {
            if (idRazaSelected > 1) {
                idRazaSelected--;
                $("#raza").val(nameRazas[idRazaSelected]);

                if (idRazaSelected == razas.humano) {
                    character.idBody = 1;
                } else if (idRazaSelected == razas.elfo) {
                    character.idBody = 2;
                } else if (idRazaSelected == razas.elfoDrow) {
                    character.idBody = 3;
                } else if (idRazaSelected == razas.enano) {
                    character.idBody = 300;
                } else if (idRazaSelected == razas.gnomo) {
                    character.idBody = 300;
                }

                if (idRazaSelected == razas.humano) {
                    idHeadSelected = humanoHombreFirstHead;
                } else if (idRazaSelected == razas.elfo) {
                    idHeadSelected = elfoHombreFirstHead;
                } else if (idRazaSelected == razas.elfoDrow) {
                    idHeadSelected = elfoDHombreFirstHead;
                } else if (idRazaSelected == razas.enano) {
                    idHeadSelected = enanoHombreFirstHead;
                } else if (idRazaSelected == razas.gnomo) {
                    idHeadSelected = gnomoHombreFirstHead;
                }

                character.idHead = idHeadSelected;

                drawChar(character, 10, 24, 60);
            }
        }

        function nextRaza() {
            if (idRazaSelected < 5) {
                idRazaSelected++;
                $("#raza").val(nameRazas[idRazaSelected]);

                if (idRazaSelected == razas.humano) {
                    character.idBody = 1;
                } else if (idRazaSelected == razas.elfo) {
                    character.idBody = 2;
                } else if (idRazaSelected == razas.elfoDrow) {
                    character.idBody = 3;
                } else if (idRazaSelected == razas.enano) {
                    character.idBody = 300;
                } else if (idRazaSelected == razas.gnomo) {
                    character.idBody = 300;
                }

                if (idRazaSelected == razas.humano) {
                    idHeadSelected = humanoHombreFirstHead;
                } else if (idRazaSelected == razas.elfo) {
                    idHeadSelected = elfoHombreFirstHead;
                } else if (idRazaSelected == razas.elfoDrow) {
                    idHeadSelected = elfoDHombreFirstHead;
                } else if (idRazaSelected == razas.enano) {
                    idHeadSelected = enanoHombreFirstHead;
                } else if (idRazaSelected == razas.gnomo) {
                    idHeadSelected = gnomoHombreFirstHead;
                }

                character.idHead = idHeadSelected;

                drawChar(character, 10, 24, 60);
            }
        }

        function prevGenero() {
            if (idGeneroSelected > 1) {
                idGeneroSelected--;
                $("#genero").val(nameGeneros[idGeneroSelected]);
            }
        }

        function nextGenero() {
            if (idGeneroSelected < 1) {
                idGeneroSelected++;
                $("#genero").val(nameGeneros[idGeneroSelected]);
            }
        }

        function crearPersonaje(){
            $.post("{{ url('createCharacter') }}", {name: $("#name").val(), idClase: idClaseSelected, idRaza: idRazaSelected, idGenero: idGeneroSelected, idHead: idHeadSelected}, function(data, textStatus, xhr) {

                if (data.err){
                    alert(data.msg);
                } else {
                    if (data.success){
                        localStorage.setItem('character', $("#name").val());

                        location.href = '{{ url("play") }}';
                    }
                }

            }, 'json');
        }
    </script>
@endsection