var versionConnection = 108;

var ws;

window.onbeforeunload = function() {
    ws.onclose = function() {};
    ws.close();
};

function startWebSocket() {
    if (debug) {
        ws = new WebSocket(LOCAL_SERVER_ENDPOINT);
    } else {
        ws = new WebSocket(PROD_SERVER_ENDPOINT);
    }

    ws.binaryType = 'arraybuffer';

    ws.onopen = function() {
        try {
            $(".modalReconnect").offset({top: 0, left: 0});
            $(".modalReconnect").hide();

            console.log("Conecto Web Socket");
            game.connectCharacter();

            setInterval(function() {
                if (user.id) {
                    pingStart = +Date.now();

                    pkg.setPackageID(pkg.serverPacketID.ping);
                    ws.send(pkg.dataSend());
                }
            }, 10000);
        } catch (err) {
            dumpError(err);
        }
    };

    ws.onclose = function() {
        try {
            engine.deleteAllPersonajes();
            usersOnline = 0;
            dialogs = {};
            user.id = 0;
            user.pos.x = 0;
            user.pos.y = 0;
            engine.ping = 0;
            items = {};
            spells = {};
            seguroActivado = true;

            $(".slot_inv .img_item").removeClass('itemNotValid');
            $(".slot_inv .img_item").css("background-image", "none");
            $(".slot_inv .amount").html("");
            $(".slot_inv").data('item', '');
            $(".slot_inv .img_item").data('item', '');
            $(".slot_inv .equipped").hide();

            $(".slot_spell .img_spell").css("background-image", "");
            $(".slot_spell").data('spell', '');

            $("#console").html("");

            engine.clearRender('items');
            engine.clearRender('background');
            engine.clearRender('techos');
            engine.clearRender('foreground');
            //engine.clearRender('characters');
            engine.clearRender('textos');

            if (!varCloseForce) {
                showReconnect();

                setTimeout(function() {
                    if (debug) {
                        startWebSocket();
                    } else {
                        startWebSocket();
                    }
                }, 5000);
            }
        } catch (err) {
            dumpError(err);
        }
    };

    ws.onerror = function(err) {
        console.log('WebSocket Error ' + err);
    };

    ws.onmessage = connectionMessages;
}

function cleanMap() {
    for (numMap = 1; numMap <= 290; numMap++) {
        engine.cleanMapData(numMap);
    }

    console.log("borro todo");
}