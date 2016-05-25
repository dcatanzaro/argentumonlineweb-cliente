@extends('layouts.layout')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/ranking.css?v=11') }}">
@endsection

@section('content')
    <div class="contentLeft">
        <div class="shadow">
            <h4>Ranking</h4>
            <!--<span class="help">* El ranking se actualiza automaticamente cada 30 minutos.</span>-->
            <div class="tabs">
                <div class="tab tabActive" onclick="getRanking(this, 'general')">
                    <span>General</span>
                    <div class="line"></div>
                </div>
                <!--<div class="tab" onclick="changeTabProfile(this, 4)">
                    <span>Clan</span>
                </div>-->
            </div>

            <div class="contentBox">
            </div>
        </div>
    </div>

    <script>
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

        $(document).ready(function() {
            getRanking('', 'general');
        });

        var initsRanking = new initsRanking();

        function initsRanking() {
            this.preCacheGraphics = {};
            this.graphics = {};
            this.heads = {};
            this.bodies = {};

            this.loadHeads = function(callback) {
                var count = 0;
                var headId = 0;

                $.get('init/heads.ini', function(data) {
                    var responseArr = data.split('\n');

                    $.each(responseArr, function(index, response) {
                        if (count == 0) {
                            var responseSplit = response.split('HeadId=');
                            headId = parseInt(responseSplit[1]);

                            initsRanking.heads[headId] = {};
                        } else if (count == 1) {
                            var responseSplit = response.split('Head1=');
                            headGrh = responseSplit[1];

                            initsRanking.heads[headId][1] = parseInt(headGrh);
                        } else if (count == 2) {
                            var responseSplit = response.split('Head2=');
                            headGrh = responseSplit[1];

                            initsRanking.heads[headId][3] = parseInt(headGrh);
                        } else if (count == 3) {
                            var responseSplit = response.split('Head3=');
                            headGrh = responseSplit[1];

                            initsRanking.heads[headId][2] = parseInt(headGrh);
                        } else if (count == 4) {
                            var responseSplit = response.split('Head4=');
                            headGrh = responseSplit[1];

                            initsRanking.heads[headId][4] = parseInt(headGrh);
                        }

                        count++;

                        if (count == 6) {
                            count = 0;
                        }
                    });

                    callback(true);
                });
            };

            this.loadBodies = function(callback) {
                var count = 0;
                var bodyId = 0;

                $.get('init/bodies.ini', function(data) {
                    var responseArr = data.split('\n');

                    $.each(responseArr, function(index, response) {
                        var bodyGrh = 0;

                        if (count == 0) {
                            var responseSplit = response.split('BodyId=');
                            bodyId = parseInt(responseSplit[1]);

                            initsRanking.bodies[bodyId] = {};
                        } else if (count == 1) {
                            var responseSplit = response.split('Walk1=');
                            bodyGrh = responseSplit[1];

                            initsRanking.bodies[bodyId][1] = parseInt(bodyGrh);
                        } else if (count == 2) {
                            var responseSplit = response.split('Walk2=');
                            bodyGrh = responseSplit[1];

                            initsRanking.bodies[bodyId][3] = parseInt(bodyGrh);
                        } else if (count == 3) {
                            var responseSplit = response.split('Walk3=');
                            bodyGrh = responseSplit[1];

                            initsRanking.bodies[bodyId][2] = parseInt(bodyGrh);
                        } else if (count == 4) {
                            var responseSplit = response.split('Walk4=');
                            bodyGrh = responseSplit[1];

                            initsRanking.bodies[bodyId][4] = parseInt(bodyGrh);
                        } else if (count == 5) {
                            var responseSplit = response.split('HeadOffsetX=');
                            var offSet = responseSplit[1];

                            initsRanking.bodies[bodyId]["headOffsetX"] = parseInt(offSet);
                        } else if (count == 6) {
                            var responseSplit = response.split('HeadOffsetY=');
                            var offSet = responseSplit[1];

                            initsRanking.bodies[bodyId]["headOffsetY"] = parseInt(offSet);
                        }

                        count++;

                        if (count == 8) {
                            count = 0;
                        }
                    });

                    callback(true);
                });
            };

            this.loadGraphics = function(callback) {
                $.get('init/graficos.ini', function(data) {
                    var responseArr = data.split('\n');

                    $.each(responseArr, function(index, response) {
                        var responseSplit = response.split('-');

                        var grhData = responseSplit[0].split('=');

                        var grh = grhData[0].split('Grh');

                        if (grhData[1] == 1) {
                            initsRanking.graphics[grh[1]] = {
                                numFrames: parseInt(grhData[1]),
                                numFile: responseSplit[1],
                                sX: parseInt(responseSplit[2]),
                                sY: parseInt(responseSplit[3]),
                                width: parseInt(responseSplit[4]),
                                height: parseInt(responseSplit[5]),
                                frames: {
                                    1: grh[1]
                                },
                                offset: {
                                    x: 0,
                                    y: 0
                                }
                            };
                        } else {
                            var lineSpeed = parseInt(grhData[1]) + 1;

                            initsRanking.graphics[grh[1]] = {
                                numFrames: grhData[1],
                                frames: {},
                                speed: responseSplit[lineSpeed],
                                frameCounter: 0
                            };

                            for (i = 1; i <= grhData[1]; i++) {
                                initsRanking.graphics[grh[1]].frames[i] = responseSplit[i];
                            }
                        }
                    });

                    callback(true);
                });
            };
        }

        function initializeRanking(characters) {
            initsRanking.loadHeads(function(success) {
                initsRanking.loadBodies(function(success) {
                    initsRanking.loadGraphics(function(success) {
                        $.each(characters, function(index, character) {

                            var idHead = character.idHead;

                            if (parseInt(character.navegando)) {
                                idHead = character.idLastHead;
                            }

                            var idBody = character.idBody;

                            if (parseInt(character.navegando)) {
                                idBody = character.idLastBody;
                            }

                            var grhCabeza = initsRanking.heads[idHead][2];
                            var graphicGrhHead = initsRanking.graphics[grhCabeza];

                            var grhRopa = initsRanking.bodies[idBody][2];
                            var CurrentGrhRopa = initsRanking.graphics[grhRopa].frames[1];
                            var graphicsGrhRopa = initsRanking.graphics[CurrentGrhRopa];

                            $($(".headImgCharacter")[index]).css('background-image', 'url(../graficos/' + graphicGrhHead.numFile + '.png)');
                            $($(".bodyImgCharacter")[index]).css('background-image', 'url(../graficos/' + graphicsGrhRopa.numFile + '.png)');

                            if (character.idRaza == 4 || character.idRaza == 5) {
                                $($(".bodyImgCharacter")[index]).css('background-position-y', '-9px');
                            }
                        });
                    });
                });
            });
        }

        function getRanking(tab, typeRanking){
            if (tab){
                $('.tabActive .line').remove();
                $('.tabActive').removeClass('tabActive');

                $(tab).addClass('tabActive');
                $(tab).append('<div class="line"></div>');
            }

            var count = 1;
            $(".contentBox").empty();

                $.get('{{ url("api/ranking/get") }}', function(characters, textStatus, xhr) {

                    $(".contentBox").empty();

                    var first = true;
                    var html = "";

                    html += '<div class="tableHeader"><div class="rank rankGeneral">Ranking</div><div class="name nameGeneral">Nombre</div><div class="levelGeneral">Nivel</div><div class="claseGeneral">Clase</div><div class="kills killsGeneral">Asesinatos</div></div>';

                    $.each(characters, function(index, character) {
                        html += '<div class="row" style="">';

                        html += '<div class="rank rankGeneral" style="height: 60px; padding: 0;">';
                        html += '<span>' + count + '.</span></div>';

                        html += '<div class="name nameGeneral" style="height: 60px; padding: 0;">';
                        html += '<a target="_blank" href="">';

                        html += '<div class="character">';

                        html += '<div class="bodyImgCharacter"></div>';

                        html += '<div class="headImgCharacter"></div>';

                        html += '<div class="helmetImgCharacter" style=""></div>';

                        html += '</div>';

                        if (parseInt(character.criminal)) {
                            html += '<span style="color: red">' + character.nameCharacter + '</span></a></div>';
                        } else {
                            html += '<span style="color: #3333ff">' + character.nameCharacter + '</span></a></div>';
                        }

                        html += '<div class="levelGeneral" style="height: 60px; padding: 0;"><span>' + character.level + '</span></div>';

                        html += '<div class="claseGeneral" style="height: 60px; padding: 0;"><span>' + nameClases[character.idClase] + '</span></div>';
                        html += '<div class="kills killsGeneral" style="height: 60px; padding: 0;">';

                        html += '<span>' + character.kills + '</span></div>';
                        html += '</div>';

                        /*if (first){

                            if (typeRanking == 'general'){
                                html += '<div class="tableHeader"><div class="rank rankGeneral">Ranking</div><div class="name nameGeneral">Nombre</div><div class="claseGeneral">Clase</div><div class="kills killsGeneral">Asesinatos</div></div>';
                            } else {
                                html += '<div class="tableHeader"><div class="rank">Ranking</div><div class="name">Nombre</div><div class="kills">Asesinatos</div></div>';
                            }

                            first = false;
                        } else {
                            html = "";
                        }

                        if (!i){
                            html += '<div class="row" style="">';
                            i = 1;
                        } else {
                            html += '<div class="row rowColor">';
                            i = 0;
                        }

                        if (typeRanking == 'general'){
                            html += '<div class="rank rankGeneral" style="height: 60px; padding: 0;">';
                        } else {
                            html += '<div class="rank" style="height: 60px; padding: 0;">';
                        }

                        html += '<span>' + character.pos + '.</span></div>';

                        if (typeRanking == 'general'){
                            html += '<div class="name nameGeneral" style="height: 60px; padding: 0;">';
                        } else {
                            html += '<div class="name" style="height: 60px; padding: 0;">';
                        }

                        html += '<a target="_blank" href="{{ url("profile") }}/' + character.nameAccount.replace(' ', '+') + '">';

                        html += '<div class="character">';
                        html += '<div class="bodyNakedImgCharacter"></div>';

                        if (character.animationBody){
                            html += '<div class="bodyImgCharacter" style="background: url(\'/assets/items/animation/' + character.animationBody + '.png\'); background-repeat: no-repeat;"></div>';
                        } else {
                            html += '<div class="bodyImgCharacter"></div>';
                        }

                        html += '<div class="headImgCharacter" style="background: url(\'/assets/heads/' + character.idHead + '.png\'); background-repeat: no-repeat;"></div>';

                        if (character.animationHelmet){
                            html += '<div class="helmetImgCharacter" style="background: url(\'/assets/items/animation/' + character.animationHelmet + '.png\'); background-repeat: no-repeat;"></div>';
                        } else {
                            html += '<div class="helmetImgCharacter"></div>';
                        }

                        html += '</div>';

                        html += '<span>' + character.nameCharacter + '</span></a></div>';

                        if (typeRanking == 'general'){
                            html += '<div class="claseGeneral" style="height: 60px; padding: 0;"><span>' + clases[character.idClase - 1] + '</span></div>';
                            html += '<div class="kills killsGeneral" style="height: 60px; padding: 0;">';
                        } else {
                            html += '<div class="kills" style="height: 60px; padding: 0;">';
                        }

                        html += '<span>' + character.countKills + '</span></div>';
                        html += '</div>';*/

                        count++;
                    });

                    initializeRanking(characters);

                    $(".contentBox").append(html);
                }, 'json');
            //}
        }
    </script>
@endsection