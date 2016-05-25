@extends('layouts.layout')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/shop.css?v=12') }}">
@endsection

@section('content')
    <div class="contentLeft">
        <div class="shadow">
            <h4>Tienda</h4>
            <div class="shop">
                <div class="tabs">
                    <div class="tab tabActive" onclick="changeTabShop(this, 2)">
                        <span>Armaduras</span>
                        <div class="line"></div>
                    </div>
                    <div class="tab" onclick="changeTabShop(this, 1)">
                        <span>Armas</span>
                        <div class="line"></div>
                    </div>
                    <div class="tab">
                        <span style="color: #1A242F;">Cascos</span>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="contentBox">
                </div>
            </div>

        </div>
    </div>

    <div id="modalPreviewBuy">
        <div class="shadow">
            <i class="fa fa-times close" onclick="closeModal('modalPreviewBuy')"></i>

            <div class="header">
                <div class="item">
                    <span class="nameItem"></span>
                    <div class="contentImg">
                        <img class="imageItem" src="" alt="" width="32" height="32">
                    </div>
                </div>
            </div>
            
            <div class="preview">
                <span>Vista Previa</span>
                <div class="contentImg">
                    <img src="assets/imgs/web/bodyWithHead.png" alt="">
                </div>
            </div>

            <div class="est">
                <span>Stats Posibles</span>
                <ul id="stats">
                </ul>
            </div>

            <input type="hidden" value="" id="idItem" name="idItem">

            <div class="contentBuy">
                <div class="buyWithX" style="margin-left: 24.5px">
                    <p>
                        <span class="spanLeft">Gemas actuales</span>
                        <span class="spanRight" id="actualGems"></span>
                    </p>
                    <p>
                        <span class="spanLeft">Costo</span>
                        <span class="spanRight" id="valorGema"></span>
                    </p>
                    <hr class="resta">
                    <p style="margin-bottom: 15px;">
                        <span class="spanLeft">Saldo</span>
                        <span class="spanRight" id="totalGems"></span>
                    </p>
                    <div class="buttonBuy" style="margin-left: 34.5px;" onclick="buyWithGems()">Comprar <img src="assets/imgs/ruby.png" alt=""></div>
                </div>

                <div class="buyWithX" style="margin-left: 5px">
                    <p>
                        <span class="spanLeft">Oro actual</span>
                        <span class="spanRight" id="actualGold"></span>
                    </p>
                    <p>
                        <span class="spanLeft">Costo</span>
                        <span class="spanRight" id="valorOro"></span>
                    </p>
                    <hr class="resta">
                    <p style="margin-bottom: 15px;">
                        <span class="spanLeft">Saldo</span>
                        <span class="spanRight" id="totalGold"></span>
                    </p>
                    <div class="buttonBuy" style="margin-left: 33px" onclick="buyWithGold()">Comprar <img class="coinButtonBuy" src="assets/imgs/web/coin.png" alt=""></div>
                </div>
            </div>
            
            <div class="buying">
                <i class="fa fa-spinner fa-pulse"></i>
            </div>
        </div>
    </div>

    <div id="modalPreviewBuySuccess" style="height: 340px;">
        <div class="shadow">
            <i class="fa fa-times close" onclick="closeModal('modalPreviewBuySuccess')"></i>
            
            <h4>¡Item Comprado!</h4>

            <div class="itemBuy">
                <span class="nameItem"></span>
                <div class="contentImg">
                    <img class="imageItem" src="" alt="" width="32" height="32">
                </div>
            </div>

            <div class="est">
                <span>Stats</span>
                <ul id="statsFinal">
                </ul>
            </div>

            <a href="{{ url('vault') }}" class="button" style="margin-left: 164px; margin-top: 50px; text-decoration: none;">Ir a la Bóveda</a>
        </div>
    </div>

    <script>
        var objTypeArmas = 2;
        var clases = ['Mago', 'Paladín', 'Arquero'];
        var idClaseSelected = 0;
        var levelMinSelected = 0;

        $(document).ready(function() {
            getItems(objTypeArmas);
        });

        function closeModal(modal){
            $("#" + modal).hide();
        }

        function getItems(objType){
            $('.contentBox').empty();

            $.post('api/items/get', {objType: objType}, function(items, textStatus, xhr) {
                $('.contentBox').empty();
                
                $.each(items, function(index, item) {
                    var html = '<div class="item"><span class="name">' + item.nameItem + '</span><div class="image"><img width="32" height="32" onclick="openModalBuy(\'' + item.idItem + '\')" src="assets/items/image/' + item.nameImageItem + '.' + item.extensionImageItem + '" alt="" class="coin"></div><div class="price"><div class="cont"><img src="assets/imgs/web/coin.png" alt="" class="ruby"><span>' + item.valorOro + '</span></div><div class="cont" style="float: right;"><img src="assets/imgs/ruby.png" alt=""><span>' + item.valorGema + '</span></div></div><button class="buy" onclick="openModalBuy(\'' + item.idItem + '\')">Ver item</button></div>';

                    $('.contentBox').append(html);
                });
            }, 'json');
        }

        function changeTabShop(tab, objType){
            $('.tabActive .line').remove();
            $('.tabActive').removeClass('tabActive');

            $(tab).addClass('tabActive');
            $(tab).append('<div class="line"></div>');

            getItems(objType);
        }

        function buyWithGold(){
            var idItem = $("#idItem").val();

            $("#modalPreviewBuy .shadow *").hide();
            $(".buying").show();

            $("#statsFinal").empty();

            $.post('api/buy/withGold', {idItem: idItem}, function(data, textStatus, xhr) {
                $("#statsFinal").empty();
                if (data.err){
                    $("#modalPreviewBuy .shadow *").show();
                    $(".buying").hide();
                    alert(data.err);
                } else {
                    $("#modalPreviewBuy").hide();

                    $("#statsFinal").append('<li><span style="float: left">Clase</span><span style="float: right" class="detalle">' + clases[parseInt(idClaseSelected) - 1] + '</span></li>');
                    $("#statsFinal").append('<li><span style="float: left">Nivel Minimo</span><span style="float: right" class="detalle">' + levelMinSelected + '</span></li>');

                    if (data.item.dmg != 0){
                        $("#statsFinal").append('<li><span style="float: left">Daño</span><span style="float: right" class="detalle">' + data.item.dmg + '</span></li>')
                    }

                    if (data.item.armor != 0){
                        $("#statsFinal").append('<li><span style="float: left">Defensa</span><span style="float: right" class="detalle">' + data.item.armor + '</span></li>')
                    }

                    if (data.item.vida != 0){
                        $("#statsFinal").append('<li><span style="float: left">Vida</span><span style="float: right" class="detalle">' + data.item.vida + '</span></li>')
                    }

                    if (data.item.mana != 0){
                        $("#statsFinal").append('<li><span style="float: left">Mana</span><span style="float: right" class="detalle">' + data.item.mana + '</span></li>')
                    }

                    if (data.item.lifeSteal != 0){
                        $("#statsFinal").append('<li><span style="float: left">Robo de Vida %</span><span style="float: right" class="detalle">' + data.item.lifeSteal + '</span></li>')
                    }

                    if (data.item.critChance != 0){
                        $("#statsFinal").append('<li><span style="float: left">Chance de Crítico % </span><span style="float: right" class="detalle">' + data.item.critChance + '</span></li>')
                    }

                    if (data.item.critDmg != 0){
                        $("#statsFinal").append('<li><span style="float: left">Daño Crítico %</span><span style="float: right" class="detalle">' + data.item.critDmg + '</span></li>')
                    }

                    if (data.item.cdr != 0){
                        $("#statsFinal").append('<li><span style="float: left">Reducción de Enfriamiento %</span><span style="float: right" class="detalle">' + data.item.cdr + '</span></li>')
                    }

                    if (data.item.rm != 0){
                        $("#statsFinal").append('<li><span style="float: left">Resistencia Mágica</span><span style="float: right" class="detalle">' + data.item.rm + '</span></li>')
                    }

                    if (data.item.magicPen != 0){
                        $("#statsFinal").append('<li><span style="float: left">Penetración Mágica</span><span style="float: right" class="detalle">' + data.item.magicPen + '</span></li>')
                    }

                    if (data.item.armorPen != 0){
                        $("#statsFinal").append('<li><span style="float: left">Penetración de Armadura</span><span style="float: right" class="detalle">' + data.item.armorPen + '</span></li>')
                    }

                    if (data.item.hpRegen != 0){
                        $("#statsFinal").append('<li><span style="float: left">Regeneración de vida </span><span style="float: right" class="detalle">' + data.item.hpRegen + '</span></li>')
                    }

                    if (data.item.manaRegen != 0){
                        $("#statsFinal").append('<li><span style="float: left">Regeneración de Maná</span><span style="float: right" class="detalle">' + data.item.manaRegen + '</span></li>')
                    }

                    if (data.item.socket != 0){
                        $("#statsFinal").append('<li><span style="float: left">Engarce</span><span style="float: right" class="detalle">' + data.item.socket + '</span></li>')
                    }

                    $("#modalPreviewBuySuccess").show();
                }
            }, 'json');
        }

        function openModalBuy(idItem) {
            $("#modalPreviewBuySuccess").hide();
            $("#modalPreviewBuy .shadow *").show();
            $(".buying").hide();
            $("#modalPreviewBuy").show();

            $("#stats").empty();

            $.post('api/item/get', {idItem: idItem}, function(item, textStatus, xhr) {
                $("#stats").empty();
                var actualGems = <?= Auth::user()->gems ?>;
                var actualGold = <?= Auth::user()->gold ?>;

                $(".nameItem").html(item.nameItem);
                $("#idItem").val(idItem);

                $(".imageItem").attr('src', 'assets/items/image/' + item.nameImageItem + '.' + item.extensionImageItem);

                $("#actualGems").html(actualGems);
                $("#actualGold").html(actualGold);

                $("#valorGema").html("- " + item.valorGema);
                $("#valorOro").html("- " + item.valorOro);

                $("#totalGems").html(actualGems - item.valorGema);
                $("#totalGold").html(actualGold - item.valorOro);

                idClaseSelected = item.idClase;
                levelMinSelected = item.levelMin;

                $("#stats").append('<li><span style="float: left">Clase</span><span style="float: right" class="detalle">' + clases[parseInt(item.idClase) - 1] + '</span></li>');
                $("#stats").append('<li><span style="float: left">Nivel Minimo</span><span style="float: right" class="detalle">' + item.levelMin + '</span></li>');

                if (item.dmgMax != 0){
                    $("#stats").append('<li><span style="float: left">Daño</span><span style="float: right" class="detalle">' + item.dmgMin + ' / ' + item.dmgMax + '</span></li>')
                }

                if (item.armorMax != 0){
                    $("#stats").append('<li><span style="float: left">Defensa</span><span style="float: right" class="detalle">' + item.armorMin + ' / ' + item.armorMax + '</span></li>')
                }

                if (item.vidaMax != 0){
                    $("#stats").append('<li><span style="float: left">Vida</span><span style="float: right" class="detalle">' + item.vidaMin + ' / ' + item.vidaMax + '</span></li>')
                }

                if (item.manaMax != 0){
                    $("#stats").append('<li><span style="float: left">Mana</span><span style="float: right" class="detalle">' + item.manaMin + ' / ' + item.manaMax + '</span></li>')
                }

                if (item.lifeStealMax != 0){
                    $("#stats").append('<li><span style="float: left">Robo de Vida %</span><span style="float: right" class="detalle">' + item.lifeStealMin + ' / ' + item.lifeStealMax + '</span></li>')
                }

                if (item.critChanceMax != 0){
                    $("#stats").append('<li><span style="float: left">Chance de Crítico % </span><span style="float: right" class="detalle">' + item.critChanceMin + ' / ' + item.critChanceMax + '</span></li>')
                }

                if (item.critDmgMax != 0){
                    $("#stats").append('<li><span style="float: left">Daño Crítico %</span><span style="float: right" class="detalle">' + item.critDmgMin + ' / ' + item.critDmgMax + '</span></li>')
                }

                if (item.cdrMax != 0){
                    $("#stats").append('<li><span style="float: left">Reducción de Enfriamiento %</span><span style="float: right" class="detalle">' + item.cdrMin + ' / ' + item.cdrMax + '</span></li>')
                }

                if (item.rmMax != 0){
                    $("#stats").append('<li><span style="float: left">Resistencia Mágica</span><span style="float: right" class="detalle">' + item.rmMin + ' / ' + item.rmMax + '</span></li>')
                }

                if (item.magicPenMax != 0){
                    $("#stats").append('<li><span style="float: left">Penetración Mágica</span><span style="float: right" class="detalle">' + item.magicPenMin + ' / ' + item.magicPenMax + '</span></li>')
                }

                if (item.armorPenMax != 0){
                    $("#stats").append('<li><span style="float: left">Penetración de Armadura</span><span style="float: right" class="detalle">' + item.armorPenMin + ' / ' + item.armorPenMax + '</span></li>')
                }

                if (item.hpRegenMax != 0){
                    $("#stats").append('<li><span style="float: left">Regeneración de vida </span><span style="float: right" class="detalle">' + item.hpRegenMin + ' / ' + item.hpRegenMax + '</span></li>')
                }

                if (item.manaRegenMax != 0){
                    $("#stats").append('<li><span style="float: left">Regeneración de Maná</span><span style="float: right" class="detalle">' + item.manaRegenMin + ' / ' + item.manaRegenMax + '</span></li>')
                }

                if (item.socketMax != 0){
                    $("#stats").append('<li><span style="float: left">Engarce</span><span style="float: right" class="detalle">' + item.socketMin + ' / ' + item.socketMax + '</span></li>')
                }
                
            }, 'json');
        }
    </script>
@endsection