var versionEngine = 109;

//Inicialización
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms, 2: mb

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '10px';
stats.domElement.style.top = '10px';

document.body.appendChild(stats.domElement);

loader = new PxLoader();

loader.addCompletionListener(function(e) {
    startWebSocket();

    $(".progressBar").hide();
    $(".outer").css('display', 'table');

    var outer = $('.outer');

    if (outer.height() >= 760) {
        $("#console").css({
            display: 'block',
            left: '-14px',
            top: '632px',
            width: '950px',
            height: '99px'
        });
        $(".openConsole").hide();
        $(".content").css('height', '760px');
    }

    $("#divCanvas").show();
});

loader.addProgressListener(function(e) {

    var porcentaje = e.completedCount * 578 / e.totalCount;

    $("#porcentajeBarra").html(Math.floor(e.completedCount * 100 / e.totalCount) + "%");

    if (porcentaje <= 578) {
        $(".progressBar .barra").css({
            'width': porcentaje
        });
    }
});

function renderItemsInventary() {
    $.each(items, function(idPos, item) {

        if (!item.validUser) {
            $($(".slot_inv .img_item")[idPos - 1]).addClass('itemNotValid');
        }

        $($(".slot_inv .img_item")[idPos - 1]).css("background-image", "url('graficos/" + inits.graphics[item.grhIndex].numFile + ".png')").css("background-size", "32px");

        $($(".slot_inv .amount")[idPos - 1]).html(item.cant);

        $($(".slot_inv")[idPos - 1]).data('item', idPos);

        if (item.equipped) {
            $($(".slot_inv .equipped")[idPos - 1]).show();
        }
    });
}

function renderSpells() {
    $.each(spells, function(idPos, spell) {
        $($(".slot_spell .img_spell")[idPos - 1]).css("background-image", "url(assets/spells/" + spell.idSpell + ".png)").css("background-size", "100% 100%");
        $($(".slot_spell")[idPos - 1]).data('spell', idPos);
    });
}

function initCanvas() {
    try {
        if (!localStorage.getItem('name') || !localStorage.getItem('password') || !localStorage.getItem('character')) {
            window.location.href = '/';
        }

        canvas.background = {};
        canvas.background.element = $("#background");
        canvas.background.ctx = canvas.background.element.get(0).getContext("2d");

        canvas.techos = {};
        canvas.techos.element = $("#techos");
        canvas.techos.ctx = canvas.techos.element.get(0).getContext("2d");

        canvas.foreground = {};
        canvas.foreground.element = $("#foreground");
        canvas.foreground.ctx = canvas.foreground.element.get(0).getContext("2d");

        canvas.items = {};
        canvas.items.element = $("#items");
        canvas.items.ctx = canvas.items.element.get(0).getContext("2d");

        canvas.textos = {};
        canvas.textos.element = $("#textos");
        canvas.textos.ctx = canvas.textos.element.get(0).getContext("2d");

        /*canvas.characters = {};
        canvas.characters.element = $("#characters");
        canvas.characters.ctx = canvas.characters.element.get(0).getContext("2d");*/

        inits.loadMaps(function(success) {
            inits.loadObjs(function(success) {
                inits.loadHeads(function(success) {
                    inits.loadArmas(function(success) {
                        inits.loadEscudos(function(success) {
                            inits.loadCascos(function(success) {
                                inits.loadBodies(function(success) {
                                    inits.loadFxs(function(success) {
                                        inits.loadGraphics(function(success) {
                                            console.log("Todo cargado");
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        $(".slotTrade").click(function(event) {
            $(".slotTrade").removeClass('slotTradeSelected');

            $(this).addClass('slotTradeSelected');
            $(".titleItemTrade").html($(this).data('name'));
            $(".infoItem").html($(this).data('info'));
            $(".goldItemTrade").html($(this).data('gold'));
            var imgItem = $(this).children('.imgItem').css('background-image');
            $(".imgItemTrade").children('.imgItem').css('background-image', imgItem);
        });

        $(".slotInventary").click(function(event) {
            $(".slotInventary").removeClass('slotInventarySelected');

            $(this).addClass('slotInventarySelected');
            $(".titleItemTrade").html($(this).data('name'));
            $(".infoItem").html($(this).data('info'));
            $(".goldItemTrade").html($(this).data('gold'));

            var imgItem = $(this).children('.imgItem').css('background-image');
            $(".imgItemTrade").children('.imgItem').css('background-image', imgItem);
        });

        $(".buttonBuy").click(function(event) {
            pkg.setPackageID(pkg.serverPacketID.buyItem);
            pkg.writeByte($(".slotTradeSelected").data('idPos'));
            pkg.writeShort($(".cantTrade").val());
            ws.send(pkg.dataSend());
        });

        $(".buttonSell").click(function(event) {
            pkg.setPackageID(pkg.serverPacketID.sellItem);
            pkg.writeByte($(".slotInventarySelected").data('idPos'));
            pkg.writeShort($(".cantTrade").val());
            ws.send(pkg.dataSend());
        });

        $(".slot_spell").click(function(event) {
            if (user.maxMana > 0) {
                if ($("#keyMacro:visible").length) {
                    var image = $(this).children('.img_spell').css('background-image');
                    $(".modalMacro .img .item").hide();
                    $(".modalMacro .img .item").css('background-image', '');
                    $(".modalMacro .img .spell").css('background-image', image).show();
                    spellSelectedMacro = $(this).data('spell');
                } else {
                    hechizoSelected = $(this).data('spell');
                    nombreHechizo = $(this).data('name');
                    $("#mouseEvent").css("cursor", "crosshair");
                    writeConsole("Haz click sobre el objetivo...", "gray");
                }
            }
        });

        var delay = 1000,
            setTimeoutConst;

        $(".slot_inv").hover(function() {
            var offsetInv = $(this).offset();
            var idPos = $(this).index();

            setTimeoutConst = setTimeout(function() {

                $(".modalInfo").empty();

                var item = items[idPos + 1];
                var obj = inits.objs[item.idItem];

                var html = '<li><span style="float: left">Nombre</span><span style="float: right" class="detalle">' + item.nameItem + '</span></li>';

                switch (item.objType) {
                    case objType.armas:
                        html += '<li><span style="float: left">Daño</span><span style="float: right" class="detalle">' + obj.minHit + "/" + obj.maxHit + '</span></li>';

                        if (obj.apu) {
                            html += '<li><span style="float: left">Apuñala</span><span style="float: right" class="detalle">Si</span></li>';
                        }

                        if (obj.staffDamageBonus) {
                            html += '<li><span style="float: left">Daño mágico</span><span style="float: right" class="detalle">' + obj.staffDamageBonus + '</span></li>';
                        }
                        break;

                    case objType.armaduras:
                        html += '<li><span style="float: left">Defensa</span><span style="float: right" class="detalle">' + obj.minDef + "/" + obj.maxDef + '</span></li>';
                        break;

                    case objType.escudos:
                        html += '<li><span style="float: left">Defensa</span><span style="float: right" class="detalle">' + obj.minDef + "/" + obj.maxDef + '</span></li>';
                        break;

                    case objType.cascos:
                        html += '<li><span style="float: left">Defensa</span><span style="float: right" class="detalle">' + obj.minDef + "/" + obj.maxDef + '</span></li>';

                        if (obj.minDefMag && obj.maxDefMag) {
                            html += '<li><span style="float: left">Defensa Mágica</span><span style="float: right" class="detalle">' + obj.minDefMag + "/" + obj.maxDefMag + '</span></li>';
                        }
                        break;

                    case objType.flechas:
                        html += '<li><span style="float: left">Daño</span><span style="float: right" class="detalle">' + obj.minHit + "/" + obj.maxHit + '</span></li>';
                        break;
                }

                $(".modalInfo").append(html);

                $(".modalInfo").offset({
                    top: offsetInv.top + 19,
                    left: offsetInv.left + 19
                });
                $(".modalInfo").show();
            }, delay);
        }, function() {
            $(".modalInfo").offset({
                top: 0,
                left: 0
            });
            $(".modalInfo").hide();
            clearTimeout(setTimeoutConst);
        });

        $(".slot_spell").hover(function() {
            var offsetInv = $(this).offset();
            var idPos = $(this).index();

            setTimeoutConst = setTimeout(function() {

                $(".modalInfo").empty();

                var spell = spells[idPos + 1];

                var html = '<li><span style="float: left">Nombre</span><span style="float: right" class="detalle">' + spell.name + '</span></li>';
                html += '<li><span style="float: left">Maná requerida</span><span style="float: right; width: 40px;" class="detalle">' + spell.manaRequired + '</span></li>';

                $(".modalInfo").append(html);

                $(".modalInfo").offset({
                    top: offsetInv.top + 32,
                    left: offsetInv.left + 32
                });
                $(".modalInfo").show();
            }, delay);
        }, function() {
            $(".modalInfo").offset({
                top: 0,
                left: 0
            });
            $(".modalInfo").hide();
            clearTimeout(setTimeoutConst);
        });

        $(".slot_inv").on('click', function(event) {
            $(".modalInfo").offset({
                top: 0,
                left: 0
            });
            $(".modalInfo").hide();
            clearTimeout(setTimeoutConst);
            $(".slot_inv").removeClass('item_selected');
            $(this).addClass('item_selected');

            if ($("#keyMacro:visible").length) {
                var image = $(this).children('.img_item').css('background-image');
                $(".modalMacro .img .spell").hide();
                $(".modalMacro .img .spell").css('background-image', '');
                $(".modalMacro .img .item").css('background-image', image).show();
                itemSelectedMacro = $(this).data('item');
            } else {
                if (clickUse > 1 && lastClickIdItem == $(this).data('item')) {
                    clickUse = 0;
                    game.useItem($(this).data('item'));
                }

                clickUse++;

                lastClickIdItem = $(this).data('item');
            }
        });

        $("body").keyup(function(event) {
            if (!$("#text:visible").length) {
                if (event.keyCode == keyCodeDefault[nameKeyCode.usar]) {
                    game.useItem($(".item_selected").data('item'));
                }
                if (event.keyCode == keyCodeDefault[nameKeyCode.equipar]) {
                    game.equiparItem($(".item_selected").data('item'), $(".item_selected").attr('id'));
                }

                document.onkeydown = function(e) {
                    e = e || window.event;
                    if (e.ctrlKey) {
                        var c = e.which || e.keyCode;
                        switch (c) {
                            case 83:
                            case 87:
                            case 68:
                                e.preventDefault();
                                e.stopPropagation();
                                break;
                        }
                    }
                };

                //Agarrar
                if (event.keyCode == keyCodeDefault[nameKeyCode.agarrar]) {
                    pkg.setPackageID(pkg.serverPacketID.agarrarItem);
                    ws.send(pkg.dataSend());
                }

                //Tirar
                if (event.keyCode == keyCodeDefault[nameKeyCode.tirar]) {
                    var idPos = $(".item_selected").data('item');

                    var cantItem = 1;

                    if (idPos) {
                        cantItem = prompt("¿Cuántos quieres tirar?", 1);
                    }

                    if (cantItem > 0) {
                        pkg.setPackageID(pkg.serverPacketID.tirarItem);
                        pkg.writeInt(idPos);
                        pkg.writeShort(parseInt(cantItem));
                        ws.send(pkg.dataSend());
                    }
                }

                if (event.keyCode == keyCodeDefault[nameKeyCode.atacar]) {
                    if (+Date.now() - timeHitStart > intervalHit) {
                        engine.hit();
                    }
                }
            }
        });
    } catch (err) {
        dumpError(err);
    }
}

//Funciones
var game = new Game();

function Game() {
    this.useItem = function(idPos) {
        try {
            if (idPos) {
                var objItem = inits.objs[items[idPos].idItem];

                if (objItem.proyectil && items[idPos].equipped) {
                    $("#mouseEvent").css("cursor", "crosshair");
                    itemSelected = items[idPos].idItem;
                } else {
                    if (+Date.now() - timeItemStart > intervalItem) {
                        timeItemStart = +Date.now();

                        pkg.setPackageID(pkg.serverPacketID.useItem);
                        pkg.writeInt(idPos);
                        ws.send(pkg.dataSend());
                    }
                }
            }
        } catch (err) {
            dumpError(err);
        }
    };

    this.equiparItem = function(idPos, id) {
        pkg.setPackageID(pkg.serverPacketID.equiparItem);
        pkg.writeInt(idPos);
        ws.send(pkg.dataSend());
    };

    this.connectCharacter = function() {
        pkg.setPackageID(pkg.serverPacketID.connectCharacter);
        pkg.writeString(localStorage.getItem('name'));
        pkg.writeString(localStorage.getItem('password'));
        pkg.writeString(localStorage.getItem('character'));

        ws.send(pkg.dataSend());
    };
}

var inits = new Inits();

var mapasCargados = 0;

function Inits() {
    this.preCacheGraphics = {};
    this.graphics = {};
    this.heads = {};
    this.bodies = {};
    this.fxs = {};
    this.armas = {};
    this.escudos = {};
    this.cascos = {};
    this.objs = {};

    this.loadMaps = function(callback) {

        for (var i = 1; i <= 290; i++) {
            inits.loadMap(i);
        }

        callback(true);
    };

    this.loadMap = function(map, callback) {
        $.get('mapas/mapa_' + map + '.map', function(data) {
            try {
                var tmpMap = JSON.parse(data);
                mapa[map] = tmpMap[map];
            } catch (e) {
                mapa[map] = data[map];
            }

            engine.createMapData(map);

            mapasCargados++;
            $("#porcentajeBarra").html(mapasCargados + " / 290 Mapas");

            if (callback) {
                callback(true);
            }
        });
    };

    this.loadObjs = function(callback) {
        var count = 0;
        var objIndex = 0;
        var objNum = 0;

        $.get('init/obj.dat', function(data) {
            var responseArr = data.split('\n');

            for (var line in responseArr) {
                var response = responseArr[line];

                var responseSplit = response.split('[OBJ');
                objNum = responseSplit[1];

                if (objNum) {
                    objIndex = objNum.trim().split(']')[0];
                    inits.objs[objIndex] = {};
                }

                responseSplit = response.split('Name=');
                var name = responseSplit[1];

                if (name) {
                    inits.objs[objIndex].name = name.trim();
                }

                responseSplit = response.split('GrhIndex=');
                var grhIndex = responseSplit[1];

                if (grhIndex) {
                    inits.objs[objIndex].grhIndex = grhIndex.trim();
                }

                responseSplit = response.split('Proyectil=');
                var proyectil = responseSplit[1];

                if (proyectil) {
                    inits.objs[objIndex].proyectil = parseInt(proyectil);
                }

                responseSplit = response.split('MinHit=');
                var minHit = responseSplit[1];

                if (minHit) {
                    inits.objs[objIndex].minHit = parseInt(minHit.trim());
                }

                responseSplit = response.split('MaxHit=');
                var maxHit = responseSplit[1];

                if (maxHit) {
                    inits.objs[objIndex].maxHit = parseInt(maxHit.trim());
                }

                responseSplit = response.split('MinDef=');
                var minDef = responseSplit[1];

                if (minDef) {
                    inits.objs[objIndex].minDef = parseInt(minDef.trim());
                }

                responseSplit = response.split('MaxDef=');
                var maxDef = responseSplit[1];

                if (maxDef) {
                    inits.objs[objIndex].maxDef = parseInt(maxDef.trim());
                }

                responseSplit = response.split('StaffDamageBonus=');
                var staffDamageBonus = responseSplit[1];

                if (staffDamageBonus) {
                    inits.objs[objIndex].staffDamageBonus = parseInt(staffDamageBonus.trim());
                }

                responseSplit = response.split('DefensaMagicaMin=');
                var minDefMag = responseSplit[1];

                if (minDefMag) {
                    inits.objs[objIndex].minDefMag = parseInt(minDefMag.trim());
                }

                responseSplit = response.split('DefensaMagicaMax=');
                var maxDefMag = responseSplit[1];

                if (maxDefMag) {
                    inits.objs[objIndex].maxDefMag = parseInt(maxDefMag.trim());
                }

                responseSplit = response.split('Apuñala=');
                var apu = responseSplit[1];

                if (apu) {
                    inits.objs[objIndex].apu = parseInt(apu.trim());
                }
            }

            callback(true);
        });
    };

    this.loadHeads = function(callback) {
        var count = 0;
        var headId = 0;

        $.get('init/heads.ini', function(data) {
            var responseArr = data.split('\n');

            $.each(responseArr, function(index, response) {
                if (count == 0) {
                    var responseSplit = response.split('HeadId=');
                    headId = parseInt(responseSplit[1]);

                    inits.heads[headId] = {};
                } else if (count == 1) {
                    var responseSplit = response.split('Head1=');
                    headGrh = responseSplit[1];

                    inits.heads[headId][1] = parseInt(headGrh);
                } else if (count == 2) {
                    var responseSplit = response.split('Head2=');
                    headGrh = responseSplit[1];

                    inits.heads[headId][3] = parseInt(headGrh);
                } else if (count == 3) {
                    var responseSplit = response.split('Head3=');
                    headGrh = responseSplit[1];

                    inits.heads[headId][2] = parseInt(headGrh);
                } else if (count == 4) {
                    var responseSplit = response.split('Head4=');
                    headGrh = responseSplit[1];

                    inits.heads[headId][4] = parseInt(headGrh);
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

                    inits.bodies[bodyId] = {};
                } else if (count == 1) {
                    var responseSplit = response.split('Walk1=');
                    bodyGrh = responseSplit[1];

                    inits.bodies[bodyId][1] = parseInt(bodyGrh);
                } else if (count == 2) {
                    var responseSplit = response.split('Walk2=');
                    bodyGrh = responseSplit[1];

                    inits.bodies[bodyId][3] = parseInt(bodyGrh);
                } else if (count == 3) {
                    var responseSplit = response.split('Walk3=');
                    bodyGrh = responseSplit[1];

                    inits.bodies[bodyId][2] = parseInt(bodyGrh);
                } else if (count == 4) {
                    var responseSplit = response.split('Walk4=');
                    bodyGrh = responseSplit[1];

                    inits.bodies[bodyId][4] = parseInt(bodyGrh);
                } else if (count == 5) {
                    var responseSplit = response.split('HeadOffsetX=');
                    var offSet = responseSplit[1];

                    inits.bodies[bodyId]["headOffsetX"] = parseInt(offSet);
                } else if (count == 6) {
                    var responseSplit = response.split('HeadOffsetY=');
                    var offSet = responseSplit[1];

                    inits.bodies[bodyId]["headOffsetY"] = parseInt(offSet);
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
                    inits.graphics[grh[1]] = {
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

                    if (inits.graphics[grh[1]].numFile) {
                        if (!inits.preCacheGraphics[inits.graphics[grh[1]].numFile]) {
                            inits.preCacheGraphics[inits.graphics[grh[1]].numFile] = loader.addImage('../graficos/' + inits.graphics[grh[1]].numFile + '.png');
                        }
                    }
                } else {
                    inits.graphics[grh[1]] = {
                        numFrames: grhData[1],
                        frames: {},
                        frameCounter: 0
                    };

                    inits.graphics[grh[1]].speed = grhData[1] * 1000 / 70;

                    if (inits.graphics[grh[1]].speed > 85) {
                        inits.graphics[grh[1]].speed = 85;
                    }

                    for (i = 1; i <= grhData[1]; i++) {
                        inits.graphics[grh[1]].frames[i] = responseSplit[i];
                    }
                }
            });

            loader.start();

            callback(true);
        });
    };

    this.loadArmas = function(callback) {
        var count = 0;
        var objIndex = 0;
        var armaNum = 0;

        $.get('init/armas.ini', function(data) {
            var responseArr = data.split('\n');

            for (line in responseArr) {
                var response = responseArr[line];

                var responseSplit = response.split('[Arma');
                armaNum = responseSplit[1];

                if (armaNum) {
                    objIndex = armaNum.trim().split(']')[0];
                    inits.armas[objIndex] = {};
                }

                var responseSplit = response.split('Dir1=');
                dir = responseSplit[1];

                if (dir) {
                    inits.armas[objIndex][1] = parseInt(dir.trim());
                }

                var responseSplit = response.split('Dir2=');
                dir = responseSplit[1];

                if (dir) {
                    inits.armas[objIndex][3] = parseInt(dir.trim());
                }

                var responseSplit = response.split('Dir3=');
                dir = responseSplit[1];

                if (dir) {
                    inits.armas[objIndex][2] = parseInt(dir.trim());
                }

                var responseSplit = response.split('Dir4=');
                dir = responseSplit[1];

                if (dir) {
                    inits.armas[objIndex][4] = parseInt(dir.trim());
                }
            }

            callback(true);
        });
    };

    this.loadEscudos = function(callback) {
        var count = 0;
        var objIndex = 0;
        var escudoNum = 0;

        $.get('init/escudos.ini', function(data) {
            var responseArr = data.split('\n');

            for (line in responseArr) {
                var response = responseArr[line];

                var responseSplit = response.split('[ESC');
                escudoNum = responseSplit[1];

                if (escudoNum) {
                    objIndex = escudoNum.trim().split(']')[0];
                    inits.escudos[objIndex] = {};
                }

                var responseSplit = response.split('Dir1=');
                dir = responseSplit[1];

                if (dir) {
                    inits.escudos[objIndex][1] = parseInt(dir.trim());
                }

                var responseSplit = response.split('Dir2=');
                dir = responseSplit[1];

                if (dir) {
                    inits.escudos[objIndex][3] = parseInt(dir.trim());
                }

                var responseSplit = response.split('Dir3=');
                dir = responseSplit[1];

                if (dir) {
                    inits.escudos[objIndex][2] = parseInt(dir.trim());
                }

                var responseSplit = response.split('Dir4=');
                dir = responseSplit[1];

                if (dir) {
                    inits.escudos[objIndex][4] = parseInt(dir.trim());
                }
            }

            callback(true);
        });
    };

    this.loadCascos = function(callback) {
        var count = 0;
        var objIndex = 0;
        var cascoNum = 0;

        $.get('init/cascos.ini', function(data) {
            var responseArr = data.split('\n');

            for (line in responseArr) {
                var response = responseArr[line];

                var responseSplit = response.split('[CASCO');
                cascoNum = responseSplit[1];

                if (cascoNum) {
                    objIndex = cascoNum.trim().split(']')[0];
                    inits.cascos[objIndex] = {};
                    inits.cascos[objIndex].offsetX = 0;
                    inits.cascos[objIndex].offsetY = 0;
                }

                responseSplit = response.split('Casco1=');
                dir = responseSplit[1];

                if (dir) {
                    inits.cascos[objIndex][1] = parseInt(dir.trim());
                }

                responseSplit = response.split('Casco2=');
                dir = responseSplit[1];

                if (dir) {
                    inits.cascos[objIndex][3] = parseInt(dir.trim());
                }

                responseSplit = response.split('Casco3=');
                dir = responseSplit[1];

                if (dir) {
                    inits.cascos[objIndex][2] = parseInt(dir.trim());
                }

                responseSplit = response.split('Casco4=');
                dir = responseSplit[1];

                if (dir) {
                    inits.cascos[objIndex][4] = parseInt(dir.trim());
                }

                responseSplit = response.split('Casco4=');
                dir = responseSplit[1];

                if (dir) {
                    inits.cascos[objIndex][4] = parseInt(dir.trim());
                }

                responseSplit = response.split('OffsetX=');
                var offsetX = responseSplit[1];

                if (offsetX) {
                    inits.cascos[objIndex].offsetX = parseInt(offsetX.trim());
                }

                responseSplit = response.split('OffsetY=');
                var offsetY = responseSplit[1];

                if (offsetY) {
                    inits.cascos[objIndex].offsetY = parseInt(offsetY.trim());
                }
            }

            callback(true);
        });
    };

    this.loadFxs = function(callback) {
        var spellIndex = 0;
        var idSpell = 0;

        $.get('init/fxs.ini', function(data) {
            var responseArr = data.split('\n');

            for (var line in responseArr) {
                var response = responseArr[line];

                var responseSplit = response.split('[FX');
                idSpell = responseSplit[1];

                if (idSpell) {
                    spellIndex = idSpell.trim().split(']')[0];
                    inits.fxs[spellIndex] = {};
                }

                responseSplit = response.split('Animacion=');
                idFx = responseSplit[1];

                if (idFx) {
                    inits.fxs[spellIndex].grh = parseInt(idFx.trim());
                    inits.fxs[spellIndex].offsetX = 0;
                    inits.fxs[spellIndex].offsetY = 0;
                }

                responseSplit = response.split('OffsetX=');
                offsetX = responseSplit[1];

                if (offsetX) {
                    inits.fxs[spellIndex].offsetX = parseInt(offsetX.trim());
                }

                responseSplit = response.split('OffsetY=');
                offsetY = responseSplit[1];

                if (offsetY) {
                    inits.fxs[spellIndex].offsetY = parseInt(offsetY.trim());
                }
            }

            callback(true);
        });
    };
}

var user = new User();

function User() {
    this.moving = false;

    this.addtoUserPos = {
        x: 0,
        y: 0
    };

    this.pos = {
        x: 0,
        y: 0
    };

    this.id = 0;
}

var general = new General();

function General() {
    this.sendDialog = function(msg) {
        try {
            msg = msg.trim();
            if (msg) {
                var msgsplit = msg.split(" ");
                if (msgsplit[0].charAt(0) == "/") {
                    msgsplit[0] = msgsplit[0].toLowerCase();
                }
                if (msg.length > textMaxLength) {
                    msg = msg.slice(0, textMaxLength);
                }

                pkg.setPackageID(pkg.serverPacketID.dialog);
                pkg.writeString(msg);
                ws.send(pkg.dataSend());
            }
        } catch (err) {
            dumpError(err);
        }
    };
}

function writeConsole(msg, color, bold, italic) {
    if (!color) {
        color = "white";
    }

    if (bold) {
        bold = "bold";
    } else {
        bold = "normal";
    }

    if (italic) {
        italic = "italic";
    } else {
        italic = "normal";
    }

    $("#console").append("<span style='color: " + color + "; font-weight: " + bold + "; font-style: " + italic + ";'>" + msg + "</span><br>");
    $("#console").scrollTop($("#console").prop("scrollHeight"));
}

function spellSound(id) {
    var aud = new Audio('assets/sounds/' + id + '.wav');
    aud.volume = volume;
    aud.play();
}

var engine = new Engine();

function Engine() {
    var engineBaseSpeed = 0.016;

    var delta = 0;

    var personajes = {};
    var mapData = {};

    var lastDelta = 0;
    var timerTicksPerFrame = 0;
    var lFrameTimer = 0;
    var framesPerSecCounter = 0;
    var FPS = 0;
    this.ping = 0;

    var offsetCounterX = 0;
    var offsetCounterY = 0;

    var scrollPixelsPerFrameX = 9;
    var scrollPixelsPerFrameY = 9;

    function timestamp() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    this.createMapData = function(idMap) {
        mapData[idMap] = [];

        for (var y = 1; y <= 100; y++) {
            mapData[idMap][y] = [];

            for (var x = 1; x <= 100; x++) {
                mapData[idMap][y][x] = {
                    id: 0
                };
            }
        }
    };

    this.cleanMapData = function(idMap) {
        if (mapData[idMap]) {
            for (y = 1; y <= 100; y++) {
                for (x = 1; x <= 100; x++) {
                    mapData[idMap][y][x].id = 0;
                    delete mapa[idMap][y][x].o;
                }
            }
        }
    };

    this.setMapData = function(idMap, pos, data) {
        mapData[idMap][pos.y][pos.x].id = data;
    };

    this.clickCanvas = function(pos) {
        var tileSelected = mapData[mapNumber][pos.y][pos.x];

        if (!tileSelected.id) {
            tileSelected = mapData[mapNumber][pos.y + 1][pos.x];
        }

        pkg.setPackageID(pkg.serverPacketID.click);
        pkg.writeByte(pos.x);
        pkg.writeByte(pos.y);
        ws.send(pkg.dataSend());

        //console.log("CLICK - X: " + pos.x + " | Y: " + pos.y);

        if (hechizoSelected) {
            $("#mouseEvent").css("cursor", "default");

            if (+Date.now() - timeSpellStart > intervalSpell) {
                if (user.mana >= spells[hechizoSelected].manaRequired) {
                    timeSpellStart = +Date.now();

                    pkg.setPackageID(pkg.serverPacketID.attackSpell);
                    pkg.writeByte(hechizoSelected);
                    pkg.writeByte(pos.x);
                    pkg.writeByte(pos.y);
                    ws.send(pkg.dataSend());
                } else {
                    writeConsole("No tiene suficiente mana.", "gray");
                }

                hechizoSelected = 0;
            } else {
                writeConsole("Aún no puedes realizar esa acción.", "gray");
            }
        }

        if (itemSelected) {
            $("#mouseEvent").css("cursor", "default");

            if (+Date.now() - timeRangeStart > rangeInterval) {
                timeRangeStart = +Date.now();

                pkg.setPackageID(pkg.serverPacketID.attackRange);
                pkg.writeByte(pos.x);
                pkg.writeByte(pos.y);
                ws.send(pkg.dataSend());

                itemSelected = 0;
            } else {
                writeConsole("Aún no puedes realizar esa acción.", "gray");
            }
        }
    };

    this.setPersonaje = function(personaje) {
        personajes[personaje.id] = personaje;
    };

    this.deleteAllPersonajes = function() {
        personajes = {};
    };

    this.setAttrPersonaje = function(idPersonaje, attr, data) {
        if (personajes[idPersonaje]) {
            personajes[idPersonaje][attr] = data;
        }
    };

    this.deletePersonaje = function(idPersonaje) {
        if (personajes[idPersonaje]) {
            mapData[mapNumber][personajes[idPersonaje].pos.y][personajes[idPersonaje].pos.x].id = 0;

            delete personajes[idPersonaje];

            if (dialogs[idPersonaje]) {
                delete dialogs[idPersonaje];
            }
        }
    };

    this.actPositionServer = function(pos, heading) {
        if (user.pos.x != pos.x || user.pos.y != pos.y) {
            user.pos.x = pos.x;
            user.pos.y = pos.y;

            mapData[mapNumber][personajes[user.id].pos.y][personajes[user.id].pos.x].id = 0;

            personajes[user.id].pos.x = pos.x;
            personajes[user.id].pos.y = pos.y;
            personajes[user.id].heading = heading;

            mapData[mapNumber][personajes[user.id].pos.y][personajes[user.id].pos.x].id = user.id;

            actCoordUser();

            changePositionPointMinimap(pos.x, pos.y);

            changeMinimap(mapNumber);

            engine.renderBackground(0, 0);
        }
    };

    this.inmovilizado = function(pos) {
        if (user.pos.x != pos.x || user.pos.y != pos.y) {
            user.pos.x = pos.x;
            user.pos.y = pos.y;

            mapData[mapNumber][personajes[user.id].pos.y][personajes[user.id].pos.x].id = 0;

            personajes[user.id].pos.x = pos.x;
            personajes[user.id].pos.y = pos.y;

            mapData[mapNumber][personajes[user.id].pos.y][personajes[user.id].pos.x].id = user.id;

            actCoordUser();

            changePositionPointMinimap(pos.x, pos.y);

            changeMinimap(mapNumber);

            engine.renderBackground(0, 0);
        }
    };

    this.hit = function() {
        var heading = personajes[user.id].heading;
        var x = personajes[user.id].pos.x;
        var y = personajes[user.id].pos.y;
        var valido = false;
        switch (heading) {
            case 1:
                if (mapData[mapNumber][y - 1][x].id !== 0) {
                    valido = true;
                }
                break;
            case 2:
                if (mapData[mapNumber][y + 1][x].id !== 0) {
                    valido = true;
                }
                break;
            case 3:
                if (mapData[mapNumber][y][x + 1].id !== 0) {
                    valido = true;
                }
                break;
            case 4:
                if (mapData[mapNumber][y][x - 1].id !== 0) {
                    valido = true;
                }
                break;
            default:
                console.log("Invalid heading");
                break;
        }

        if (valido) {
            timeHitStart = +Date.now();

            pkg.setPackageID(pkg.serverPacketID.attackMele);
            ws.send(pkg.dataSend());

            valido = false;
        }
    };

    this.loop = function() {
        try {
            stats.begin();

            if (user.id) {
                delta = timestamp() - lastDelta;
                lastDelta = timestamp();

                keys.check();
                render();
            }

            stats.end();

            requestAnimationFrame(engine.loop);
            //setTimeout(engine.loop,0);
        } catch (err) {
            dumpError(err);
        }
    };

    this.clearRender = function(capa) {
        canvas[capa].ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    };

    function showNextFrame() {
        try {
            if (user.moving) {
                if (user.addtoUserPos.x) {
                    offsetCounterX = offsetCounterX - 9 * user.addtoUserPos.x * timerTicksPerFrame;

                    if (Math.abs(offsetCounterX) >= Math.abs(32 * user.addtoUserPos.x)) {
                        offsetCounterX = 0;
                        user.addtoUserPos.x = 0;
                        user.moving = false;
                    }
                }

                if (user.addtoUserPos.y) {
                    offsetCounterY = offsetCounterY - scrollPixelsPerFrameY * user.addtoUserPos.y * timerTicksPerFrame;

                    if (Math.abs(offsetCounterY) >= Math.abs(32 * user.addtoUserPos.y)) {
                        offsetCounterY = 0;
                        user.addtoUserPos.y = 0;
                        user.moving = false;
                    }
                }

                engine.renderBackground(offsetCounterX, offsetCounterY);
            }

            renderScreen(user.pos.x - user.addtoUserPos.x, user.pos.y - user.addtoUserPos.y, offsetCounterX, offsetCounterY);
        } catch (err) {
            dumpError(err);
        }
    }

    function fps() {
        if ((timestamp() - lFrameTimer) > 1000) {
            FPS = framesPerSecCounter;
            framesPerSecCounter = 0;
            lFrameTimer = timestamp();
        }
    }

    function render() {
        try {
            showNextFrame();

            fps();
            framesPerSecCounter = framesPerSecCounter + 1;
            timerTicksPerFrame = delta * engineBaseSpeed;
        } catch (err) {
            dumpError(err);
        }
    }

    this.updateItems = function(pixelOffsetX, pixelOffsetY) {
        engine.clearRender('items');

        var tileX = user.pos.x - user.addtoUserPos.x;
        var tileY = user.pos.y - user.addtoUserPos.y;

        var PixelOffsetXTemp = 0;
        var PixelOffsetYTemp = 0;

        var minXOffset = 0;
        var minYOffset = 0;

        var ScreenX = 0;
        var ScreenY = 0;

        var screenminY = tileY - 9;
        var screenmaxY = tileY + 10;
        var screenminX = tileX - 9;
        var screenmaxX = tileX + 10;

        var minY = screenminY - TileBufferSize + 2;
        var maxY = screenmaxY + TileBufferSize;
        var minX = screenminX - TileBufferSize + 2;
        var maxX = screenmaxX + TileBufferSize;

        var objInfo;
        var grhObj;

        if (minY < YMinMapSize) {
            minYOffset = YMinMapSize - minY;
            minY = YMinMapSize;
        }

        if (maxY > YMaxMapSize) {
            maxY = YMaxMapSize;
        }

        if (minX < XMinMapSize) {
            minXOffset = XMinMapSize - minX;
            minX = XMinMapSize;
        }

        if (maxX > XMaxMapSize) {
            maxX = XMaxMapSize;
        }

        ScreenY = minYOffset - TileBufferSize;

        for (y = minY; y < maxY; y++) {
            ScreenX = minXOffset - TileBufferSize;

            for (x = minX; x < maxX; x++) {
                PixelOffsetXTemp = ScreenX * 32 + pixelOffsetX;
                PixelOffsetYTemp = ScreenY * 32 + pixelOffsetY;

                objInfo = mapa[mapNumber][y][x].o;

                if (objInfo) {
                    grhObj = inits.graphics[inits.objs[objInfo.oi].grhIndex];

                    if (grhObj && grhObj.numFrames === 1) {

                        var CurrentGrhIndex = grhObj.frames[1];

                        grhObj = inits.graphics[CurrentGrhIndex];

                        PixelOffsetXTemp -= Math.floor((grhObj.width * 16) / 32) - 48;
                        PixelOffsetYTemp -= Math.floor((grhObj.height * 16) / 16) - 64;

                        drawGrhCapa('items', grhObj, PixelOffsetXTemp, PixelOffsetYTemp);
                    }
                }

                ScreenX = ScreenX + 1;
            }

            ScreenY = ScreenY + 1;
        }

    };

    this.renderBackground = function(pixelOffsetX, pixelOffsetY) {
        engine.clearRender('background');
        engine.clearRender('techos');


        var tileX = user.pos.x - user.addtoUserPos.x;
        var tileY = user.pos.y - user.addtoUserPos.y;

        var PixelOffsetXTemp = 0;
        var PixelOffsetYTemp = 0;

        var minXOffset = 0;
        var minYOffset = 0;

        var ScreenX = 0;
        var ScreenY = 0;

        var screenminY = tileY - 9;
        var screenmaxY = tileY + 10;
        var screenminX = tileX - 9;
        var screenmaxX = tileX + 10;

        var minY = screenminY - TileBufferSize + 2;
        var maxY = screenmaxY + TileBufferSize;
        var minX = screenminX - TileBufferSize + 2;
        var maxX = screenmaxX + TileBufferSize;

        var objInfo;
        var grhObj;

        if (minY < YMinMapSize) {
            minYOffset = YMinMapSize - minY;
            minY = YMinMapSize;
        }

        if (maxY > YMaxMapSize) {
            maxY = YMaxMapSize;
        }

        if (minX < XMinMapSize) {
            minXOffset = XMinMapSize - minX;
            minX = XMinMapSize;
        }

        if (maxX > XMaxMapSize) {
            maxX = XMaxMapSize;
        }

        for (y = screenminY; y < screenmaxY; y++) {
            for (x = screenminX; x < screenmaxX; x++) {
                if (x > 0 && x <= XMaxMapSize && y > 0 && y <= YMaxMapSize) {
                    tempPixelOffsetX = (ScreenX - 1) * 32 + pixelOffsetX;
                    tempPixelOffsetY = (ScreenY - 1) * 32 + pixelOffsetY;

                    grhCapa1 = inits.graphics[mapa[mapNumber][y][x].g[1]];

                    if (grhCapa1.numFrames === 1) {
                        drawGrhCapa('background', grhCapa1, tempPixelOffsetX, tempPixelOffsetY);
                    }
                } else {
                    var tmpX = x;
                    var tmpY = y;

                    tempPixelOffsetX = (ScreenX - 1) * 32 + pixelOffsetX;
                    tempPixelOffsetY = (ScreenY - 1) * 32 + pixelOffsetY;

                    if (y > YMaxMapSize) {
                        tmpY = YMaxMapSize;
                    }
                    if (y <= 0) {
                        tmpY = 1;
                    }

                    if (x > XMaxMapSize) {
                        tmpX = XMaxMapSize;
                    }
                    if (x <= 0) {
                        tmpX = 1;
                    }

                    grhCapa1 = inits.graphics[mapa[mapNumber][tmpY][tmpX].g[1]];

                    if (grhCapa1.numFrames === 1) {
                        drawGrhCapa('background', grhCapa1, tempPixelOffsetX, tempPixelOffsetY);
                    }
                }

                ScreenX = ScreenX + 1;
            }

            ScreenX = ScreenX - x + screenminX;
            ScreenY = ScreenY + 1;
        }

        engine.updateItems(pixelOffsetX, pixelOffsetY);

        actTechos = true;
    };

    function renderScreen(tileX, tileY, pixelOffsetX, pixelOffsetY) {
        //try {
        engine.clearRender('foreground');
        //engine.clearRender('characters');
        engine.clearRender('textos');

        var personaje = {};

        var PixelOffsetXTemp = 0;
        var PixelOffsetYTemp = 0;

        var minXOffset = 0;
        var minYOffset = 0;

        var ScreenX = 0;
        var ScreenY = 0;

        var screenminY = tileY - 10;
        var screenmaxY = tileY + 9;
        var screenminX = tileX - 10;
        var screenmaxX = tileX + 9;

        var screenminY2 = tileY - 9;
        var screenmaxY2 = tileY + 10;
        var screenminX2 = tileX - 9;
        var screenmaxX2 = tileX + 10;

        var minY = screenminY - TileBufferSize + 3;
        var maxY = screenmaxY + TileBufferSize;
        var minX = screenminX - TileBufferSize + 3;
        var maxX = screenmaxX + TileBufferSize;

        if (minY < YMinMapSize) {
            minYOffset = YMinMapSize - minY;
            minY = YMinMapSize;
        }

        if (maxY > YMaxMapSize) {
            maxY = YMaxMapSize;
        }

        if (minX < XMinMapSize) {
            minXOffset = XMinMapSize - minX;
            minX = XMinMapSize;
        }

        if (maxX > XMaxMapSize) {
            maxX = XMaxMapSize;
        }

        for (y = screenminY2; y < screenmaxY2; y++) {
            for (x = screenminX2; x < screenmaxX2; x++) {
                if (x > 0 && x <= XMaxMapSize && y > 0 && y <= YMaxMapSize) {
                    tempPixelOffsetX = (ScreenX - 1) * 32 + pixelOffsetX;
                    tempPixelOffsetY = (ScreenY - 1) * 32 + pixelOffsetY;

                    grhCapa1 = inits.graphics[mapa[mapNumber][y][x].g[1]];

                    if (grhCapa1.numFrames > 1) {
                        grhCapa1.frameCounter += (delta / grhCapa1.speed);

                        if (Math.ceil(grhCapa1.frameCounter) > grhCapa1.numFrames) {
                            grhCapa1.frameCounter = 0;
                            grhCapa1.frameCounter += (delta / grhCapa1.speed);
                        }

                        var CurrentGrhIndex = grhCapa1.frames[Math.ceil(grhCapa1.frameCounter)];

                        grhCapa1 = inits.graphics[CurrentGrhIndex];

                        drawGrhCapa('foreground', grhCapa1, tempPixelOffsetX, tempPixelOffsetY);
                    }

                    grhCapa2 = inits.graphics[mapa[mapNumber][y][x].g[2]];

                    if (grhCapa2.numFrames) {
                        drawGrhCapa('foreground', grhCapa2, tempPixelOffsetX, tempPixelOffsetY);
                    }
                }
                ScreenX = ScreenX + 1;
            }

            ScreenX = ScreenX - x + screenminX2;
            ScreenY = ScreenY + 1;
        }

        ScreenY = minYOffset - TileBufferSize;

        for (y = minY; y < maxY; y++) {
            ScreenX = minXOffset - TileBufferSize;

            for (x = minX; x < maxX; x++) {
                PixelOffsetXTemp = ScreenX * 32 + pixelOffsetX;
                PixelOffsetYTemp = ScreenY * 32 + pixelOffsetY;

                objInfo = mapa[mapNumber][y][x].o;

                if (objInfo) {
                    grhObj = inits.graphics[inits.objs[objInfo.oi].grhIndex];

                    if (grhObj && grhObj.numFrames > 1) {

                        grhObj.frameCounter += (delta / grhObj.speed);

                        if (Math.ceil(grhObj.frameCounter) > grhObj.numFrames) {
                            grhObj.frameCounter = 0;
                            grhObj.frameCounter += (delta / grhObj.speed);
                        }

                        var CurrentGrhIndex = grhObj.frames[Math.ceil(grhObj.frameCounter)];

                        grhObj = inits.graphics[CurrentGrhIndex];

                        PixelOffsetXTemp -= Math.floor((grhObj.width * 16) / 32) - 48;
                        PixelOffsetYTemp -= Math.floor((grhObj.height * 16) / 16) - 64;

                        drawGrhCapa('foreground', grhObj, PixelOffsetXTemp, PixelOffsetYTemp);
                    }
                }

                ScreenX = ScreenX + 1;
            }

            ScreenY = ScreenY + 1;
        }

        ScreenY = minYOffset - TileBufferSize;

        for (y = minY; y < maxY; y++) {
            ScreenX = minXOffset - TileBufferSize;

            for (x = minX; x < maxX; x++) {
                PixelOffsetXTemp = (ScreenX + 0) * 32 + pixelOffsetX;
                PixelOffsetYTemp = (ScreenY + 0) * 32 + pixelOffsetY;

                grhCapa3 = inits.graphics[mapa[mapNumber][y][x].g[3]];

                if (x >= 0 && x <= (XMaxMapSize) && y >= 0 && y <= (YMaxMapSize)) {
                    if (mapData[mapNumber][y][x].id) {
                        tempPixelOffsetX = (ScreenX + 1) * 32 + pixelOffsetX;
                        tempPixelOffsetY = (ScreenY + 1) * 32 + pixelOffsetY;

                        personaje = personajes[mapData[mapNumber][y][x].id];

                        if (personaje) {
                            charRender(personaje, tempPixelOffsetX, tempPixelOffsetY);
                        }
                    }
                }

                if (grhCapa3.numFrames) {

                    var CurrentGrhIndex = grhCapa3.frames[1];

                    grhCapa3 = inits.graphics[CurrentGrhIndex];

                    PixelOffsetXTemp -= Math.floor((grhCapa3.width * 16) / 32) - 48;
                    PixelOffsetYTemp -= Math.floor((grhCapa3.height * 16) / 16) - 64;

                    drawGrhCapa('foreground', grhCapa3, PixelOffsetXTemp, PixelOffsetYTemp);
                }

                ScreenX = ScreenX + 1;
            }

            ScreenY = ScreenY + 1;
        }

        if (actTechos) {
            ScreenY = minYOffset - TileBufferSize;
            for (y = minY; y < maxY; y++) {
                ScreenX = minXOffset - TileBufferSize;

                for (x = minX; x < maxX; x++) {
                    PixelOffsetXTemp = ScreenX * 32 + pixelOffsetX;
                    PixelOffsetYTemp = ScreenY * 32 + pixelOffsetY;

                    grhCapa4 = inits.graphics[mapa[mapNumber][y][x].g[4]];

                    if (grhCapa4.numFrames) {

                        var CurrentGrhIndex = grhCapa4.frames[1];

                        grhCapa4 = inits.graphics[CurrentGrhIndex];
                        PixelOffsetXTemp -= Math.floor((grhCapa4.width * 16) / 32) - 48;
                        PixelOffsetYTemp -= Math.floor((grhCapa4.height * 16) / 16) - 64;

                        drawGrhCapa('techos', grhCapa4, PixelOffsetXTemp, PixelOffsetYTemp, true);
                    }

                    ScreenX = ScreenX + 1;
                }

                ScreenY = ScreenY + 1;
            }

            actTechos = false;
        }

        cargarDescCliente();

        renderText("Ping (ms): " + engine.ping, 10, 20, "red", true, 12, "Tahoma");

        if (seguroActivado) {
            renderText("Seguro Activado", 10, 35, "red", true, 12, "Tahoma");
        } else {
            renderText("Seguro Desactivado", 10, 35, "red", true, 12, "Tahoma");
        }
        /*renderText("FPS: " + FPS, 10, 45, "red", true, 15, "Tahoma");*/
        /*} catch (err) {
            dumpError(err);
        }*/
    }

    var posYDescClient = 0;
    var sumPosY = 0;
    var lifeDescClient = 0;
    var timeMoveDescClient = 0;

    function cargarDescCliente() {
        if (descClient.length) {
            $.each(descClient, function(index, val) {
                posYDescClient = (20 - sumPosY) + (20 * index);
                renderText(val, 10, posYDescClient, "white", true, 14, "Tahoma");
            });

            posYDescClient = 0;

            if (timeMoveDescClient > 500) {
                descClient = [];
            } else {
                timeMoveDescClient++;
            }
        }
    }

    function drawGrhCapa(capa, grh, x, y, alpha) {
        try {
            var image = inits.preCacheGraphics[grh.numFile];

            if (image) {
                if (alpha) {
                    canvas[capa].ctx.globalAlpha = 0.5;
                }
                if (canvas[capa].ctx) {
                    canvas[capa].ctx.drawImage(image, grh.sX, grh.sY, grh.width, grh.height, x, y, grh.width, grh.height);
                }
                if (alpha) {
                    canvas[capa].ctx.globalAlpha = 1;
                }
            }
        } catch (err) {
            dumpError(err);
        }
    }

    function charRender(personaje, pixelOffsetX, pixelOffsetY) {
        try {
            var moved = false;

            if (personaje.moving) {
                if (personaje.scrollDirectionX) {
                    personaje.moveOffsetX = personaje.moveOffsetX + scrollPixelsPerFrameX * personaje.scrollDirectionX * timerTicksPerFrame;

                    moved = true;

                    if ((sign(personaje.scrollDirectionX) == 1 && personaje.moveOffsetX >= 0) || (sign(personaje.scrollDirectionX) == -1 && personaje.moveOffsetX <= 0)) {
                        personaje.moveOffsetX = 0;
                        personaje.scrollDirectionX = 0;
                    }
                }

                if (personaje.scrollDirectionY) {
                    personaje.moveOffsetY = personaje.moveOffsetY + scrollPixelsPerFrameY * personaje.scrollDirectionY * timerTicksPerFrame;

                    moved = true;

                    if ((sign(personaje.scrollDirectionY) == 1 && personaje.moveOffsetY >= 0) || (sign(personaje.scrollDirectionY) == -1 && personaje.moveOffsetY <= 0)) {
                        personaje.moveOffsetY = 0;
                        personaje.scrollDirectionY = 0;
                    }
                }
            }

            if (!moved) {
                personaje.frameCounter = 1;
                personaje.frameCounterWeapon = 1;
                personaje.frameCounterShield = 1;
                personaje.moving = false;
            }

            drawChar(personaje, pixelOffsetX + personaje.moveOffsetX, pixelOffsetY + personaje.moveOffsetY);

            if (personaje.fxId) {
                drawFx(personaje, pixelOffsetX + personaje.moveOffsetX, pixelOffsetY + personaje.moveOffsetY, true);
            }
        } catch (err) {
            dumpError(err);
        }
    }

    function drawChar(personaje, sX, sY) {
        try {
            var nameLength = personaje.nameCharacter.length * 3.5;

            if (delta) {
                var grhRopa = "";
                var grhWeapon = "";
                var grhShield = "";

                if (personaje.idBody) {
                    grhRopa = inits.bodies[personaje.idBody][personaje.heading];
                }

                if (personaje.idWeapon) {
                    grhWeapon = inits.armas[personaje.idWeapon][personaje.heading];
                }

                if (personaje.idShield) {
                    grhShield = inits.escudos[personaje.idShield][personaje.heading];
                }

                if (personaje.moving) {
                    personaje.frameCounter += (delta / inits.graphics[grhRopa].speed);

                    if (Math.ceil(personaje.frameCounter) > inits.graphics[grhRopa].numFrames) {
                        personaje.frameCounter = 0;
                        personaje.frameCounter += (delta / inits.graphics[grhRopa].speed);
                    }

                    if (grhWeapon) {
                        personaje.frameCounterWeapon += (delta / inits.graphics[grhWeapon].speed);

                        if (Math.ceil(personaje.frameCounterWeapon) > inits.graphics[grhWeapon].numFrames) {
                            personaje.frameCounterWeapon = 0;
                            personaje.frameCounterWeapon += (delta / inits.graphics[grhWeapon].speed);
                        }
                    }

                    if (grhShield) {
                        personaje.frameCounterShield += (delta / inits.graphics[grhShield].speed);

                        if (Math.ceil(personaje.frameCounterShield) > inits.graphics[grhShield].numFrames) {
                            personaje.frameCounterShield = 0;
                            personaje.frameCounterShield += (delta / inits.graphics[grhShield].speed);
                        }
                    }
                }

                if (personaje.frameCounter > 0 && Math.ceil(personaje.frameCounter) <= inits.graphics[grhRopa].numFrames) {



                    var graphicsGrhRopa = "";
                    var graphicsGrhWeapon = "";
                    var graphicsGrhShield = "";

                    if (grhRopa) {
                        var CurrentGrhRopa = inits.graphics[grhRopa].frames[Math.ceil(personaje.frameCounter)];
                        graphicsGrhRopa = inits.graphics[CurrentGrhRopa];
                    }

                    if (grhWeapon) {
                        var CurrentGrhWeapon = inits.graphics[grhWeapon].frames[Math.ceil(personaje.frameCounterWeapon)];
                        graphicsGrhWeapon = inits.graphics[CurrentGrhWeapon];
                    }

                    if (grhShield) {
                        var CurrentGrhShield = inits.graphics[grhShield].frames[Math.ceil(personaje.frameCounterShield)];
                        graphicsGrhShield = inits.graphics[CurrentGrhShield];
                    }

                    if (personaje.idHead) {
                        var grhCabeza = inits.heads[personaje.idHead][personaje.heading];

                        var graphicGrhHead = inits.graphics[grhCabeza];

                        var widtHead = graphicGrhHead.width;
                        var heightHead = graphicGrhHead.height;

                        canvas.foreground.ctx.drawImage(inits.preCacheGraphics[graphicGrhHead.numFile], graphicGrhHead.sX, graphicGrhHead.sY, widtHead, heightHead, sX + OffsetXHead, sY + inits.bodies[personaje.idBody].headOffsetY - 18, widtHead, heightHead);

                    }

                    if (graphicsGrhRopa) {
                        var widthRopa = graphicsGrhRopa.width;
                        var heightRopa = graphicsGrhRopa.height;

                        tmpsX = sX - Math.floor((widthRopa * 16) / 32) + 16;
                        tmpsY = sY - Math.floor((heightRopa * 32) / 32) + 32;

                        canvas.foreground.ctx.drawImage(inits.preCacheGraphics[graphicsGrhRopa.numFile], graphicsGrhRopa.sX, graphicsGrhRopa.sY, widthRopa, heightRopa, tmpsX, tmpsY, widthRopa, heightRopa);
                    }

                    if (personaje.idHelmet) {
                        var casco = inits.cascos[personaje.idHelmet];
                        var grhHelmet = inits.cascos[personaje.idHelmet][personaje.heading];

                        var graphicGrhHelmet = inits.graphics[grhHelmet];

                        var widtHelmet = graphicGrhHelmet.width;
                        var heightHelmet = graphicGrhHelmet.height;

                        canvas.foreground.ctx.drawImage(inits.preCacheGraphics[graphicGrhHelmet.numFile], graphicGrhHelmet.sX, graphicGrhHelmet.sY, widtHelmet, heightHelmet, (sX + OffsetXHead) + casco.offsetX, (sY + inits.bodies[personaje.idBody].headOffsetY - 18) + casco.offsetY, widtHelmet, heightHelmet);

                    }

                    if (graphicsGrhWeapon) {
                        var widthWeapon = graphicsGrhWeapon.width;
                        var heightWeapon = graphicsGrhWeapon.height;

                        tmpsX = sX - Math.floor((widthWeapon * 16) / 32) + 16;
                        tmpsY = sY - Math.floor((heightWeapon * 32) / 32) + 28;

                        canvas.foreground.ctx.drawImage(inits.preCacheGraphics[graphicsGrhWeapon.numFile], graphicsGrhWeapon.sX, graphicsGrhWeapon.sY, widthWeapon, heightWeapon, tmpsX, tmpsY, widthWeapon, heightWeapon);
                    }

                    if (graphicsGrhShield) {
                        var widthShield = graphicsGrhShield.width;
                        var heightShield = graphicsGrhShield.height;

                        tmpsX = sX - Math.floor((widthShield * 16) / 32) + 16;
                        tmpsY = sY - Math.floor((heightShield * 32) / 32) + 32;

                        canvas.foreground.ctx.drawImage(inits.preCacheGraphics[graphicsGrhShield.numFile], graphicsGrhShield.sX, graphicsGrhShield.sY, widthShield, heightShield, tmpsX, tmpsY, widthShield, heightShield);
                    }

                    nameX = sX - nameLength + 16;

                    renderText2(personaje.nameCharacter, nameX, sY + 45, personaje.color, true, 13, "Tahoma");

                    if (personaje.clan) {
                        var clanLength = personaje.clan.length * 4;
                        clanX = sX - clanLength + 16;

                        renderText2(personaje.clan, clanX, sY + 65, personaje.color, true, 13, "Tahoma");
                    }

                    if (dialogs[personaje.id]) {
                        textLength = dialogs[personaje.id].msg.length;
                        var firstLineLength;

                        if (textLength >= 30) {
                            firstLineLength = 45;
                        } else {
                            firstLineLength = textLength * 3;
                        }

                        dialogX = sX + 32 - firstLineLength;

                        renderDialog(personaje.id, dialogX, (sY + inits.bodies[personaje.idBody].headOffsetY) - dialogs[personaje.id].y, dialogs[personaje.id].color, true, 13, "Tahoma");

                    }

                }
            }
        } catch (err) {
            dumpError(err);
        }
    }

    function drawFx(personaje, sX, sY, alpha) {
        try {
            if (delta) {
                var grh = inits.fxs[personaje.fxId].grh;

                personaje.frameFxCounter += (delta / inits.graphics[grh].speed);

                if (Math.ceil(personaje.frameFxCounter) > inits.graphics[grh].numFrames) {
                    personaje.frameFxCounter = 0;
                    personaje.frameFxCounter += (delta / inits.graphics[grh].speed);
                    if (personaje.fxId != 4 && personaje.fxId != 5 && personaje.fxId != 6 && personaje.fxId != 16 && personaje.fxId != 34) {
                        personaje.fxId = 0;
                    }
                }

                if (personaje.frameFxCounter > 0 && Math.ceil(personaje.frameFxCounter) <= inits.graphics[grh].numFrames && personaje.fxId) {

                    var CurrentGrhIndex = inits.graphics[grh].frames[Math.ceil(personaje.frameFxCounter)];

                    var graphicCurrentGrh = inits.graphics[CurrentGrhIndex];

                    var width = graphicCurrentGrh.width;
                    var height = graphicCurrentGrh.height;

                    sX += inits.fxs[personaje.fxId].offsetX;
                    sY += inits.fxs[personaje.fxId].offsetY;

                    if (alpha) {
                        canvas.foreground.ctx.globalAlpha = 0.6;
                    }

                    canvas.foreground.ctx.drawImage(inits.preCacheGraphics[graphicCurrentGrh.numFile], graphicCurrentGrh.sX, graphicCurrentGrh.sY, width, height, sX, sY, width, height);

                    if (alpha) {
                        canvas.foreground.ctx.globalAlpha = 1;
                    }
                }
            }
        } catch (err) {
            dumpError(err);
        }
    }

    function renderDialog(id, x, y, color, bold, fontSize, fontType) {
        try {
            var options = "";

            if (bold) {
                options += "bold";
            }

            if (fontSize) {
                options += " " + fontSize + "px";
            }

            if (fontType) {
                options += " " + fontType;
            }

            canvas.textos.ctx.font = options;


            if (color) {
                canvas.textos.ctx.fillStyle = color;
            }


            var text = dialogs[id].msg;
            var words = text.split(" ");
            var wordsLine = "";
            var count = 0;
            var currentLine = 0;
            var lineHeight = 20;
            var cantWordsPerLine = 4;
            var posYText = 0;

            var wordsLength = words.length;
            var textLength = text.length;

            if (wordsLength > 4 && textLength >= 30) {
                posYText = (Math.ceil(words.length / cantWordsPerLine) - 1) * 20;
            }

            for (i = 0; i < wordsLength; i++) {
                if (count <= cantWordsPerLine || textLength < 30) {
                    wordsLine += words[i] + " ";
                }

                count++;

                if (count >= cantWordsPerLine && textLength >= 30 || i == (wordsLength - 1)) {
                    var textPosY = (y + (lineHeight * currentLine++)) - posYText;

                    canvas.textos.ctx.strokeStyle = "#000000";
                    canvas.textos.ctx.strokeText(wordsLine, x - 20, textPosY);
                    canvas.textos.ctx.fillText(wordsLine, x - 20, textPosY);
                    wordsLine = "";
                    count = 0;
                }
            }

            if (dialogs[id].life > 150) {
                delete dialogs[id];
            } else {
                if (dialogs[id].y < 30) {
                    dialogs[id].y++;
                }
                dialogs[id].life++;
            }
        } catch (err) {
            dumpError(err);
        }
    }

    function renderText(text, x, y, color, bold, fontSize, fontType) {
        try {
            var options = "";

            if (bold) {
                options += "bold";
            }

            if (fontSize) {
                options += " " + fontSize + "px";
            }

            if (fontType) {
                options += " " + fontType;
            }

            canvas.textos.ctx.font = options;

            if (color) {
                canvas.textos.ctx.fillStyle = color;
            }

            canvas.textos.ctx.strokeStyle = "#000000";
            canvas.textos.ctx.strokeText(text, x, y);
            canvas.textos.ctx.fillText(text, x, y);
        } catch (err) {
            dumpError(err);
        }
    }

    function renderText2(text, x, y, color, bold, fontSize, fontType) {
        try {
            var options = "";

            if (bold) {
                options += "bold";
            }

            if (fontSize) {
                options += " " + fontSize + "px";
            }

            if (fontType) {
                options += " " + fontType;
            }

            canvas.foreground.ctx.font = options;

            if (color) {
                canvas.foreground.ctx.fillStyle = color;
            }

            canvas.foreground.ctx.strokeStyle = "#000000";
            canvas.foreground.ctx.strokeText(text, x, y);
            canvas.foreground.ctx.fillText(text, x, y);
        } catch (err) {
            dumpError(err);
        }
    }

    function renderRango(rango, x, y) {
        try {
            rangoimg = new Image();

            rangoimg.src = "assets/imgs/rango" + rango + ".png";
            canvas.foreground.ctx.drawImage(rangoimg, x, y);
        } catch (err) {
            dumpError(err);
        }
    }
    var timeWalk = 0;

    this.moveTo = function(userId, direccion) {
        if (+Date.now() - timeWalk > timeWalkMS) {
            if (!user.inmovilizado) {
                if (personajes[userId]) {
                    engine.moveScreen(direccion, false);
                }
            } else {
                pkg.setPackageID(pkg.serverPacketID.position);
                pkg.writeByte(direccion);
                ws.send(pkg.dataSend());

                personajes[userId].heading = direccion;

                timeWalk = +Date.now();
            }
        }

    };

    this.moveScreen = function(direccion, dontSend) {
        try {
            var x = 0;
            var y = 0;
            var tX = 0;
            var tY = 0;

            switch (direccion) {
                case direcciones.up:
                    y = -1;
                    break;

                case direcciones.right:
                    x = 1;
                    break;

                case direcciones.down:
                    y = 1;
                    break;

                case direcciones.left:
                    x = -1;
                    break;
            }

            tX = user.pos.x + x;
            tY = user.pos.y + y;

            if (legalPos(tX, tY, user.navegando)) {
                user.addtoUserPos.x = x;
                user.pos.x = tX;
                user.addtoUserPos.y = y;
                user.pos.y = tY;
                user.moving = 1;

                changePositionPointMinimap(tX, tY);

                moveCharByHead(user.id, direccion, dontSend);
            } else {
                if (personajes[user.id].heading != direccion) {
                    personajes[user.id].heading = direccion;

                    pkg.setPackageID(pkg.serverPacketID.changeHeading);
                    pkg.writeByte(direccion);
                    ws.send(pkg.dataSend());
                }
            }

            timeWalk = +Date.now();

            actCoordUser();
        } catch (err) {
            dumpError(err);
        }
    };

    function legalPos(tX, tY, aguaValida) {
        if (tX >= 1 && tY >= 1 && tX <= 100 && tY <= 100) {
            var ret = true;

            if (!mapa[mapNumber][tY][tX].b) {
                if (mapData[mapNumber][tY][tX].id) {
                    ret = false;
                } else {
                    ret = true;
                }
            } else {
                ret = false;
            }

            if (hayAgua(tX, tY)) {
                if (aguaValida && !mapData[mapNumber][tY][tX].id) {
                    ret = true;
                } else {
                    ret = false;
                }
            } else {
                if (aguaValida) {
                    ret = false;
                }
            }

            return ret;
        } else {
            return false;
        }
    }

    function hayAgua(tX, tY) {
        if ((mapa[mapNumber][tY][tX].g[1] >= 1505 && mapa[mapNumber][tY][tX].g[1] <= 1520 && !mapa[mapNumber][tY][tX].g[2]) || (mapa[mapNumber][tY][tX].g[1] >= 5665 && mapa[mapNumber][tY][tX].g[1] <= 5680 && !mapa[mapNumber][tY][tX].g[2]) || mapa[mapNumber][tY][tX].g[1] >= 13547 && mapa[mapNumber][tY][tX].g[1] <= 13562 && !mapa[mapNumber][tY][tX].g[2]) {
            return true;
        } else {
            return false;
        }
    }

    function moveCharByHead(idPj, heading, dontSend) {
        try {
            var personaje = personajes[idPj];

            if (!personaje) {
                return;
            }

            var oldX = personaje.pos.x;
            var oldY = personaje.pos.y;

            var newX = 0;
            var newY = 0;

            if (heading == direcciones.right) {
                newX = 1;
            } else if (heading == direcciones.left) {
                newX = -1;
            } else if (heading == direcciones.down) {
                newY = 1;
            } else if (heading == direcciones.up) {
                newY = -1;
            }

            posX = oldX + newX;
            posY = oldY + newY;

            personaje.heading = heading;

            mapData[mapNumber][oldY][oldX].id = 0;
            mapData[mapNumber][posY][posX].id = idPj;

            personaje.moving = true;

            personaje.pos.x = posX;
            personaje.pos.y = posY;

            personaje.moveOffsetX = -1 * (32 * newX);
            personaje.moveOffsetY = -1 * (32 * newY);

            personaje.scrollDirectionX = sign(newX);
            personaje.scrollDirectionY = sign(newY);

            if (!dontSend) {
                timeWalk = +Date.now();

                pkg.setPackageID(pkg.serverPacketID.position);
                pkg.writeByte(heading);
                ws.send(pkg.dataSend());
            }
        } catch (err) {
            dumpError(err);
        }
    }

    this.moveCharByPos = function(idPj, posX, posY) {
        try {
            var personaje = personajes[idPj];
            if (!personaje) {
                return;
            }

            var oldX = personaje.pos.x;
            var oldY = personaje.pos.y;

            var newX = 0;
            var newY = 0;

            var heading = 0;

            newX = posX - oldX;
            newY = posY - oldY;

            if (sign(newX) == 1) {
                heading = direcciones.right;
            } else if (sign(newX) == -1) {
                heading = direcciones.left;
            } else if (sign(newY) == 1) {
                heading = direcciones.down;
            } else if (sign(newY) == -1) {
                heading = direcciones.up;
            }

            personaje.heading = heading;

            /*if (!legalPos(posX, posY)) {
                return;
            }*/

            mapData[mapNumber][oldY][oldX].id = 0;
            mapData[mapNumber][posY][posX].id = idPj;

            personaje.moving = true;

            personaje.pos.x = posX;
            personaje.pos.y = posY;

            personaje.heading = heading;

            personaje.moveOffsetX = -1 * (32 * newX);
            personaje.moveOffsetY = -1 * (32 * newY);

            personaje.scrollDirectionX = sign(newX);
            personaje.scrollDirectionY = sign(newY);
        } catch (err) {
            dumpError(err);
        }
    };

    this.validSendPosition = function(posX, posY) {
        if (user.pos.x < posX + 10 && user.pos.x > posX - 10 && user.pos.y < posY + 11 && user.pos.y > posY - 11) {
            return true;
        } else {
            return false;
        }
    };

    this.respawnMe = function(idPj, numMap, posX, posY) {
        try {
            var personaje = personajes[idPj];

            if (!personaje) {
                return;
            }

            if (mapNumber != numMap) {
                mapData[mapNumber] = [];

                for (var y = 1; y <= 100; y++) {
                    mapData[mapNumber][y] = [];

                    for (var x = 1; x <= 100; x++) {
                        mapData[mapNumber][y][x] = {
                            id: 0
                        };
                    }
                }

                mapNumber = numMap;

                //inits.loadMap(mapNumber, function(success) {
                user.pos.x = posX;
                user.pos.y = posY;

                actCoordUser();

                personaje.pos.x = posX;
                personaje.pos.y = posY;

                mapData[mapNumber][posY][posX].id = idPj;

                engine.renderBackground(0, 0);
                //});
            } else {
                mapData[mapNumber][personajes[idPj].pos.y][personajes[idPj].pos.x].id = 0;

                user.pos.x = posX;
                user.pos.y = posY;

                actCoordUser();

                personaje.pos.x = posX;
                personaje.pos.y = posY;

                mapData[mapNumber][posY][posX].id = idPj;

                engine.renderBackground(0, 0);
            }
        } catch (err) {
            dumpError(err);
        }
    };

    this.respawn = function(idPj, posX, posY) {
        try {
            var personaje = personajes[idPj];

            if (!personaje) {
                return;
            }

            mapData[mapNumber][personajes[idPj].pos.y][personajes[idPj].pos.x].id = 0;

            personaje.pos.x = posX;
            personaje.pos.y = posY;

            mapData[mapNumber][posY][posX].id = idPj;
        } catch (err) {
            dumpError(err);
        }
    };
}

var keys = new Keys();

function Keys() {
    this.check = function() {        
        if (!user.moving && user.pos.x > 0 && user.pos.y > 0 && !$(".modalFeedBack:visible").length && !$("#text:visible").length) {
            if (keydown[keyCodeDefault[nameKeyCode.flechaIzquierda]]) {
                engine.moveTo(user.id, direcciones.left);
            } else if (keydown[keyCodeDefault[nameKeyCode.flechaDerecha]]) {
                engine.moveTo(user.id, direcciones.right);
            } else if (keydown[keyCodeDefault[nameKeyCode.flechaArriba]]) {
                engine.moveTo(user.id, direcciones.up);
            } else if (keydown[keyCodeDefault[nameKeyCode.flechaAbajo]]) {
                engine.moveTo(user.id, direcciones.down);
            }
        }
    };
}