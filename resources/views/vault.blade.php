@extends('layouts.layout')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/vault.css?v=13') }}">
@endsection

@section('content')
    <div class="contentLeft">
        <div class="shadow">
            <h4>Bóveda</h4>
            <span class="help">* Arrastra los items para pasarlo desde la bóveda hacia el inventario o viceversa.</span>

            <div class="characters">
                <?php $countCharacter = 0; ?>
                <div class="contentCharacters">
                @foreach ($characters as $character)
                    <div class="character" title="{{ $character->nameCharacter }}" onclick="changeCharacter({{ $countCharacter }}, {{ $character->idCharacter }})">
                        <div class="bodyNakedImgCharacter"></div>

                        @if ($character->animationBody)
                            <div class="bodyImgCharacter" style="background: url('/assets/items/animation/{{ $character->animationBody }}.png'); background-repeat: no-repeat;"></div>
                        @else
                            <div class="bodyImgCharacter"></div>
                        @endif
                        
                        <div class="headImgCharacter" style="background: url('/assets/heads/{{ $character->idHead }}.png'); background-repeat: no-repeat;"></div>

                        @if ($character->animationHelmet)
                            <div class="helmetImgCharacter" style="background: url('/assets/items/animation/{{ $character->animationHelmet }}.png'); background-repeat: no-repeat;"></div>
                        @else
                            <div class="helmetImgCharacter"></div>
                        @endif
                    </div>
                    <?php $countCharacter++; ?>
                @endforeach
                </div>
                <div class="inventary">
                    <span>Inventario</span>

                    <i class="fa fa-times close" onclick="closeInventary()"></i>

                    <div class="items">
                        <div class="itemInventary" id="itemInventary_1">
                            <div class="imageItemInventary" data-idpositem='1' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_2">
                            <div class="imageItemInventary" data-idpositem='2' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_3">
                            <div class="imageItemInventary" data-idpositem='3' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_4">
                            <div class="imageItemInventary" data-idpositem='4' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_5">
                            <div class="imageItemInventary" data-idpositem='5' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_6">
                            <div class="imageItemInventary" data-idpositem='6' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_7">
                            <div class="imageItemInventary" data-idpositem='7' data-iditem=''></div>
                        </div>

                        <div class="itemInventary" id="itemInventary_8">
                            <div class="imageItemInventary" data-idpositem='8' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_9">
                            <div class="imageItemInventary" data-idpositem='9' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_10">
                            <div class="imageItemInventary" data-idpositem='10' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_11">
                            <div class="imageItemInventary" data-idpositem='11' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_12">
                            <div class="imageItemInventary" data-idpositem='12' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_13">
                            <div class="imageItemInventary" data-idpositem='13' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_14">
                            <div class="imageItemInventary" data-idpositem='14' data-iditem=''></div>
                        </div>

                        <div class="itemInventary" id="itemInventary_15">
                            <div class="imageItemInventary" data-idpositem='15' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_16">
                            <div class="imageItemInventary" data-idpositem='16' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_17">
                            <div class="imageItemInventary" data-idpositem='17' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_18">
                            <div class="imageItemInventary" data-idpositem='18' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_19">
                            <div class="imageItemInventary" data-idpositem='19' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_20">
                            <div class="imageItemInventary" data-idpositem='20' data-iditem=''></div>
                        </div>
                        <div class="itemInventary" id="itemInventary_21">
                            <div class="imageItemInventary" data-idpositem='21' data-iditem=''></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="shop">
                <div class="tabs">
                    <div class="tab tabActive">
                        <span>Bóveda 1</span>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="contentBox">
                    <div class="vault">
                        <?php $idPosItemVault = 0; ?>
                        @for ($columna = 1; $columna <= 10; $columna++)
                            @for ($fila = 1; $fila <= 10; $fila++)
                                <?php $idPosItemVault++; ?>
                                <div class="itemVault" id="itemVault_{{ $idPosItemVault }}">
                                    <div class="imageItem" data-idpositem='{{ $idPosItemVault }}' data-iditem=''></div>
                                </div>
                            @endfor
                        @endfor
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ul class="statsFloat"></ul>

    <script>
        var itemSelected = 0;
        var itemSelectedInventary = 0;
        var idCharacterSelected;

        var arVault = {};
        var arInventary = {};

        var clases = ['Mago', 'Paladín', 'Arquero'];

        $(document).ready(function() {
            changeCharacter(0, {{ $characters[0]->idCharacter }});

            getItemsVault();

            $(".imageItem").mouseout(function(e) {
                $(".statsFloat").hide();
                $(".statsFloat").empty();
            });

            $(".imageItemInventary").mouseout(function(e) {
                $(".statsFloat").hide();
                $(".statsFloat").empty();
            });

            $(".imageItem").mouseover(function(e) {
                var idItemVault = $(this).data('iditem');

                if (idItemVault){
                    renderStats('vault', idItemVault, e);  
                }
            });

            $(".imageItemInventary").mouseover(function(e) {
                var idItemInventary = $(this).data('iditem');

                if (idItemInventary){
                    renderStats('inventary', idItemInventary, e);  
                }
            });

            $(".imageItem").mousedown(function(event) {
                itemSelected = $(this).data('idpositem');
            });

            $(".imageItemInventary").mousedown(function(event) {
                itemSelectedInventary = $(this).data('idpositem');
            });

            $(document).mousemove(function(e) {
                if (itemSelected){
                    $('#itemVault_' + itemSelected + ' .imageItem').css('position', 'absolute').offset({
                        left: e.clientX + 1,
                        top: e.clientY + $(window).scrollTop() + 1
                    });
                }

                if (itemSelectedInventary){
                    $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').css('position', 'absolute').offset({
                        left: e.clientX + 1,
                        top: e.clientY + $(window).scrollTop() + 1
                    });
                }
            });

            $(document).mouseup(function(event) {
                $(".statsFloat").hide();
                $(".statsFloat").empty();

                var target = event.toElement || event.relatedTarget || event.target;
                var posFinal = $(target);
                var backgroundImage;
                var idItemTmp;
                var titleItemTmp;

                if (itemSelected){
                    if (posFinal.hasClass('imageItem') || posFinal.hasClass('itemVault')){

                        if (posFinal.hasClass('itemVault')){
                            posFinal = posFinal.children('.imageItem');
                        }



                        if (posFinal.css('background-image') && posFinal.css('background-image') != 'none'){
                            $('#itemVault_' + itemSelected + ' .imageItem').css({
                                'top': 0,
                                'left': 0,
                                'position': 'relative'
                            });
                        } else {
                            backgroundImage = $('#itemVault_' + itemSelected + ' .imageItem').css('background-image');

                            if (posFinal){
                                idItemTmp = $('#itemVault_' + itemSelected + ' .imageItem').data('iditem');

                                $('#itemVault_' + itemSelected + ' .imageItem').css({
                                    'top': 0,
                                    'left': 0,
                                    'background-image': '',
                                    'position': 'relative'
                                }).data('iditem', '');

                                posFinal.css('background-image', backgroundImage).data('iditem', idItemTmp);

                                $.post('{{ url("api/item/vault/moveItem") }}', { idItem: idItemTmp, oldPosItem: itemSelected, newPosItem: posFinal.data('idpositem')});
                            }
                        }

                    } else if (posFinal.hasClass('imageItemInventary') || posFinal.hasClass('itemInventary')){

                        if (posFinal.hasClass('itemInventary')){
                            posFinal = posFinal.children('.imageItemInventary');
                        }

                        if (posFinal.css('background-image') && posFinal.css('background-image') != 'none'){
                            $('#itemVault_' + itemSelected + ' .imageItem').css({
                                'top': 0,
                                'left': 0,
                                'position': 'relative'
                            });
                        } else {
                            backgroundImage = $('#itemVault_' + itemSelected + ' .imageItem').css('background-image');

                            if (posFinal){
                                idItemTmp = $('#itemVault_' + itemSelected + ' .imageItem').data('iditem');

                                arInventary[idItemTmp] = arVault[idItemTmp];

                                $('#itemVault_' + itemSelected + ' .imageItem').css({
                                    'top': 0,
                                    'left': 0,
                                    'background-image': '',
                                    'position': 'relative'
                                }).data('iditem', '');

                                posFinal.css('background-image', backgroundImage).data('iditem', idItemTmp);
                            }

                            $.post('{{ url("api/item/vault/toInventary") }}', {idItemVault: idItemTmp, idPosInventary: $(posFinal.parent('.itemInventary')).index() + 1, idCharacter: idCharacterSelected});
                        }
                    } else {
                        $('#itemVault_' + itemSelected + ' .imageItem').css({
                            'top': 0,
                            'left': 0,
                            'position': 'relative'
                        });
                    }
                } else if (itemSelectedInventary) {
                    if (posFinal.hasClass('imageItem') || posFinal.hasClass('itemVault')){

                        if (posFinal.hasClass('itemVault')){
                            posFinal = posFinal.children('.imageItem');
                        }

                        if (posFinal.css('background-image') && posFinal.css('background-image') != 'none'){
                            $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').css({
                                'top': 0,
                                'left': 0,
                                'position': 'relative'
                            });
                        } else {
                            backgroundImage = $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').css('background-image');

                            if (posFinal){
                                idItemTmp = $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').data('iditem');

                                arVault[idItemTmp] = arInventary[idItemTmp];

                                $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').css({
                                    'top': 0,
                                    'left': 0,
                                    'background-image': '',
                                    'position': 'relative'
                                }).data('iditem', '');

                                posFinal.css('background-image', backgroundImage).data('iditem', idItemTmp);
                            }

                            $.post('{{ url("api/item/vault/toVault") }}', {idItemInventary: idItemTmp, idPosVault: posFinal.data('idpositem'), idCharacter: idCharacterSelected});
                        }
                    } else if (posFinal.hasClass('imageItemInventary') || posFinal.hasClass('itemInventary')){

                        if (posFinal.hasClass('itemInventary')){
                            posFinal = posFinal.children('.imageItemInventary');
                        }

                        if (posFinal.css('background-image') && posFinal.css('background-image') != 'none'){
                            $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').css({
                                'top': 0,
                                'left': 0,
                                'position': 'relative'
                            });
                        } else {
                            backgroundImage = $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').css('background-image');

                            if (posFinal){
                                idItemTmp = $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').data('iditem');

                                $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').css({
                                    'top': 0,
                                    'left': 0,
                                    'background-image': '',
                                    'position': 'relative'
                                }).data('iditem', '');

                                posFinal.css('background-image', backgroundImage).data('iditem', idItemTmp);
                            }

                            $.post('{{ url("api/item/inventary/moveItem") }}', { idItem: idItemTmp, oldPosItem: itemSelectedInventary, newPosItem: posFinal.data('idpositem'), idCharacter: idCharacterSelected});
                        }
                    } else {
                        $('#itemInventary_' + itemSelectedInventary + ' .imageItemInventary').css({
                            'top': 0,
                            'left': 0,
                            'position': 'relative'
                        });
                    }
                }

                itemSelectedInventary = 0;
                itemSelected = 0;
            });
        });

        function getItemsVault(){
            $.post('api/items/vault/get', function(items, textStatus, xhr) {
                $.each(items, function(index, item) {
                    arVault[item.idGeneratedItem] = item;

                    $("#itemVault_" + item.idPos + " .imageItem").data('iditem', item.idGeneratedItem).css('background-image', 'url("assets/items/image/' + item.nameImageItem + '.' + item.extensionImageItem + '")');
                });
            }, 'json');
        }

        function changeCharacter(countCharacter, idCharacter){
            idCharacterSelected = idCharacter;

            $(".character").removeClass('characterSelected');
            $($(".character")[countCharacter]).addClass('characterSelected');

            $(".itemInventary .imageItemInventary").css('background-image', 'none');

            $.post('{{ url("api/inventary/get") }}', {idCharacter: idCharacter}, function(inventary, textStatus, xhr) {
                $.each(inventary, function(index, item) {
                    arInventary[item.idGeneratedItem] = item;

                    $($(".itemInventary .imageItemInventary")[item.idPos - 1]).css('background-image', 'url("/assets/items/image/' + item.nameImageItem + '.png")').data('iditem', item.idGeneratedItem);
                });
            }, 'json');

            $(".inventary").show();
        }

        function closeInventary(){
            $(".character").removeClass('characterSelected');

            $(".inventary").hide();
        }

        function renderStats(type, idItem, e){
            var item;

            if (type == "vault"){
                item = arVault[idItem];
            }

            if (type == "inventary"){
                item = arInventary[idItem];
            }

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