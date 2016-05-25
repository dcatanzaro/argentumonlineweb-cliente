$("#mouseEvent").ready(function() {
    /*$("#mouseEvent").oncontextmenu = function() {
        return false;
    };*/

    $('#mouseEvent').on('contextmenu', function(e) {
        e.stopPropagation();
        return false;
    });

    $("#mouseEvent").mousedown(function(e) {
        if (e.button == 2) {
            var xCanvas;
            var yCanvas;

            if (!event.offsetX) {
                xCanvas = event.pageX - $('#mouseEvent').offset().left;
                yCanvas = event.pageY - $('#mouseEvent').offset().top;
            } else {
                xCanvas = event.offsetX;
                yCanvas = event.offsetY;
            }

            var posX = Math.round(user.pos.x + xCanvas / 32 - $('#mouseEvent').width() / 64);
            var posY = Math.round(user.pos.y + yCanvas / 32 - $('#mouseEvent').height() / 64);

            general.sendDialog('/telepme ' + mapNumber + "@" + posX + "@" + posY);
        }
        return true;
    });
});

function dumpError(err) {
    if (typeof err === 'object') {
        if (err.message) {
            console.log('\nMessage: ' + err.message);
        }
        if (err.stack) {
            console.log('\nStacktrace:');
            console.log('====================');
            console.log(err.stack);
        }
    } else {
        console.log('dumpError :: argument is not an object');
    }
}

function jsonEncode(data) {
    return JSON.stringify(data);
}

function jsonDecode(data) {
    return JSON.parse(data);
}

function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getRanking(page) {

}

function mostrarInventario() {
    $('.body .spell').css('display', 'none');
    $('.body .inventary').css('display', 'block');
    $(".button_inv").css('background-image', "url('')");
    $(".button_spell").css('background-image', "url('assets/imgs/invyhechi.png')");
}

function mostrarSpells() {
    $('.body .spell').css('display', 'block');
    $('.body .inventary').css('display', 'none');
    $(".button_inv").css('background-image', "url('assets/imgs/invyhechi.png')");
    $(".button_spell").css('background-image', "url('')");
}

function formatMiles(num) {
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    return num.split('').reverse().join('').replace(/^[\.]/,'');
}

function clickCanvas(event) {
    var xCanvas;
    var yCanvas;

    if (!event.offsetX) {
        xCanvas = event.pageX - $('#mouseEvent').offset().left;
        yCanvas = event.pageY - $('#mouseEvent').offset().top;
    } else {
        xCanvas = event.offsetX;
        yCanvas = event.offsetY;
    }

    var posX = Math.round(user.pos.x + xCanvas / 32 - $('#mouseEvent').width() / 64);
    var posY = Math.round(user.pos.y + yCanvas / 32 - $('#mouseEvent').height() / 64);

    engine.clickCanvas({x: posX, y: posY});
}

$(".info_map").hover(function() {
    $(".name_map").hide();
    $(".pos_map").show();
}, function() {
    $(".pos_map").hide();
    $(".name_map").show();
});

function actCoordUser() {
    $(".pos_map").html("Mapa: " + mapNumber + " X: " + user.pos.x + " Y: " + user.pos.y);
}

function changeMinimap(numMap) {
    $(".minimap").css("background-image", "url('../assets/imgs_mapas/" + numMap + ".png')");
}

function changePositionPointMinimap(x, y) {
    $(".point_minimap").css({
        top: (y - 1) + 'px',
        left: (x - 1) + 'px'
    });
}