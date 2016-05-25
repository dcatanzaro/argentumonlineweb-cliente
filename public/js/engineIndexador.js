var loader = "";
var canvasBackground = "";

$(document).ready(function() {
    canvasBackground = document.getElementById('background').getContext('2d');

    loader = new PxLoader();

    loader.addCompletionListener(function(e) {
        engine.loop();
    });
});

var inits = new function() {
    this.graphics = {};
    this.heads = {};
    this.bodies = {};
    this.fxs = {};
    this.armas = {};

    this.loadGraphics = function() {
        $.get('../../init/graficos.json', function(data) {
            inits.graphics = JSON.parse(data);

            $.each(inits.graphics, function(index, grafico) {
                inits.graphics[index].offset.x = parseInt(inits.graphics[index].offset.x);
                inits.graphics[index].offset.y = parseInt(inits.graphics[index].offset.y);
                inits.graphics[index].numFrames = parseInt(inits.graphics[index].numFrames);
                inits.graphics[index].sX = parseInt(inits.graphics[index].sX);
                inits.graphics[index].sY = parseInt(inits.graphics[index].sY);
                inits.graphics[index].width = parseInt(inits.graphics[index].width);
                inits.graphics[index].height = parseInt(inits.graphics[index].height);

                if (grafico.imagen) {
                    inits.graphics[index].imagen = loader.addImage('../graphics/' + inits.graphics[index].numFile + '.png');
                }
            });

            loader.start();
        });
    };

    this.loadHeads = function(callback) {
        var count = 0;
        var headId = 0;

        $.get('../../init/heads.json', function(data) {
            inits.heads = JSON.parse(data);

            callback(true);
        });
    };

    this.loadBodies = function(callback) {
        var count = 0;
        var headId = 0;

        $.get('../../init/bodies.json', function(data) {
            inits.bodies = JSON.parse(data);

            callback(true);
        });
    };

    this.loadArmas = function(callback) {
        var count = 0;
        var headId = 0;

        $.get('../../init/armas.json', function(data) {
            inits.armas = JSON.parse(data);

            callback(true);
        });
    };

    this.loadFxs = function(callback) {
        var count = 0;
        var headId = 0;

        $.get('../../init/fxs.json', function(data) {
            inits.fxs = JSON.parse(data);

            callback(true);
        });
    };
}();

var engine = new Engine();

function Engine() {
    var engineBaseSpeed = 0.014;

    var delta = 0;
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

    this.loop = function() {
        try {
            delta = performance.now() - lastDelta;
            lastDelta = performance.now();

            renderBody();

            requestAnimationFrame(engine.loop);
        } catch (err) {
            dumpError(err);
        }
    };

    function renderBody() {
        clearRenderBackground();

        var graphicCurrentGrhHead = inits.graphics[13103];
        var graphicsCurrentGrhBody = inits.graphics[$("#grhSelected").val()];

        var yHead = 3;
        var yBody = 10;

        //canvasBackground.drawImage(graphicCurrentGrhHead.imagen, graphicCurrentGrhHead.sX, graphicCurrentGrhHead.sY, graphicCurrentGrhHead.width, graphicCurrentGrhHead.height, (100 - graphicCurrentGrhHead.width) / 2, ((100 - graphicCurrentGrhHead.height) / 2) + yHead, graphicCurrentGrhHead.width, graphicCurrentGrhHead.height);

        count = 0;

        $.each(inits.graphics[inits.bodies[1][1]].frames, function(index, grh) {
            var graphicCurrentGrh = inits.graphics[grh];

            canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, 20 + (count * 40), 30, graphicCurrentGrh.width, graphicCurrentGrh.height);

            count++;
        });

        count = 0;

        $.each(inits.graphics[inits.bodies[1][2]].frames, function(index, grh) {
            var graphicCurrentGrh = inits.graphics[grh];

            canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, 20 + (count * 40), 130, graphicCurrentGrh.width, graphicCurrentGrh.height);

            count++;
        });

        count = 0;

        $.each(inits.graphics[inits.bodies[1][3]].frames, function(index, grh) {
            var graphicCurrentGrh = inits.graphics[grh];

            canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, 20 + (count * 40), 230, graphicCurrentGrh.width, graphicCurrentGrh.height);

            count++;
        });

        count = 0;

        $.each(inits.graphics[inits.bodies[1][4]].frames, function(index, grh) {
            var graphicCurrentGrh = inits.graphics[grh];

            canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, 20 + (count * 40), 330, graphicCurrentGrh.width, graphicCurrentGrh.height);

            count++;
        });




        /*if ($("#grh").val()) {

            count = 0;

            $.each(inits.graphics[inits.bodies[$("#grh").val()][1]].frames, function(index, grh) {
                var graphicCurrentGrh = inits.graphics[grh];

                canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, 20 + (count * 40), 30, graphicCurrentGrh.width, graphicCurrentGrh.height);

                count++;
            });

            count = 0;

            $.each(inits.graphics[inits.bodies[$("#grh").val()][2]].frames, function(index, grh) {
                var graphicCurrentGrh = inits.graphics[grh];

                canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, 20 + (count * 40), 130, graphicCurrentGrh.width, graphicCurrentGrh.height);

                count++;
            });

            count = 0;

            $.each(inits.graphics[inits.bodies[$("#grh").val()][3]].frames, function(index, grh) {
                var graphicCurrentGrh = inits.graphics[grh];

                canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, 20 + (count * 40), 230, graphicCurrentGrh.width, graphicCurrentGrh.height);

                count++;
            });

            count = 0;

            $.each(inits.graphics[inits.bodies[$("#grh").val()][4]].frames, function(index, grh) {
                var graphicCurrentGrh = inits.graphics[grh];

                canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, 20 + (count * 40), 330, graphicCurrentGrh.width, graphicCurrentGrh.height);

                count++;
            });

        }*/

        if ($("#grh").val()) {

            canvasBackground.strokeStyle = "red";

            count = 0;

            $.each(inits.graphics[inits.armas[$("#grh").val()][1]].frames, function(index, grh) {
                var graphicCurrentGrh = inits.graphics[grh];

                canvasBackground.strokeRect((20.5 + (count * 40)) + graphicCurrentGrh.offset.x, 30.5 + graphicCurrentGrh.offset.y, graphicCurrentGrh.width, graphicCurrentGrh.height);
                canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, (20 + (count * 40)) + graphicCurrentGrh.offset.x, 30 + graphicCurrentGrh.offset.y, graphicCurrentGrh.width, graphicCurrentGrh.height);

                count++;
            });

            count = 0;

            $.each(inits.graphics[inits.armas[$("#grh").val()][2]].frames, function(index, grh) {
                var graphicCurrentGrh = inits.graphics[grh];

                canvasBackground.strokeRect((20.5 + (count * 40)) + graphicCurrentGrh.offset.x, 130.5 + graphicCurrentGrh.offset.y, graphicCurrentGrh.width, graphicCurrentGrh.height);
                canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, (20 + (count * 40)) + graphicCurrentGrh.offset.x, 130 + graphicCurrentGrh.offset.y, graphicCurrentGrh.width, graphicCurrentGrh.height);

                count++;
            });

            count = 0;

            $.each(inits.graphics[inits.armas[$("#grh").val()][3]].frames, function(index, grh) {
                var graphicCurrentGrh = inits.graphics[grh];

                canvasBackground.strokeRect((20.5 + (count * 40)) + graphicCurrentGrh.offset.x, 230.5 + graphicCurrentGrh.offset.y, graphicCurrentGrh.width, graphicCurrentGrh.height);
                canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, (20 + (count * 40)) + graphicCurrentGrh.offset.x, 230 + graphicCurrentGrh.offset.y, graphicCurrentGrh.width, graphicCurrentGrh.height);

                count++;
            });

            count = 0;

            $.each(inits.graphics[inits.armas[$("#grh").val()][4]].frames, function(index, grh) {
                var graphicCurrentGrh = inits.graphics[grh];

                canvasBackground.strokeRect((20.5 + (count * 40)) + graphicCurrentGrh.offset.x, 330.5 + graphicCurrentGrh.offset.y, graphicCurrentGrh.width, graphicCurrentGrh.height);
                canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, graphicCurrentGrh.width, graphicCurrentGrh.height, (20 + (count * 40)) + graphicCurrentGrh.offset.x, 330 + graphicCurrentGrh.offset.y, graphicCurrentGrh.width, graphicCurrentGrh.height);

                count++;
            });

        }
    }

    function clearRenderBackground() {
        canvasBackground.clearRect(0, 0, 300, 400);
    }

    var posYDescClient = 0;
    var sumPosY = 0;
    var lifeDescClient = 0;
    var timeMoveDescClient = 0;

    function drawGrh(grh, x, y, alpha) {
        try {
            if (grh.imagen) {
                if (alpha) {
                    canvasBackground.globalAlpha = 0.5;
                }
                canvasBackground.drawImage(grh.imagen, grh.sX, grh.sY, grh.width, grh.height, x, y, grh.width, grh.height);
                if (alpha) {
                    canvasBackground.globalAlpha = 1;
                }
            }
        } catch (err) {
            dumpError(err);
        }
    }

    function drawGrhBackground(grh, x, y, alpha) {
        try {
            if (grh.imagen) {
                if (alpha) {
                    canvasBackground.globalAlpha = 0.5;
                }
                canvasBackground.drawImage(grh.imagen, grh.sX, grh.sY, grh.width, grh.height, x, y, grh.width, grh.height);
                if (alpha) {
                    canvasBackground.globalAlpha = 1;
                }
            }
        } catch (err) {
            dumpError(err);
        }
    }

    function charRender(personaje, pixelOffsetX, pixelOffsetY) {
        try {
            drawFx(personaje, pixelOffsetX, pixelOffsetY, true);
        } catch (err) {
            dumpError(err);
        }
    }

    var xBody = 4;
    var yBody = 25;
    var xHead = 8;
    var yHead = 34;

    function drawChar(personaje, sX, sY) {
        try {

            var nameLength = personaje.nameCharacter.length * 3.5;

            if (delta) {
                var grh = inits.bodies[personaje.idBodyNaked][personaje.heading];
                var grhCabeza = inits.heads[personaje.idHead][personaje.heading];

                var grhRopa = "";
                if (personaje.idBody) {
                    grhRopa = inits.bodies[personaje.inv[personaje.idBody].idAnimationItem][personaje.heading];
                }

                var grhCasco = "";
                if (personaje.idHelmet) {
                    grhCasco = inits.heads[personaje.idHelmet][personaje.heading];
                }

                if (personaje.idWeapon) {
                    var grhArma = inits.armas[personaje.inv[personaje.idWeapon].idAnimationItem][personaje.heading];
                    var OffsetX = inits.armas[personaje.inv[personaje.idWeapon].idAnimationItem][5];
                    var OffsetY = inits.armas[personaje.inv[personaje.idWeapon].idAnimationItem][6];
                }


                var OffsetXHead = inits.heads[personaje.idHead][5];
                var OffsetYHead = inits.heads[personaje.idHead][6];

                if (grhCasco) {
                    var OffsetXCasco = inits.heads[personaje.idHelmet][5];
                    var OffsetYCasco = inits.heads[personaje.idHelmet][6];
                }

                if (personaje.moving) {
                    personaje.frameCounter = personaje.frameCounter + (delta * 1 / inits.graphics[grh].speed);

                    if (personaje.frameCounter < 1) {
                        personaje.frameCounter = 1;
                    }

                    if (personaje.frameCounter > inits.graphics[grh].numFrames) {
                        personaje.frameCounter = 1;
                    }
                }

                if (grh) {

                    if (personaje.frameCounter > 0 && Math.floor(personaje.frameCounter) < inits.graphics[grh].numFrames) {

                        var CurrentGrhIndex = inits.graphics[grh].frames[Math.floor(personaje.frameCounter)];

                        var graphicsGrhRopa = "";

                        if (grhRopa) {
                            var CurrentGrhRopa = inits.graphics[grhRopa].frames[Math.floor(personaje.frameCounter)];
                            graphicsGrhRopa = inits.graphics[CurrentGrhRopa];
                        }

                        var graphicCurrentGrh = inits.graphics[CurrentGrhIndex];
                        var graphicGrhHead = inits.graphics[grhCabeza];

                        var graphicGrhCasco = "";
                        if (grhCasco) {
                            graphicGrhCasco = inits.graphics[grhCasco];
                        }



                        if (personaje.idWeapon) {
                            var CurrentGrhArma = inits.graphics[grhArma].frames[Math.floor(personaje.frameCounter)];
                            var graphicsGrhArma = inits.graphics[CurrentGrhArma];
                            var widthArma = graphicsGrhArma.width;
                            var heightArma = graphicsGrhArma.height;
                        }

                        var width = graphicCurrentGrh.width;
                        var height = graphicCurrentGrh.height;

                        var widtHead = graphicGrhHead.width;
                        var heightHead = graphicGrhHead.height;

                        if (graphicsGrhRopa) {
                            var widthRopa = graphicsGrhRopa.width;
                            var heightRopa = graphicsGrhRopa.height;
                        }

                        if (graphicGrhCasco) {
                            var widthCasco = graphicGrhCasco.width;
                            var heightCasco = graphicGrhCasco.height
                        }

                        canvasBackground.drawImage(graphicGrhHead.imagen, graphicGrhHead.sX, graphicGrhHead.sY, widtHead, heightHead, sX + OffsetXHead, sY - OffsetYHead, widtHead, heightHead);

                        if (graphicGrhCasco) {
                            canvasBackground.drawImage(graphicGrhCasco.imagen, graphicGrhCasco.sX, graphicGrhCasco.sY, widthCasco, heightCasco, sX + OffsetXCasco, sY - OffsetYCasco, widthCasco, heightCasco);
                        }

                        canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, width, height, sX + xBody, sY - yBody, width, height);

                        if (graphicsGrhRopa) {
                            canvasBackground.drawImage(graphicsGrhRopa.imagen, graphicsGrhRopa.sX, graphicsGrhRopa.sY, widthRopa, heightRopa, sX + xBody, sY - yBody, widthRopa, heightRopa);
                        }

                        if (graphicsGrhArma) {
                            canvasBackground.drawImage(graphicsGrhArma.imagen, graphicsGrhArma.sX, graphicsGrhArma.sY, widthArma, heightArma, sX + xBody, sY - yBody, widthArma, heightArma);
                        }

                        nameX = sX - nameLength + 16;

                        renderText(personaje.nameCharacter, nameX, sY + 30, personaje.color, true, 15, "Tahoma");

                        if (personaje.clan) {
                            var clanLength = personaje.clan.length * 4;
                            clanX = sX - clanLength + 16;

                            renderText(personaje.clan, clanX, sY + 50, personaje.color, true, 15, "Tahoma");
                        }
                        if (personaje.rango) {
                            renderRango(personaje.rango, nameX - 15, sY + 18);
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

                            renderDialog(personaje.id, dialogX, sY - 40, dialogs[personaje.id].color, true, 14, "Tahoma");

                        }
                    }

                }
            }
        } catch (err) {
            dumpError(err);
        }
    }

    var frameFxCounter = 0;

    function drawFx(personaje, sX, sY, alpha) {
        try {
            if (delta) {
                var grh = $("#anim").val();

                frameFxCounter += (delta * 1 / inits.graphics[grh].speed);
                /*if (frameFxCounter < 1) {
                    frameFxCounter = 1;
                }*/

                if (frameFxCounter > inits.graphics[grh].numFrames) {
                    frameFxCounter = 0;
                    //canvasBackground.clearRect(0, 0, 500, 500);
                }

                if (frameFxCounter > 0 && frameFxCounter < inits.graphics[grh].numFrames) {

                    var CurrentGrhIndex = inits.graphics[grh].frames[Math.ceil(frameFxCounter)];
                    $("#grhActual").val(CurrentGrhIndex);

                    var graphicCurrentGrh = inits.graphics[CurrentGrhIndex];


                    var width = graphicCurrentGrh.width;
                    var height = graphicCurrentGrh.height;

                    if (alpha) {
                        canvasBackground.globalAlpha = 0.6;
                    }

                    canvasBackground.drawImage(graphicCurrentGrh.imagen, graphicCurrentGrh.sX, graphicCurrentGrh.sY, width, height, sX, sY, width, height);

                    if (alpha) {
                        canvasBackground.globalAlpha = 1;
                    }
                }
            }
        } catch (err) {
            dumpError(err);
        }
    }
}

function listJSON(json, numStart, nameFile) {

    var newJson = {};
    var startStatic = numStart;

    $.each(JSON.parse(json), function(index, val) {
        if (val['numFile']) {
            val['numFile'] = nameFile;
        }

        if (parseInt(val['numFrames']) === 1) {
            val['frames'][1] = numStart;
        } else if (parseInt(val['numFrames']) > 1) {
            var framesTemp = {};

            $.each(val['frames'], function(index, val) {
                framesTemp[index] = startStatic;
                startStatic++;
            });

            val['frames'] = framesTemp;
        }

        newJson[numStart] = val;
        numStart++;
    });

    return JSON.stringify(newJson);
}

function dumpError(err) {
    if (typeof err === 'object') {
        if (err.message) {
            console.log('\nMessage: ' + err.message)
        }
        if (err.stack) {
            console.log('\nStacktrace:')
            console.log('====================')
            console.log(err.stack);
        }
    } else {
        console.log('dumpError :: argument is not an object');
    }
}
