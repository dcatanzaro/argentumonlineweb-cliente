@extends('layouts.layout')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/profile.css?v=13') }}">
@endsection

@section('content')
    <div class="contentLeft">
        <div class="shadow">
            <div class="headerPerfil">
                <div class="contentImg">
                    <img src="http://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e" alt="">
                </div>
                <h3 class="namePerfil">{{ $profile->nameAccount }}</h3>
            </div>
            <div class="tabs">
                <div class="tab tabActive" onclick="changeTabProfile(this, 1)">
                    <span>Información</span>
                    <div class="line"></div>
                </div>
                <div class="tab" onclick="changeTabProfile(this, 2)">
                    <span>Personajes</span>
                </div>
                <!--<div class="tab" onclick="changeTabProfile(this, 4)">
                    <span>Clan</span>
                </div>-->
            </div>
            <div class="contentBox">
                <div id="typeProfile">
                    <div class="infoPj">
                    </div>
                    
                    <div class="messages">
                        <div class="message">
                            <div class="avatar">
                                <img src="http://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e" alt="">
                            </div>
                            <div class="user">Comentarios</div>
                            <div class="time">hace 2 horas</div>
                            <div class="msg">En construcción</div>
                        </div>
                        <div class="line"></div>
                        <div class="message">
                            <div class="avatar">
                                <img src="http://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e" alt="">
                            </div>
                            <div class="user">Comentarios</div>
                            <div class="time">hace 2 horas</div>
                            <div class="msg">En construcción</div>
                        </div>
                    </div>

                    <!--<h4 class="logros">Logros</h4>

                    <div class="contentLogros">
                        <div class="logro">
                            <img src="http://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e" alt="" title="huehuehu">
                        </div>
                    </div>-->
                </div>

                <div id="typeCharacters">
                    <div class="characters">
                    </div>

                    <div class="preview">
                        <span id="nameCharacter">-<br>-</span>

                        <div class="contentImg">
                            <div class="bodyNakedImg"></div>
                            <div class="bodyImg"></div>
                            <div class="headImg"></div>
                            <div class="helmetImg"></div>
                            <div class="weaponImg"></div>
                            <div class="lines"></div>
                        </div>

                        <div class="bodyArmor">
                            <p id="nameArmor">-</p>
                            <p><strong id="bodyArmor">-</strong> p. de defensa</p>
                        </div>

                        <div class="weapon">
                            <p id="nameWeapon">-</p>
                            <p><strong id="weaponDmg">-</strong> p. de daño</p>
                        </div>

                        <div class="head">
                            <p id="nameHelmet">-</p>
                            <p><strong id="helmetArmor">-</strong> p. de defensa</p>
                        </div>
                    </div>
                    
                    <div class="contentSkills">
                        <span>Hechizos</span>
                    
                        <div class="skills">
                            <div class="skill"></div>
                            <div class="skill"></div>
                            <div class="skill"></div>
                            <div class="skill"></div>
                            <div class="skill"></div>
                            <div class="skill"></div>
                            <div class="skill"></div>
                            <div class="skill"></div>
                        </div>
                    </div>

                    <div class="est">
                        <span>Estadísticas</span>
                        <ul id="stats">
                        </ul>
                    </div>
                    
                    <div class="inventary">
                        <span>Inventario</span>

                        <div class="items">
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>

                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>

                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                            <div class="itemInventary">
                                <div class="imageItem"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ul class="statsFloat"></ul>

    <script>
        var clase = ['Mago', 'Paladín', 'Arquero'];
        var charactersTemp = "";
        var profileActual;

        var arInventary = {};

        var clases = ['Mago', 'Paladín', 'Arquero'];

        $(document).ready(function() {
            getProfile(1);

            $(".imageItem").mouseout(function(e) {
                $(".statsFloat").hide();
                $(".statsFloat").empty();
            });

            $(".imageItem").mouseover(function(e) {
                var idItemVault = $(this).data('iditem');

                console.log(idItemVault);

                if (idItemVault){
                    renderStats(idItemVault, e);  
                }
            });
        });

        function changeTabProfile(tab, profileType){
            $('.tabActive .line').remove();
            $('.tabActive').removeClass('tabActive');

            $(tab).addClass('tabActive');
            $(tab).append('<div class="line"></div>');

            getProfile(profileType);
        }

        function getProfile(profileType){
            if (profileActual == profileType){
                return;
            }

            profileActual = profileType;

            switch (profileType){
                case 1: //Perfil
                    $.post("{{ url('api/profile/get') }}", {profileType: profileType, nameAccount: '{{ $profile->nameAccount }}'}, function(data, textStatus, xhr) {
                        
                        $(".infoPj").empty();
                        $(".infoPj").append('<div class="info"><strong>Nombre:</strong> ' + data.nameAccount + '</div>');
                        $(".infoPj").append('<div class="info"><strong>Clan:</strong> -</div>');
                        $(".infoPj").append('<div class="info"><strong>Oro:</strong> ' + data.gold + '</div>');

                    }, 'json');

                    $("#typeCharacters").hide();
                    $("#typeProfile").show();
                break;

                case 2: //Personajes
                    $.post("{{ url('api/profile/get') }}", {profileType: profileType, nameAccount: '{{ $profile->nameAccount }}'}, function(characters, textStatus, xhr) {
                        charactersTemp = characters;

                        $(".characters").empty();
                        var isFirstCharacter = true;

                        $.each(characters, function(index, character) {
                            var html = "";

                            if (isFirstCharacter){
                                html += '<div class="character characterSelected" title="' + character.nameCharacter + '" onclick="drawCharacter(' + index + ')">';
                                isFirstCharacter = false;
                            } else {
                                html += '<div class="character" title="' + character.nameCharacter + '" onclick="drawCharacter(' + index + ')">';
                            }
                            
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

                            $(".characters").append(html);
                        });

                        drawCharacter(0);
                    }, 'json');

                    $("#typeProfile").hide();
                    $("#typeCharacters").show();
                break;
            }
        }

        function drawCharacter(idCharacterTemp){
            var character = charactersTemp[idCharacterTemp];

            $(".character").removeClass('characterSelected');
            $($(".character")[idCharacterTemp]).addClass('characterSelected');

            $("#nameCharacter").html('<small>' + clase[parseInt(character.idClase) - 1] + ', nivel ' + character.level + '</small><br>' + character.nameCharacter);

            $("#weaponDmg").html('+' + (parseInt(character.weaponDmg) || 0));
            $("#bodyArmor").html('+' + (parseInt(character.bodyArmor) || 0));
            $("#helmetArmor").html('+' + (parseInt(character.helmetArmor) || 0));

            $("#nameArmor").html(character.nameArmor || "-");
            $("#nameWeapon").html(character.nameWeapon || "-");
            $("#nameHelmet").html(character.nameHelmet || "-");

            $(".headImg").css('background', 'url("/assets/heads/' + character.idHead + '.png")').css('background-repeat', 'no-repeat');

            if (character.animationBody){
                $(".bodyImg").css('background', 'url("/assets/items/animation/' + character.animationBody + '.png")').css('background-repeat', 'no-repeat');
            } else {
                $(".bodyImg").css('background', 'none');
            }

            if (character.animationHelmet){
                $(".helmetImg").css('background', 'url("/assets/items/animation/' + character.animationHelmet + '.png")').css('background-repeat', 'no-repeat');
            } else {
                $(".helmetImg").css('background', 'none');
            }

            if (character.animationWeapon){
                $(".weaponImg").css('background', 'url("/assets/items/animation/' + character.animationWeapon + '.png")').css('background-repeat', 'no-repeat');
                if (character.animationWeapon == 'ArcoNewbie'){
                    $(".weaponImg").css('margin-top', '35px');
                    $(".weaponImg").css('margin-left', '26px');
                } else {
                    $(".weaponImg").css('margin-top', '28px');
                    $(".weaponImg").css('margin-left', '26px');
                }
            } else {
                $(".weaponImg").css('background', 'none');
            }

            $("#stats").empty();
            $("#stats").append('<li><span style="float: left">Daño</span><span style="float: right" class="detalle">' + (parseInt(character.dmg) + parseInt(character.hit)) + '</span></li>');
            $("#stats").append('<li><span style="float: left">Defensa</span><span style="float: right" class="detalle">' + character.armor + '</span></li>');
            $("#stats").append('<li><span style="float: left">Vida</span><span style="float: right" class="detalle">' + character.maxHp + '</span></li>');
            $("#stats").append('<li><span style="float: left">Mana</span><span style="float: right" class="detalle">' + character.maxMana + '</span></li>');
            $("#stats").append('<li><span style="float: left">Robo de Vida %</span><span style="float: right" class="detalle">' + character.lifeSteal + '</span></li>');
            $("#stats").append('<li><span style="float: left">Chance de Crítico</span><span style="float: right" class="detalle">' + character.criticalChance + '</span></li>');
            $("#stats").append('<li><span style="float: left">Daño Crítico</span><span style="float: right" class="detalle">' + character.criticalDmg + '</span></li>');
            $("#stats").append('<li><span style="float: left">Reducción de Enfriamiento</span><span style="float: right" class="detalle">' + character.cooldownReduction + '</span></li>');
            $("#stats").append('<li><span style="float: left">Resistencia Mágica</span><span style="float: right" class="detalle">' + character.magicResist + '</span></li>');
            $("#stats").append('<li><span style="float: left">Penetración Mágica</span><span style="float: right" class="detalle">' + character.magicPen + '</span></li>');
            $("#stats").append('<li><span style="float: left">Penetración de Armadura</span><span style="float: right" class="detalle">' + character.armorPen + '</span></li>');
            $("#stats").append('<li><span style="float: left">Regeneración de vida </span><span style="float: right" class="detalle">' + character.hpRegen + '</span></li>');
            $("#stats").append('<li><span style="float: left">Regeneración de Maná</span><span style="float: right" class="detalle">' + character.manaRegen + '</span></li>');

            $(".skills .skill").empty();

            if (parseInt(character.idClase) === 1){
                $($(".skills .skill")[0]).html("<img src=\'{{ asset('assets/imgs/Remover paralisis.png') }}\' alt=''>");
                $($(".skills .skill")[1]).html("<img src=\'{{ asset('assets/imgs/Apocalipsis.png') }}\' alt=''>");
                $($(".skills .skill")[2]).html("<img src=\'{{ asset('assets/imgs/Descarga eléctrica.png') }}\' alt=''>");
                $($(".skills .skill")[3]).html("<img src=\'{{ asset('assets/imgs/Torbellino.png') }}\' alt=''>");
            } else if (parseInt(character.idClase) === 2){
                $($(".skills .skill")[0]).html("<img src=\'{{ asset('assets/imgs/Inmovilizar.png') }}\' alt=''>");
                $($(".skills .skill")[1]).html("<img src=\'{{ asset('assets/imgs/Remover paralisis.png') }}\' alt=''>");
                $($(".skills .skill")[2]).html("<img src=\'{{ asset('assets/imgs/Descarga eléctrica.png') }}\' alt=''>");
            }

            $(".imageItem").css('background-image', 'none').data('iditem', 0);

            $.post('{{ url("api/inventary/get") }}', {idCharacter: character.idCharacter}, function(inventary, textStatus, xhr) {
                arInventary = {};

                $.each(inventary, function(index, item) {
                    arInventary[item.idGeneratedItem] = item;

                    $($(".imageItem")[item.idPos - 1]).css('background-image', 'url("/assets/items/image/' + item.nameImageItem + '.png")').data('iditem', item.idGeneratedItem);
                });
            }, 'json');
        }

        function renderStats(idItem, e){
            var item = arInventary[idItem];

            $('.statsFloat').css('left', e.clientX + 1).css('top', e.clientY + $(window).scrollTop() + 1);

            $(".statsFloat").show();
            $(".statsFloat").empty();

            if (item.nameItem){
                $(".statsFloat").append('<li><span style="float: left">Nombre</span><span style="float: right" class="detalle">' + item.nameItem + '</span></li>');
            }

            if (parseInt(item.idClase)){
                $(".statsFloat").append('<li><span style="float: left">Clase</span><span style="float: right" class="detalle">' + clases[parseInt(item.idClase) - 1] + '</span></li>');
            }

            if (parseInt(item.levelMin)){
                $(".statsFloat").append('<li><span style="float: left">Nivel Minimo</span><span style="float: right" class="detalle">' + item.levelMin + '</span></li>');
            }

            if (item.nameItem == "Poción de Vida"){
                $(".statsFloat").append('<li><span style="float: left">Restaura</span><span style="float: right" class="detalle">75</span></li>');
            }

            if (item.nameItem == "Poción de Maná"){
                $(".statsFloat").append('<li><span style="float: left">Restaura</span><span style="float: right" class="detalle">5%</span></li>');
            }

            if (parseInt(item.dmg)){
                $(".statsFloat").append('<li><span style="float: left">Daño</span><span style="float: right" class="detalle">' + item.dmg + '</span></li>');
            }

            if (parseInt(item.armor)){
                $(".statsFloat").append('<li><span style="float: left">Defensa</span><span style="float: right" class="detalle">' + item.armor + '</span></li>');
            }

            if (parseInt(item.vida)){
                $(".statsFloat").append('<li><span style="float: left">Vida</span><span style="float: right" class="detalle">' + item.vida + '</span></li>');
            }

            if (parseInt(item.mana)){
                $(".statsFloat").append('<li><span style="float: left">Mana</span><span style="float: right" class="detalle">' + item.mana + '</span></li>');
            }

            if (parseInt(item.lifeSteal)){
                $(".statsFloat").append('<li><span style="float: left">Robo de Vida %</span><span style="float: right" class="detalle">' + item.lifeSteal + '</span></li>');
            }

            if (parseInt(item.critChance)){
                $(".statsFloat").append('<li><span style="float: left">Chance de Crítico % </span><span style="float: right" class="detalle">' + item.critChance + '</span></li>');
            }

            if (parseInt(item.critDmg)){
                $(".statsFloat").append('<li><span style="float: left">Daño Crítico %</span><span style="float: right" class="detalle">' + item.critDmg + '</span></li>');
            }

            if (parseInt(item.cdr)){
                $(".statsFloat").append('<li><span style="float: left">Reducción de Enfriamiento %</span><span style="float: right" class="detalle">' + item.cdr + '</span></li>');
            }

            if (parseInt(item.rm)){
                $(".statsFloat").append('<li><span style="float: left">Resistencia Mágica</span><span style="float: right" class="detalle">' + item.rm + '</span></li>');
            }

            if (parseInt(item.magicPen)){
                $(".statsFloat").append('<li><span style="float: left">Penetración Mágica</span><span style="float: right" class="detalle">' + item.magicPen + '</span></li>');
            }

            if (parseInt(item.armorPen)){
                $(".statsFloat").append('<li><span style="float: left">Penetración de Armadura</span><span style="float: right" class="detalle">' + item.armorPen + '</span></li>');
            }

            if (parseInt(item.hpRegen)){
                $(".statsFloat").append('<li><span style="float: left">Regeneración de vida </span><span style="float: right" class="detalle">' + item.hpRegen + '</span></li>');
            }

            if (parseInt(item.manaRegen)){
                $(".statsFloat").append('<li><span style="float: left">Regeneración de Maná</span><span style="float: right" class="detalle">' + item.manaRegen + '</span></li>');
            }

            if (parseInt(item.socket)){
                $(".statsFloat").append('<li><span style="float: left">Engarce</span><span style="float: right" class="detalle">' + item.socket + '</span></li>');
            }
        }
    </script>
@endsection