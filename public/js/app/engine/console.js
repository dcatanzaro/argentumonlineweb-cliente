var versionConsole = 103;

actualizarMacros();

//overlay();

$.fn.slider = function() {
    return this.each(function() {
        var $el = $(this);

        var dragging = false;
        var startX = 0;
        var startT = 0;

        $el.mousedown(function(ev) {
            dragging = true;
            startX = ev.clientX;
            startT = volume * 304;
        });


        $(window).mousemove(function(ev) {
            if (dragging) {
                var left = parseInt(startT) + (ev.clientX - startX);

                if (left <= 304 && left >= 0) {
                    $el.css('left', left);
                }

                volume = left / 304;

                if (volume > 1) {
                    volume = 1;
                } else if (volume < 0) {
                    volume = 0;
                }

                localStorage.setItem('volume', volume);

                $("#spellSound").prop("volume", volume);
            }
        }).mouseup(function() {
            dragging = false;
        });
    });
};

document.onkeydown = function(e) {
    e = e || window.event; //Get event
    if (e.ctrlKey) {
        var c = e.which || e.keyCode; //Get key code
        switch (c) {
            case 83: //Block Ctrl+S
            case 68: //Block Ctrl+D
            case 85: //Block Ctrl+U
            case 87: //Block Ctrl+W --Not work in Chrome
                e.preventDefault();
                e.stopPropagation();
                break;
        }
    }
};

$("body").keyup(function(event) {
    if (event.keyCode == 13) {
        if ($("#text").css("display") == "block") {
            var dialogo = $("#text").val();
            general.sendDialog($("#text").val());

            $("#console").scrollTop($("#console").prop("scrollHeight"));
            $("#text").val("");
            $("#text").css("display", "none");
        } else {
            $("#text").css("display", "block");
            $("#text").focus();
        }
    }
    if (event.keyCode == 77 && !$("#text:visible").length) {
        general.sendDialog('/meditar');
    }

    if (event.keyCode == keyCodeDefault[nameKeyCode.seguro] && !$("#text:visible").length) {
        if (seguroActivado) {
            seguroActivado = false;
        } else {
            seguroActivado = true;
        }

        pkg.setPackageID(pkg.serverPacketID.changeSeguro);
        ws.send(pkg.dataSend());
    }
});

$(".mana").click(function(event) {
    general.sendDialog('/meditar');
});

$(".openConsole").click(function(event) {
    if ($("#console").css("display") == "block") {
        $("#console").css("display", "none");
    } else {
        $("#console").css("display", "block");
        $("#console").scrollTop($("#console").prop("scrollHeight"));
    }
});


$("#feedback").click(function(event) {
    if (feedBackButtonOpen) {
        $(".modalFeedBack").hide();
        feedBackButtonOpen = false;
    } else {
        $(".modalFeedBack").show();
        feedBackButtonOpen = true;
    }
});

$(".enviarFeedBack").click(function(event) {
    var textArea = $("#textAreaFeedBack").val();

    textArea = textArea.trim();

    if (!textArea) {
        alert("No puedes enviar un reporte vacio.");
        return;
    }

    alert("Reporte enviado. ¡Muchas gracias!");

    $(".modalFeedBack").hide();
    feedBackButtonOpen = false;
    $("#textAreaFeedBack").val("");
});

$(".closeTextArea").click(function(event) {
    $(".modalFeedBack").hide();
    feedBackButtonOpen = false;
    $("#textAreaFeedBack").val("");
});

$(".closeTrade").click(function(event) {
    $(".modalTrade").offset({
        top: 0,
        left: 0
    });
    $(".modalTrade").hide();
});

$('.soundButton').slider();

var consoleMain = document.getElementById("console");
consoleMain.scrollTop = consoleMain.scrollHeight;

actualizarKeys();

function actualizarKeys() {
    $(".modalControlPanel :input").each(function(index, el) {

        var keyCode;
        if (localStorage.getItem("Tecla" + index)) {
            keyCode = localStorage.getItem("Tecla" + index);
            keyCodeDefault[index] = keyCode;
        } else {
            keyCode = keyCodeDefault[index];
        }

        var fromChar = String.fromCharCode(keyCode);

        if (keyCodeMap[keyCode]) {
            fromChar = keyCodeMap[keyCode];
        }

        $($(".modalControlPanel :input")[index]).val(fromChar);
    });
}

$(".modalControlPanel :input").keyup(function(event) {
    var keyCode = event.keyCode;
    var fromChar = String.fromCharCode(keyCode);

    if (keyCodeMap[keyCode]) {
        fromChar = keyCodeMap[keyCode];
    }

    if (keyCodeDefault.indexOf(keyCode) != -1 || teclasMacros.indexOf(keyCode) != -1) {
        $(this).val(keyCodeMap[keyCodeDefault[$(this).index()]]);
        alert("La tecla ya está asignada");
        return;
    }

    var index = $(this).index();

    $(this).val(fromChar);
    keysTemp[$(".modalControlPanel :input").index($(this))] = keyCode;
    keyCodeDefault[index] = keyCode;
    localStorage.setItem("Tecla" + index, keyCode);
});

$(".default_teclas").click(function(event) {
    keyCodeDefault = keyCodeDefaultReset;

    for (var i = 0; i <= 11; i++) {
        localStorage.setItem("Tecla" + i, '');
    }

    actualizarKeys();
});

$(".save_cambios").click(function(event) {
    $(".modalControlPanel div :input").each(function(index, el) {

        if (keysTemp[index]) {
            keyCodeDefault[index] = keysTemp[index];
            localStorage.setItem("Tecla" + index, keysTemp[index]);
        }

    });

    alert("Cambios guardados");
});

$(".closeControlPanel").click(function(event) {
    $(".modalControlPanel").offset({
        top: 0,
        left: 0
    });
    $(".modalControlPanel").hide();
});

$(".configuration").click(function(event) {
    actualizarKeys();
    localStorage.setItem('seeConfig', 1);
    var outer = $(".outer");
    $(".modalControlPanel").offset({
        top: (outer.height() / 2) - 254.5,
        left: (outer.width() / 2) - 291.5
    });
    $(".modalControlPanel").show();
});

function showReconnect() {
    cleanMap();
    var outer = $(".outer");
    $(".modalReconnect").offset({
        top: (outer.height() / 2) - 44.5,
        left: (outer.width() / 2) - 74
    });
    $(".modalReconnect").show();
}

window.addEventListener("keydown", function(e) {
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1 || ((!$("#text:visible").length && e.keyCode == 32) && (!$(".modalFeedBack:visible").length && e.keyCode == 32))) {
        e.preventDefault();
    }
}, false);

if (localStorage.getItem('volume')) {
    volume = localStorage.getItem('volume');
}

$('.soundButton').css("left", (304 * volume) + "px");
$("#spellSound").prop("volume", volume);

$(".macro").bind("contextmenu", function(e) {
    selectedMacro = $(this);

    itemSelectedMacro = "";
    spellSelectedMacro = "";
    keySelectedMacro = "";
    fromCharSelectedMacro = "";
    $("#keyMacro").val('');
    $(".modalMacro .img .spell").css('background-image', 'none');
    $(".modalMacro .img .item").css('background-image', 'none');

    var offsetMacro = $(this).offset();

    $(".modalMacro").offset({
        top: offsetMacro.top - 210,
        left: offsetMacro.left - 57
    });

    $(".modalMacro").show();
    return false;
});

/*$(function() {
    $(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });
});*/

$(".macro").click(function(event) {
    var type = $(this).data('type');

    if (type == 1) {
        var spell = $(this).children('.spell').data('spell');
        hechizoSelected = spell;
        $("#mouseEvent").css("cursor", "crosshair");
        writeConsole("Haz click sobre el objetivo...", "gray");
    } else if (type == 2) {
        var item = $(this).children('.item').data('item');

        if (clickUse > 1 && lastClickIdItem == item) {
            clickUse = 0;
            game.useItem(item);
        }

        clickUse++;

        lastClickIdItem = item;
    }
});

$(".reset_macros").click(function(event) {
    teclasMacros = [];

    for (var i = 0; i <= 5; i++) {
        localStorage.setItem('macro' + i, '');

        var nMacro = $($(".macro")[i]);

        nMacro.children('.spell').css('background-image', '').hide();
        nMacro.data('type', '');
        nMacro.children('.spell').data('spell', '');
        nMacro.children('.item').css('background-image', '').hide();
        nMacro.data('type', '');
        nMacro.children('.item').data('item', '');
        nMacro.children('.key').html('');
    }
});

function resetMacro(index) {
    var nMacro = $($(".macro")[index]);

    nMacro.children('.spell').css('background-image', '').hide();
    nMacro.data('type', '');
    nMacro.children('.spell').data('spell', '');
    nMacro.children('.item').css('background-image', '').hide();
    nMacro.data('type', '');
    nMacro.children('.item').data('item', '');
    nMacro.children('.key').html('');
}

$(".guardarMacro").click(function(event) {
    if (!keySelectedMacro) {
        alert("Debes seleccionar una tecla.");
        return;
    } else if ($(".modalMacro .img .spell").css('background-image') == "none" && $(".modalMacro .img .item").css('background-image') == "none") {
        alert("Debes seleccionar un item o un hechizo.");
        return;
    }

    resetMacro(selectedMacro.index());

    var macro = {
        type: 0,
        item: 0,
        spell: 0,
        image: '',
        key: 0,
        nameKey: ''
    };

    var imageMacro;

    if ($(".modalMacro .img .spell").css('background-image') != "none") {
        imageMacro = $(".modalMacro .img .spell").css('background-image');
        macro.type = 1;
        macro.image = imageMacro;
        macro.spell = spellSelectedMacro;
    } else if ($(".modalMacro .img .item").css('background-image') != "none") {
        imageMacro = $(".modalMacro .img .item").css('background-image');
        macro.type = 2;
        macro.image = imageMacro;
        macro.item = itemSelectedMacro;
    }

    macro.key = keySelectedMacro;
    macro.nameKey = $("#keyMacro").val();

    localStorage.setItem('macro' + selectedMacro.index(), JSON.stringify(macro));

    $(".modalMacro").offset({
        top: 0,
        left: 0
    });
    $(".modalMacro").hide();

    actualizarMacros();
});

$("#keyMacro").keyup(function(event) {

    if (keyCodeDefault.indexOf(event.keyCode) != -1) {
        $(this).val('');
        alert("La tecla ya está asignada");
    } else {
        var keyCode = event.keyCode;
        keySelectedMacro = keyCode;

        var fromChar = String.fromCharCode(keyCode);

        if (keyCodeMap[keyCode]) {
            fromChar = keyCodeMap[keyCode];
        }

        $(this).val(fromChar);
    }
});

$("body").keyup(function(event) {
    if (arMacros[event.keyCode] && !$("#text:visible").length && !$(".modalFeedBack:visible").length) {
        var macro = arMacros[event.keyCode];

        if (macro.type == 1) {
            var spell = macro.spell;
            hechizoSelected = spell;
            $("#mouseEvent").css("cursor", "crosshair");
            writeConsole("Haz click sobre el objetivo...", "gray");
        } else if (macro.type == 2) {
            var item = macro.item;

            game.useItem(item);
        }
    }
});

$(".closeMacro").click(function(event) {
    $(".modalMacro").offset({
        top: 0,
        left: 0
    });
    $(".modalMacro").hide();
});

function actualizarMacros() {
    teclasMacros = [];
    arMacros = {};

    for (var i = 0; i <= 5; i++) {
        if (localStorage.getItem('macro' + i)) {
            var macro = JSON.parse(localStorage.getItem('macro' + i));
            arMacros[macro.key] = macro;

            var nMacro = $($(".macro")[i]);

            if (macro.type == 1) {
                nMacro.children('.spell').css('background-image', macro.image).show();
                nMacro.data('type', '1');
                nMacro.children('.spell').data('spell', macro.spell);
            } else if (macro.type == 2) {
                nMacro.children('.item').css('background-image', macro.image).show();
                nMacro.data('type', '2');
                nMacro.children('.item').data('item', macro.item);
            }

            teclasMacros.push(macro.key);
            nMacro.children('.key').html(macro.nameKey);
        }
    }
}

$(".exp").hover(function() {
    $(".exp .porcentaje").hide();
    $('.exp .num').show();
}, function() {
    $('.exp .num').hide();
    $(".exp .porcentaje").show();
});

var delay = 1000,
    setTimeoutConst;

$(".open_map").click(function(event) {
    var outer = $(".outer");

    $(".modalMapa").offset({
        top: (outer.height() / 2) - 360,
        left: (outer.width() / 2) - 255
    });

    $(".modalMapa").show();

    var mapTile = $("#map_" + mapNumber).offset();

    $(".mark").offset({
        top: mapTile.top + 11,
        left: mapTile.left + 11
    });
});

$(".close_map").click(function(event) {
    $(".mark").offset({
        top: 0,
        left: 0
    });

    $(".modalMapa").offset({
        top: 0,
        left: 0
    });

    $(".modalMapa").hide();
});