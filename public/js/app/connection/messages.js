var versionMessages = 108;

var dictionaryClient = {};
dictionaryClient[pkg.clientPacketID.getMyCharacter] = getMyCharacter;
dictionaryClient[pkg.clientPacketID.getCharacter] = getCharacter;
dictionaryClient[pkg.clientPacketID.changeRopa] = changeRopa;
dictionaryClient[pkg.clientPacketID.changeHelmet] = changeHelmet;
dictionaryClient[pkg.clientPacketID.changeWeapon] = changeWeapon;
dictionaryClient[pkg.clientPacketID.changeArrow] = changeArrow;
dictionaryClient[pkg.clientPacketID.actPosition] = actPosition;
dictionaryClient[pkg.clientPacketID.changeHeading] = changeHeading;
dictionaryClient[pkg.clientPacketID.deleteCharacter] = deleteCharacter;
dictionaryClient[pkg.clientPacketID.dialog] = dialog;
dictionaryClient[pkg.clientPacketID.console] = dataConsole;
dictionaryClient[pkg.clientPacketID.pong] = pong;
dictionaryClient[pkg.clientPacketID.animFX] = animFX;
dictionaryClient[pkg.clientPacketID.inmo] = inmo;
dictionaryClient[pkg.clientPacketID.updateHP] = updateHP;
dictionaryClient[pkg.clientPacketID.updateMaxHP] = updateMaxHP;
dictionaryClient[pkg.clientPacketID.updateMana] = updateMana;
dictionaryClient[pkg.clientPacketID.telepMe] = telepMe;
dictionaryClient[pkg.clientPacketID.actOnline] = actOnline;
dictionaryClient[pkg.clientPacketID.consoleOnline] = consoleOnline;
dictionaryClient[pkg.clientPacketID.actPositionServer] = actPositionServer;
dictionaryClient[pkg.clientPacketID.actExp] = actExp;
dictionaryClient[pkg.clientPacketID.actMyLevel] = actMyLevel;
dictionaryClient[pkg.clientPacketID.actGold] = actGold;
dictionaryClient[pkg.clientPacketID.actColorName] = actColorName;
dictionaryClient[pkg.clientPacketID.error] = error;
dictionaryClient[pkg.clientPacketID.changeName] = changeName;
dictionaryClient[pkg.clientPacketID.changeShield] = changeShield;
dictionaryClient[pkg.clientPacketID.getNpc] = getNpc;
dictionaryClient[pkg.clientPacketID.changeShield] = changeShield;
dictionaryClient[pkg.clientPacketID.putBodyAndHeadDead] = putBodyAndHeadDead;
dictionaryClient[pkg.clientPacketID.revivirUsuario] = revivirUsuario;
dictionaryClient[pkg.clientPacketID.quitarUserInvItem] = quitarUserInvItem;
dictionaryClient[pkg.clientPacketID.renderItem] = renderItem;
dictionaryClient[pkg.clientPacketID.deleteItem] = deleteItem;
dictionaryClient[pkg.clientPacketID.agregarUserInvItem] = agregarUserInvItem;
dictionaryClient[pkg.clientPacketID.blockMap] = blockMap;
dictionaryClient[pkg.clientPacketID.changeObjIndex] = changeObjIndex;
dictionaryClient[pkg.clientPacketID.openTrade] = openTrade;
dictionaryClient[pkg.clientPacketID.aprenderSpell] = aprenderSpell;
dictionaryClient[pkg.clientPacketID.closeForce] = closeForce;
dictionaryClient[pkg.clientPacketID.nameMap] = nameMap;
dictionaryClient[pkg.clientPacketID.changeBody] = changeBody;
dictionaryClient[pkg.clientPacketID.navegando] = navegando;
dictionaryClient[pkg.clientPacketID.updateAgilidad] = updateAgilidad;
dictionaryClient[pkg.clientPacketID.updateFuerza] = updateFuerza;

function connectionMessages(res) {
    pkg.setData(res.data);

    var packageID = pkg.getPackageID();

    dictionaryClient[packageID]();
}

function getMyCharacter() {
    var getVersionConfig = pkg.getShort();
    var getVersionMessages = pkg.getShort();
    var getVersionConnection = pkg.getShort();
    var getVersionConsole = pkg.getShort();
    var getVersionEngine = pkg.getShort();
    var getVersionPackage = pkg.getShort();

    if (getVersionConfig != versionConfig || getVersionMessages != versionMessages || getVersionConnection != versionConnection || getVersionConsole != versionConsole || getVersionEngine != versionEngine || getVersionPackage != versionPackage) {
        varCloseForce = true;
        ws.close();
        alert("El juego se encuentra desactualizado, debe actualizar el navegador para continuar. (F5)");
        return;
    }

    user.id = parseInt(pkg.getDouble());
    user.nameCharacter = pkg.getString();
    user.idClase = pkg.getByte();
    mapNumber = pkg.getShort();
    user.pos.x = pkg.getByte();
    user.pos.y = pkg.getByte();
    user.idHead = pkg.getShort();
    user.idHelmet = pkg.getShort();
    user.idWeapon = pkg.getShort();
    user.idShield = pkg.getShort();
    user.idBody = pkg.getShort();
    user.hp = pkg.getShort();
    user.maxHp = pkg.getShort();
    user.mana = pkg.getShort();
    user.maxMana = pkg.getShort();
    user.privileges = pkg.getByte();
    user.exp = pkg.getDouble();
    user.expNextLevel = pkg.getDouble();
    user.level = pkg.getByte();
    user.gold = pkg.getInt();
    user.heading = pkg.getByte();
    user.inmovilizado = pkg.getByte();
    user.zonaSegura = pkg.getByte();
    user.color = pkg.getString();
    user.clan = pkg.getString();
    user.navegando = pkg.getByte();

    $(".agilidad").html(pkg.getByte());
    $(".fuerza").html(pkg.getByte());

    //var descClient = pkg.getString();
    actCoordUser();

    var itemsLength = pkg.getByte();

    var idPos = 0;

    for (var i = 0; i < itemsLength; i++) {
        idPos = pkg.getByte();

        items[idPos] = {
            idItem: pkg.getInt(),
            nameItem: pkg.getString(),
            equipped: pkg.getByte(),
            grhIndex: pkg.getShort(),
            cant: pkg.getShort(),
            gold: pkg.getInt(),
            objType: pkg.getByte(),
            validUser: pkg.getByte(),
            info: pkg.getString()
        };
    }

    if (user.maxMana > 0) {
        var spellsLength = pkg.getByte();

        for (i = 0; i < spellsLength; i++) {
            idPos = pkg.getByte();

            spells[idPos] = {
                idSpell: pkg.getShort(),
                name: pkg.getString(),
                manaRequired: pkg.getShort()
            };
        }
    }

    var porcentaje = (user.exp * 100 / user.expNextLevel).toFixed(2);

    $(".hp .num").text(user.hp + " / " + user.maxHp);
    $(".hp .progress_bar").width(user.hp * hpLength / user.maxHp);

    $(".mana .num").text(formatMiles(user.mana) + " / " + formatMiles(user.maxMana));
    $(".mana .progress_bar").width(user.mana * manaLength / user.maxMana);
    $(".name").text(user.nameCharacter);
    $(".level").text(user.level);
    $(".gold").text(formatMiles(user.gold));
    $(".exp .porcentaje").text(porcentaje + "%");
    $(".exp .num").text(formatMiles(user.exp) + "/" + formatMiles(user.expNextLevel));
    $(".exp .progress_bar").css("width", porcentaje * xpLength / 100);

    var tmpPersonaje = JSON.parse(JSON.stringify(user));
    tmpPersonaje.moveOffsetX = 0;
    tmpPersonaje.moveOffsetY = 0;
    tmpPersonaje.fxId = 0;
    tmpPersonaje.frameFxCounter = 0;
    tmpPersonaje.scrollDirectionX = 0;
    tmpPersonaje.scrollDirectionY = 0;
    tmpPersonaje.moving = 0;
    tmpPersonaje.frameCounter = 0;
    tmpPersonaje.frameCounterWeapon = 0;
    tmpPersonaje.color = user.color;
    tmpPersonaje.clan = user.clan;

    engine.setPersonaje(tmpPersonaje);

    engine.setMapData(mapNumber, user.pos, user.id);

    renderItemsInventary();
    renderSpells();

    if (!engineStart) {
        engine.loop();
        engineStart = true;
    }

    changePositionPointMinimap(user.pos.x, user.pos.y);

    changeMinimap(mapNumber);

    engine.renderBackground(0, 0);
}

function getCharacter() {
    var id = pkg.getDouble();

    var tmpPersonaje = {};

    tmpPersonaje.id = id;
    tmpPersonaje.nameCharacter = pkg.getString();
    tmpPersonaje.idClase = pkg.getByte();
    tmpPersonaje.pos = {
        x: 0,
        y: 0
    };
    tmpPersonaje.map = pkg.getShort();
    tmpPersonaje.pos.x = pkg.getByte();
    tmpPersonaje.pos.y = pkg.getByte();
    tmpPersonaje.idHead = pkg.getShort();
    tmpPersonaje.idHelmet = pkg.getShort();
    tmpPersonaje.idWeapon = pkg.getShort();
    tmpPersonaje.idShield = pkg.getShort();
    tmpPersonaje.idBody = pkg.getShort();
    tmpPersonaje.isNpc = false;
    tmpPersonaje.privileges = pkg.getByte();
    tmpPersonaje.heading = pkg.getByte();
    tmpPersonaje.color = pkg.getString();
    tmpPersonaje.clan = pkg.getString();

    tmpPersonaje.moveOffsetX = 0;
    tmpPersonaje.moveOffsetY = 0;
    tmpPersonaje.fxId = 0;
    tmpPersonaje.frameFxCounter = 0;
    tmpPersonaje.scrollDirectionX = 0;
    tmpPersonaje.scrollDirectionY = 0;
    tmpPersonaje.moving = 0;
    tmpPersonaje.frameCounter = 0;

    engine.setPersonaje(tmpPersonaje);

    engine.setMapData(mapNumber, tmpPersonaje.pos, tmpPersonaje.id);
}

function getNpc() {
    var id = pkg.getDouble();

    var tmpPersonaje = {};

    tmpPersonaje.id = id;
    tmpPersonaje.nameCharacter = pkg.getString();
    tmpPersonaje.idClase = pkg.getByte();
    tmpPersonaje.pos = {
        x: 0,
        y: 0
    };
    tmpPersonaje.map = pkg.getShort();
    tmpPersonaje.pos.x = pkg.getByte();
    tmpPersonaje.pos.y = pkg.getByte();
    tmpPersonaje.idHead = pkg.getShort();
    tmpPersonaje.idHelmet = pkg.getShort();
    tmpPersonaje.idWeapon = pkg.getShort();
    tmpPersonaje.idShield = pkg.getShort();
    tmpPersonaje.idBody = pkg.getShort();
    tmpPersonaje.isNpc = true;
    tmpPersonaje.heading = pkg.getByte();
    tmpPersonaje.color = pkg.getString();
    tmpPersonaje.clan = pkg.getString();

    tmpPersonaje.moveOffsetX = 0;
    tmpPersonaje.moveOffsetY = 0;
    tmpPersonaje.fxId = 0;
    tmpPersonaje.frameFxCounter = 0;
    tmpPersonaje.scrollDirectionX = 0;
    tmpPersonaje.scrollDirectionY = 0;
    tmpPersonaje.moving = 0;
    tmpPersonaje.frameCounter = 0;

    engine.setPersonaje(tmpPersonaje);

    engine.setMapData(mapNumber, tmpPersonaje.pos, tmpPersonaje.id);
}

function changeName() {
    var id = pkg.getDouble();

    engine.setAttrPersonaje(id, 'nameCharacter', pkg.getString());
}

function changeRopa() {
    var id = pkg.getDouble();
    var grhRopa = pkg.getShort();
    var idPos = pkg.getByte();

    if (id == user.id) {
        for (var idIndexPos in items) {
            var item = items[idIndexPos];

            if (item.objType == objType.armaduras) {
                if (idIndexPos != idPos) {
                    $($(".slot_inv .equipped")[idIndexPos - 1]).hide();
                }
            }
        }

        var slotItem = $($(".slot_inv .equipped")[idPos - 1]);

        if (slotItem.is(":visible")) {
            items[idPos].equipped = 0;
            $($(".slot_inv .equipped")[idPos - 1]).hide();
        } else {
            items[idPos].equipped = 1;
            $($(".slot_inv .equipped")[idPos - 1]).show();
        }
    }

    engine.setAttrPersonaje(id, 'idBody', grhRopa);
}

function changeHelmet() {
    var id = pkg.getDouble();
    var grhHelmet = pkg.getShort();

    var idPos = pkg.getByte();

    if (id == user.id) {
        for (var idIndexPos in items) {
            var item = items[idIndexPos];

            if (item.objType == objType.cascos) {
                if (idIndexPos != idPos) {
                    $($(".slot_inv .equipped")[idIndexPos - 1]).hide();
                }
            }
        }

        var slotItem = $($(".slot_inv .equipped")[idPos - 1]);

        if (slotItem.is(":visible")) {
            items[idPos].equipped = 0;
            $($(".slot_inv .equipped")[idPos - 1]).hide();
        } else {
            items[idPos].equipped = 1;
            $($(".slot_inv .equipped")[idPos - 1]).show();
        }
    }

    engine.setAttrPersonaje(id, 'idHelmet', grhHelmet);
}

function changeWeapon() {
    var id = pkg.getDouble();
    var grhWeapon = pkg.getShort();

    var idPos = pkg.getByte();

    if (id == user.id) {
        for (var idIndexPos in items) {
            var item = items[idIndexPos];

            if (item.objType == objType.armas) {
                if (idIndexPos != idPos) {
                    $($(".slot_inv .equipped")[idIndexPos - 1]).hide();
                }
            }
        }

        var slotItem = $($(".slot_inv .equipped")[idPos - 1]);

        if (slotItem.is(":visible")) {
            items[idPos].equipped = 0;
            $($(".slot_inv .equipped")[idPos - 1]).hide();
        } else {
            items[idPos].equipped = 1;
            $($(".slot_inv .equipped")[idPos - 1]).show();
        }
    }

    engine.setAttrPersonaje(id, 'idWeapon', grhWeapon);
}

function changeArrow() {
    var id = pkg.getDouble();
    var idPos = pkg.getByte();

    if (id == user.id) {
        for (var idIndexPos in items) {
            var item = items[idIndexPos];

            if (item.objType == objType.flechas) {
                if (idIndexPos != idPos) {
                    $($(".slot_inv .equipped")[idIndexPos - 1]).hide();
                }
            }
        }

        var slotItem = $($(".slot_inv .equipped")[idPos - 1]);

        if (slotItem.is(":visible")) {
            items[idPos].equipped = 0;
            $($(".slot_inv .equipped")[idPos - 1]).hide();
        } else {
            items[idPos].equipped = 1;
            $($(".slot_inv .equipped")[idPos - 1]).show();
        }
    }
}

function changeShield() {
    var id = pkg.getDouble();
    var grhShield = pkg.getShort();

    var idPos = pkg.getByte();

    if (id == user.id) {
        for (var idIndexPos in items) {
            var item = items[idIndexPos];

            if (item.objType == objType.escudos) {
                if (idIndexPos != idPos) {
                    $($(".slot_inv .equipped")[idIndexPos - 1]).hide();
                }
            }
        }

        var slotItem = $($(".slot_inv .equipped")[idPos - 1]);

        if (slotItem.is(":visible")) {
            items[idPos].equipped = 0;
            $($(".slot_inv .equipped")[idPos - 1]).hide();
        } else {
            items[idPos].equipped = 1;
            $($(".slot_inv .equipped")[idPos - 1]).show();
        }
    }

    engine.setAttrPersonaje(id, 'idShield', grhShield);
}

function actPosition() {
    var id = pkg.getDouble();
    var x = pkg.getByte();
    var y = pkg.getByte();

    engine.moveCharByPos(id, x, y);
}

function changeHeading() {
    var id = pkg.getDouble();
    var heading = pkg.getByte();

    engine.setAttrPersonaje(id, 'heading', heading);
}

function dialog() {
    var id = pkg.getDouble();
    var msg = pkg.getString();
    var haveName = pkg.getByte();
    var name = "";

    if (haveName) {
        name = pkg.getString();
    }

    var color = pkg.getString();
    var console = pkg.getByte();

    dialogs[id] = {
        msg: msg,
        color: color,
        life: 0,
        y: 20
    };

    if (console) {
        writeConsole("[" + name + "]  " + htmlEntities(msg), dialogs[id].color, 0, 1);
    }
}

function dataConsole() {
    var msg = pkg.getString();
    var haveColor = pkg.getByte();

    var color = "";
    if (haveColor) {
        color = pkg.getString();
    }

    var bold = pkg.getByte();
    var italic = pkg.getByte();

    writeConsole(msg, color, bold, italic);
}

function pong() {
    engine.ping = +Date.now() - pingStart;
}

function animFX() {
    var id = pkg.getDouble();
    var fxID = pkg.getShort();

    engine.setAttrPersonaje(id, 'fxId', fxID);
}

function inmo() {
    var inmovilizado = pkg.getByte();
    var pos = {
        x: pkg.getByte(),
        y: pkg.getByte()
    };

    user.inmovilizado = inmovilizado;

    engine.inmovilizado(pos);
}

function updateHP() {
    var hp = pkg.getShort();

    user.hp = hp;

    $(".hp .num").text(user.hp + " / " + user.maxHp);
    $(".hp .progress_bar").width(user.hp * hpLength / user.maxHp);
}

function updateMaxHP() {
    var hp = pkg.getShort();
    var maxHp = pkg.getShort();

    user.hp = hp;
    user.maxHp = maxHp;

    $(".hp .num").text(user.hp + " / " + user.maxHp);
}

function updateMana() {
    var mana = pkg.getShort();

    user.mana = mana;
    $(".mana .num").text(formatMiles(user.mana) + " / " + formatMiles(user.maxMana));
    $(".mana .progress_bar").width(user.mana * manaLength / user.maxMana);
}

function updateAgilidad() {
    var agilidad = pkg.getByte();

    $(".agilidad").html(agilidad);
}

function updateFuerza() {
    var fuerza = pkg.getByte();

    $(".fuerza").html(fuerza);
}

function deleteCharacter() {
    var id = pkg.getDouble();

    engine.deletePersonaje(id);
}

function telepMe() {
    var id = pkg.getDouble();

    var numMap = pkg.getShort();

    var pos = {
        x: pkg.getByte(),
        y: pkg.getByte()
    };

    engine.respawnMe(id, numMap, pos.x, pos.y);

    changeMinimap(mapNumber);
    changePositionPointMinimap(pos.x, pos.y);
}

function actOnline() {
    usersOnline = pkg.getShort();
}

function consoleOnline() {
    /*var tmpOnline = "";
        var tmpCount = 0;

        $.each(resData.console, function(index, val) {
            tmpOnline += " " + val.name;
            tmpCount++;

            if (Object.keys(resData.console).length > tmpCount) {
                tmpOnline += ", ";
            }
        });

        writeConsole("Usuarios online: " + tmpOnline);*/
}

function actPositionServer() {
    var pos = {
        x: pkg.getByte(),
        y: pkg.getByte()
    };

    var heading = pkg.getByte();

    engine.actPositionServer(pos, heading);
}

function actExp() {
    var exp = pkg.getDouble();

    user.exp = exp;
    porcentaje = (user.exp * 100 / user.expNextLevel).toFixed(2);

    $(".exp .porcentaje").text(porcentaje + "%");
    $(".exp .num").text(formatMiles(user.exp) + "/" + formatMiles(user.expNextLevel));
    $(".exp .progress_bar").css("width", porcentaje * xpLength / 100);
}

function actMyLevel() {
    var exp = pkg.getDouble();
    var expNextLevel = pkg.getDouble();
    var lvl = pkg.getByte();
    var hp = pkg.getShort();
    var mana = pkg.getShort();

    user.exp = exp;
    user.expNextLevel = expNextLevel;
    user.lvl = lvl;
    user.hp = hp;
    user.maxHp = hp;
    user.maxMana = mana;

    porcentaje = (user.exp * 100 / user.expNextLevel).toFixed(2);

    $(".level").text(user.lvl);
    $(".exp .porcentaje").text(porcentaje + "%");
    $(".exp .num").text(formatMiles(user.exp) + "/" + formatMiles(user.expNextLevel));
    $(".exp .progress_bar").css("width", porcentaje * xpLength / 100);

    $(".mana .num").text(formatMiles(user.mana) + " / " + formatMiles(user.maxMana));
    $(".mana .progress_bar").width(user.mana * manaLength / user.maxMana);
    $(".hp .num").text(user.hp + " / " + user.maxHp);
    $(".hp .progress_bar").width(user.hp * hpLength / user.maxHp);
}

function actGold() {
    var gold = pkg.getInt();

    user.gold = gold;
    $(".gold").text(formatMiles(user.gold));
}

function actColorName() {
    var id = pkg.getDouble();
    var color = pkg.getString();

    engine.setAttrPersonaje(id, 'color', color);
}

function error() {
    alert(pkg.getString());
}

function putBodyAndHeadDead() {
    var id = pkg.getDouble();
    var idHead = pkg.getShort();
    var idHelmet = pkg.getShort();
    var idWeapon = pkg.getShort();
    var idShield = pkg.getShort();
    var idBody = pkg.getShort();

    if (user.id == id) {
        $('.slot_inv .equipped').hide();

        for (var idIndexPos in items) {
            items[idIndexPos].equipped = 0;
        }
    }

    engine.setAttrPersonaje(id, 'idHead', idHead);
    engine.setAttrPersonaje(id, 'idHelmet', idHelmet);
    engine.setAttrPersonaje(id, 'idWeapon', idWeapon);
    engine.setAttrPersonaje(id, 'idShield', idShield);
    engine.setAttrPersonaje(id, 'idBody', idBody);
}

function revivirUsuario() {
    var id = pkg.getDouble();
    var idHead = pkg.getShort();
    var idBody = pkg.getShort();

    engine.setAttrPersonaje(id, 'idHead', idHead);
    engine.setAttrPersonaje(id, 'idBody', idBody);
}

function quitarUserInvItem() {
    var idUSer = pkg.getDouble();
    var idPos = pkg.getByte();
    var cant = pkg.getShort();

    var cantOld = parseInt($($(".slot_inv .amount")[idPos - 1]).html());

    var newCant = cantOld - cant;

    if (newCant <= 0) {
        delete items[idPos];

        $($(".slot_inv .img_item")[idPos - 1]).removeClass('itemNotValid');
        $($(".slot_inv .img_item")[idPos - 1]).css("background-image", "none");
        $($(".slot_inv .amount")[idPos - 1]).html("");
        $($(".slot_inv")[idPos - 1]).data('item', '');
        $($(".slot_inv .img_item")[idPos - 1]).data('item', '');
        $($(".slot_inv .equipped")[idPos - 1]).hide();

        if (user.npcTrade) {
            $($(".slotInventary")[idPos - 1]).children('.imgItem').removeClass('itemNotValid');

            $($(".slotInventary")[idPos - 1]).children('.imgItem').css("background-image", "none");

            $($(".slotInventary")[idPos - 1]).data('idPos', '');
            $($(".slotInventary")[idPos - 1]).data('name', '');
            $($(".slotInventary")[idPos - 1]).data('gold', '');

            $($(".slotInventary")[idPos - 1]).children('.cant').html("");
            $($(".slotInventary")[idPos - 1]).children('.equipped').hide();
        }
    } else {
        $($(".slot_inv .amount")[idPos - 1]).html(newCant);

        items[idPos].cant = newCant;

        if (user.npcTrade) {
            $($(".slotInventary")[idPos - 1]).children('.cant').html(newCant);
        }
    }
}

function renderItem() {
    var idItem = pkg.getInt(),
        idMap = pkg.getShort(),
        posX = pkg.getByte(),
        posY = pkg.getByte();

    mapa[idMap][posY][posX].o = {
        oi: idItem
    };

    engine.updateItems(0, 0);
}

function deleteItem() {
    var idMap = pkg.getShort(),
        posX = pkg.getByte(),
        posY = pkg.getByte();

    delete mapa[idMap][posY][posX].o;

    engine.updateItems(0, 0);
}

function agregarUserInvItem() {
    var idPos = pkg.getByte();

    items[idPos] = {
        idItem: pkg.getInt(),
        nameItem: pkg.getString(),
        equipped: pkg.getByte(),
        grhIndex: pkg.getShort(),
        cant: pkg.getShort(),
        gold: pkg.getInt(),
        objType: pkg.getByte(),
        validUser: pkg.getByte(),
        info: pkg.getString()
    };

    if (!items[idPos].validUser) {
        $($(".slot_inv .img_item")[idPos - 1]).addClass('itemNotValid');
    }

    $($(".slot_inv .img_item")[idPos - 1]).css("background-image", "url('graficos/" + inits.graphics[items[idPos].grhIndex].numFile + ".png')").css("background-size", "32px");
    $($(".slot_inv .amount")[idPos - 1]).html(items[idPos].cant);
    $($(".slot_inv")[idPos - 1]).data('item', idPos);

    if (items[idPos].equipped) {
        $($(".slot_inv .equipped")[idPos - 1]).show();
    }

    if (user.npcTrade) {
        if (!items[idPos].validUser) {
            $($(".slotInventary")[idPos - 1]).children('.imgItem').addClass('itemNotValid');
        }

        $($(".slotInventary")[idPos - 1]).children('.imgItem').css("background-image", "url('graficos/" + inits.graphics[items[idPos].grhIndex].numFile + ".png')").css("background-size", "32px");
        $($(".slotInventary")[idPos - 1]).data('idPos', idPos);

        $($(".slotInventary")[idPos - 1]).data('idPos', idPos);
        $($(".slotInventary")[idPos - 1]).data('name', items[idPos].nameItem);
        $($(".slotInventary")[idPos - 1]).data('gold', items[idPos].gold);

        $($(".slotInventary")[idPos - 1]).children('.cant').html(items[idPos].cant);
        if (items[idPos].equipped) {
            $($(".slotInventary")[idPos - 1]).children('.equipped').show();
        }
    }
}

function blockMap() {
    var idMap = pkg.getShort();
    var posX = pkg.getByte();
    var posY = pkg.getByte();
    var blocked = pkg.getByte();

    mapa[idMap][posY][posX].b = blocked;
}

function changeObjIndex() {
    var idMap = pkg.getShort();
    var posX = pkg.getByte();
    var posY = pkg.getByte();
    var objIndex = pkg.getShort();

    mapa[idMap][posY][posX].o.oi = objIndex;
}

function openTrade() {
    var itemsLength = pkg.getByte();

    user.npcTrade = true;

    $(".slotTrade").data('idPos', '');
    $(".slotTrade").data('name', '');
    $(".slotTrade").data('info', '');
    $(".slotTrade").data('gold', '');
    $(".slotTrade").children(".imgItem").css("background-image", "");
    $(".slotInventary").children(".imgItem").css("background-image", "");
    $(".slotInventary").data('idPos', '');
    $(".slotInventary").data('name', '');
    $(".slotInventary").data('info', '');
    $(".slotInventary").data('gold', '');
    $(".slotInventary").children(".cant").html("");
    $(".slotInventary").children(".equipped").hide();

    $(".slotInventary").removeClass('item_selected');
    $(".slotTrade").removeClass('slotTradeSelected');

    $(".slotTrade .imgItem").removeClass('itemNotValid');
    $(".slotInventary .imgItem").removeClass('itemNotValid');

    $(".cantTrade").val(1);

    for (var i = 0; i < itemsLength; i++) {
        var objIndex = pkg.getShort();
        var name = pkg.getString();
        var cant = pkg.getShort();
        var gold = pkg.getInt();
        var itemValidUser = pkg.getByte();
        var info = pkg.getString();

        if (!itemValidUser) {
            $($(".slotTrade")[i]).children('.imgItem').addClass('itemNotValid');
        }
        $($(".slotTrade")[i]).data('idPos', i);
        $($(".slotTrade")[i]).data('name', name);
        $($(".slotTrade")[i]).data('info', info);
        $($(".slotTrade")[i]).data('gold', parseInt(gold / 2));
        $($(".slotTrade")[i]).children('.imgItem').css("background-image", "url('graficos/" + inits.graphics[objIndex].numFile + ".png')").css("background-size", "32px");
    }

    itemsLength = pkg.getByte();

    for (var I = 0; I < itemsLength; I++) {
        var objIndexItemInv = pkg.getShort();
        var nameItemInv = pkg.getString();
        var cantItemInv = pkg.getShort();
        var goldItemInv = pkg.getInt();
        var equippedItemInv = pkg.getByte();
        var idPos = pkg.getByte();
        var itemValidUserItemInv = pkg.getByte();
        var infoItemInv = pkg.getString();

        if (!itemValidUserItemInv) {
            $($(".slotInventary")[idPos - 1]).children('.imgItem').addClass('itemNotValid');
        }

        $($(".slotInventary")[idPos - 1]).children('.imgItem').css("background-image", "url('graficos/" + inits.graphics[objIndexItemInv].numFile + ".png')").css("background-size", "32px");

        $($(".slotInventary")[idPos - 1]).data('idPos', idPos);
        $($(".slotInventary")[idPos - 1]).data('name', nameItemInv);
        $($(".slotInventary")[idPos - 1]).data('info', infoItemInv);
        $($(".slotInventary")[idPos - 1]).data('gold', goldItemInv);

        $($(".slotInventary")[idPos - 1]).children('.cant').html(cantItemInv);
        if (equippedItemInv) {
            $($(".slotInventary")[idPos - 1]).children('.equipped').show();
        }
    }


    var outer = $(".outer");
    $(".modalTrade").offset({top: (outer.height() / 2) - 207.5, left: (outer.width() / 2) - 233.5});
    $(".modalTrade").show();
}

function aprenderSpell() {
    idPos = pkg.getByte();

    spells[idPos] = {
        idSpell: pkg.getShort(),
        name: pkg.getString(),
        manaRequired: pkg.getShort()
    };

    renderSpells();
}

function closeForce() {
    varCloseForce = true;
}

function nameMap() {
    var name = pkg.getString();

    $(".name_map").html(name);
}

function changeBody() {
    var id = pkg.getDouble();

    engine.setAttrPersonaje(id, 'idHead', pkg.getShort());
    engine.setAttrPersonaje(id, 'idBody', pkg.getShort());
    engine.setAttrPersonaje(id, 'idHelmet', pkg.getShort());
    engine.setAttrPersonaje(id, 'idWeapon', pkg.getShort());
    engine.setAttrPersonaje(id, 'idShield', pkg.getShort());
}

function navegando() {
    user.navegando = pkg.getByte();
}