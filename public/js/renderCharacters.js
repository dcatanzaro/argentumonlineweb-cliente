var canvas = {};

canvas.characters = [];

$(document).ready(function() {

    for (var i = 0; i < 10; i++) {
        canvas.characters[i] = {};
        canvas.characters[i].element = $($(".contentImgA")[i]);
        canvas.characters[i].ctx = canvas.characters[i].element.get(0).getContext("2d");
    }
});

var idGraphics = [];

var inits = new Inits();

function Inits() {
    this.preCacheGraphics = {};
    this.graphics = {};
    this.heads = {};
    this.bodies = {};
    this.armas = {};
    this.escudos = {};
    this.cascos = {};

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
                } else {
                    var lineSpeed = parseInt(grhData[1]) + 1;

                    inits.graphics[grh[1]] = {
                        numFrames: grhData[1],
                        frames: {},
                        speed: responseSplit[lineSpeed],
                        frameCounter: 0
                    };

                    for (i = 1; i <= grhData[1]; i++) {
                        inits.graphics[grh[1]].frames[i] = responseSplit[i];
                    }
                }
            });

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
                }

                var responseSplit = response.split('Casco1=');
                dir = responseSplit[1];

                if (dir) {
                    inits.cascos[objIndex][1] = parseInt(dir.trim());
                }

                var responseSplit = response.split('Casco2=');
                dir = responseSplit[1];

                if (dir) {
                    inits.cascos[objIndex][3] = parseInt(dir.trim());
                }

                var responseSplit = response.split('Casco3=');
                dir = responseSplit[1];

                if (dir) {
                    inits.cascos[objIndex][2] = parseInt(dir.trim());
                }

                var responseSplit = response.split('Casco4=');
                dir = responseSplit[1];

                if (dir) {
                    inits.cascos[objIndex][4] = parseInt(dir.trim());
                }
            }

            callback(true);
        });
    };
}

function initialize(characters) {
    inits.loadHeads(function(success) {
        inits.loadArmas(function(success) {
            inits.loadEscudos(function(success) {
                inits.loadCascos(function(success) {
                    inits.loadBodies(function(success) {
                        inits.loadGraphics(function(success) {
                            for (var indexCharacter in characters) {
                                var character = characters[indexCharacter];
                                character.idBody = parseInt(character.idBody);
                                character.idWeapon = parseInt(character.idWeapon);
                                character.idShield = parseInt(character.idShield);
                                character.idHead = parseInt(character.idHead);
                                character.idHelmet = parseInt(character.idHelmet);

                                drawChar(character, indexCharacter, 24, 60);
                            }
                        });
                    });
                });
            });
        });
    });
}

function initialize2(callback) {
    inits.loadHeads(function(success) {
        inits.loadArmas(function(success) {
            inits.loadEscudos(function(success) {
                inits.loadCascos(function(success) {
                    inits.loadBodies(function(success) {
                        inits.loadGraphics(function(success) {
                            callback(true);
                        });
                    });
                });
            });
        });
    });
}

var OffsetXHead = 8;

function drawChar(personaje, count, sX, sY) {
    canvas.characters[count].ctx.clearRect(0, 0, 80, 100);

    var grhRopa = "";
    var grhWeapon = "";
    var grhShield = "";
    var frameCounter = 1;

    if (personaje.idBody) {
        grhRopa = inits.bodies[personaje.idBody][2];
    }

    if (personaje.idWeapon && !personaje.isNpc) {
        grhWeapon = inits.armas[personaje.idWeapon][2];
    }

    if (personaje.idShield && !personaje.isNpc) {
        grhShield = inits.escudos[personaje.idShield][2];
    }

    if (frameCounter > 0 && Math.ceil(frameCounter) <= inits.graphics[grhRopa].numFrames) {
        var graphicsGrhRopa = "";
        var graphicsGrhWeapon = "";
        var graphicsGrhShield = "";

        if (grhRopa) {
            var CurrentGrhRopa = inits.graphics[grhRopa].frames[Math.ceil(frameCounter)];
            graphicsGrhRopa = inits.graphics[CurrentGrhRopa];
        }

        if (grhWeapon) {
            var CurrentGrhWeapon = inits.graphics[grhWeapon].frames[Math.ceil(frameCounter)];
            graphicsGrhWeapon = inits.graphics[CurrentGrhWeapon];
        }

        if (grhShield) {
            var CurrentGrhShield = inits.graphics[grhShield].frames[Math.ceil(frameCounter)];
            graphicsGrhShield = inits.graphics[CurrentGrhShield];
        }

        if (personaje.idHead) {
            var grhCabeza = inits.heads[personaje.idHead][2];

            var graphicGrhHead = inits.graphics[grhCabeza];

            var widtHead = graphicGrhHead.width;
            var heightHead = graphicGrhHead.height;

            if (!inits.preCacheGraphics[graphicGrhHead.numFile]) {
                var imgHead = new Image();
                imgHead.src = '../graficos/' + graphicGrhHead.numFile + '.png';

                imgHead.onload = function() {
                    inits.preCacheGraphics[graphicGrhHead.numFile] = imgHead;

                    canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicGrhHead.numFile], graphicGrhHead.sX, graphicGrhHead.sY, widtHead, heightHead, sX + OffsetXHead, sY + inits.bodies[personaje.idBody].headOffsetY - 34, widtHead, heightHead);
                };
            } else {
                canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicGrhHead.numFile], graphicGrhHead.sX, graphicGrhHead.sY, widtHead, heightHead, sX + OffsetXHead, sY + inits.bodies[personaje.idBody].headOffsetY - 34, widtHead, heightHead);
            }

        }

        if (graphicsGrhRopa) {
            var widthRopa = graphicsGrhRopa.width;
            var heightRopa = graphicsGrhRopa.height;

            var tmpsXBody = sX - Math.floor((widthRopa * 16) / 32) + 16;
            var tmpsYBody = sY - Math.floor((heightRopa * 32) / 32) + 16;

            if (!inits.preCacheGraphics[graphicsGrhRopa.numFile]) {
                var imgBody = new Image();
                imgBody.src = '../graficos/' + graphicsGrhRopa.numFile + '.png';

                imgBody.onload = function() {
                    inits.preCacheGraphics[graphicsGrhRopa.numFile] = imgBody;

                    canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicsGrhRopa.numFile], graphicsGrhRopa.sX, graphicsGrhRopa.sY, widthRopa, heightRopa, tmpsXBody, tmpsYBody, widthRopa, heightRopa);

                };
            } else {
                canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicsGrhRopa.numFile], graphicsGrhRopa.sX, graphicsGrhRopa.sY, widthRopa, heightRopa, tmpsXBody, tmpsYBody, widthRopa, heightRopa);
            }
        }

        if (personaje.idHelmet) {
            var grhHelmet = inits.cascos[personaje.idHelmet][2];

            var graphicGrhHelmet = inits.graphics[grhHelmet];

            var widtHelmet = graphicGrhHelmet.width;
            var heightHelmet = graphicGrhHelmet.height;

            if (!inits.preCacheGraphics[graphicGrhHelmet.numFile]) {
                var imgHelmet = new Image();
                imgHelmet.src = '../graficos/' + graphicGrhHelmet.numFile + '.png';

                imgHelmet.onload = function() {
                    inits.preCacheGraphics[graphicGrhHelmet.numFile] = imgHelmet;

                    canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicGrhHelmet.numFile], graphicGrhHelmet.sX, graphicGrhHelmet.sY, widtHelmet, heightHelmet, sX + OffsetXHead, sY + inits.bodies[personaje.idBody].headOffsetY - 34, widtHelmet, heightHelmet);
                };
            } else {
                canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicGrhHelmet.numFile], graphicGrhHelmet.sX, graphicGrhHelmet.sY, widtHelmet, heightHelmet, sX + OffsetXHead, sY + inits.bodies[personaje.idBody].headOffsetY - 34, widtHelmet, heightHelmet);
            }
        }

        if (graphicsGrhWeapon) {
            var widthWeapon = graphicsGrhWeapon.width;
            var heightWeapon = graphicsGrhWeapon.height;

            var tmpsXWeapon = sX - Math.floor((widthWeapon * 16) / 32) + 16;
            var tmpsYWeapon = sY - Math.floor((heightWeapon * 32) / 32) + 12;

            if (!inits.preCacheGraphics[graphicsGrhWeapon.numFile]) {
                var imgWeapon = new Image();
                imgWeapon.src = '../graficos/' + graphicsGrhWeapon.numFile + '.png';

                imgWeapon.onload = function() {
                    inits.preCacheGraphics[graphicsGrhWeapon.numFile] = imgWeapon;

                    canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicsGrhWeapon.numFile], graphicsGrhWeapon.sX, graphicsGrhWeapon.sY, widthWeapon, heightWeapon, tmpsXWeapon, tmpsYWeapon, widthWeapon, heightWeapon);
                };
            } else {
                canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicsGrhWeapon.numFile], graphicsGrhWeapon.sX, graphicsGrhWeapon.sY, widthWeapon, heightWeapon, tmpsXWeapon, tmpsYWeapon, widthWeapon, heightWeapon);
            }
        }

        if (graphicsGrhShield) {
            var widthShield = graphicsGrhShield.width;
            var heightShield = graphicsGrhShield.height;

            var tmpsXShield = sX - Math.floor((widthShield * 16) / 32) + 16;
            var tmpsYShield = sY - Math.floor((heightShield * 32) / 32) + 16;

            if (!inits.preCacheGraphics[graphicsGrhShield.numFile]) {
                var imgShield = new Image();
                imgShield.src = '../graficos/' + graphicsGrhShield.numFile + '.png';

                imgShield.onload = function() {
                    inits.preCacheGraphics[graphicsGrhShield.numFile] = imgShield;

                    canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicsGrhShield.numFile], graphicsGrhShield.sX, graphicsGrhShield.sY, widthShield, heightShield, tmpsXShield, tmpsYShield, widthShield, heightShield);
                };
            } else {
                canvas.characters[count].ctx.drawImage(inits.preCacheGraphics[graphicsGrhShield.numFile], graphicsGrhShield.sX, graphicsGrhShield.sY, widthShield, heightShield, tmpsXShield, tmpsYShield, widthShield, heightShield);
            }
        }

    }
}