class RenderCharacters {
    constructor(inits, ctx, character, sX, sY) {
        this.inits = inits;
        this.ctx = ctx;
        this.character = character;
        this.sX = sX;
        this.sY = sY;

        this.OffsetXHead = 8;
    }

    drawChar() {
        this.ctx.clearRect(0, 0, 80, 100);

        var grhRopa = "";
        var grhWeapon = "";
        var grhShield = "";
        var frameCounter = 1;

        if (this.character.idBody) {
            grhRopa = this.inits.bodies[this.character.idBody][2];
        }

        if (this.character.idWeapon && !this.character.isNpc) {
            grhWeapon = this.inits.armas[this.character.idWeapon][2];
        }

        if (this.character.idShield && !this.character.isNpc) {
            grhShield = this.inits.escudos[this.character.idShield][2];
        }

        if (
            frameCounter > 0 &&
            Math.ceil(frameCounter) <= this.inits.graphics[grhRopa].numFrames
        ) {
            var graphicsGrhRopa = "";
            var graphicsGrhWeapon = "";
            var graphicsGrhShield = "";

            if (grhRopa) {
                var CurrentGrhRopa = this.inits.graphics[grhRopa].frames[
                    Math.ceil(frameCounter)
                ];
                graphicsGrhRopa = this.inits.graphics[CurrentGrhRopa];
            }

            if (grhWeapon) {
                var CurrentGrhWeapon = this.inits.graphics[grhWeapon].frames[
                    Math.ceil(frameCounter)
                ];
                graphicsGrhWeapon = this.inits.graphics[CurrentGrhWeapon];
            }

            if (grhShield) {
                var CurrentGrhShield = this.inits.graphics[grhShield].frames[
                    Math.ceil(frameCounter)
                ];
                graphicsGrhShield = this.inits.graphics[CurrentGrhShield];
            }

            if (this.character.idHead) {
                var grhCabeza = this.inits.heads[this.character.idHead][2];

                var graphicGrhHead = this.inits.graphics[grhCabeza];

                var widtHead = graphicGrhHead.width;
                var heightHead = graphicGrhHead.height;

                if (!this.inits.preCacheGraphics[graphicGrhHead.numFile]) {
                    var imgHead = new Image();
                    imgHead.src =
                        "/static/graficos/" + graphicGrhHead.numFile + ".png";

                    imgHead.onload = () => {
                        this.inits.preCacheGraphics[
                            graphicGrhHead.numFile
                        ] = imgHead;

                        this.ctx.drawImage(
                            this.inits.preCacheGraphics[graphicGrhHead.numFile],
                            graphicGrhHead.sX,
                            graphicGrhHead.sY,
                            widtHead,
                            heightHead,
                            this.sX + this.OffsetXHead,
                            this.sY +
                                this.inits.bodies[this.character.idBody]
                                    .headOffsetY -
                                34,
                            widtHead,
                            heightHead
                        );
                    };
                } else {
                    this.ctx.drawImage(
                        this.inits.preCacheGraphics[graphicGrhHead.numFile],
                        graphicGrhHead.sX,
                        graphicGrhHead.sY,
                        widtHead,
                        heightHead,
                        this.sX + this.OffsetXHead,
                        this.sY +
                            this.inits.bodies[this.character.idBody]
                                .headOffsetY -
                            34,
                        widtHead,
                        heightHead
                    );
                }
            }

            if (graphicsGrhRopa) {
                var widthRopa = graphicsGrhRopa.width;
                var heightRopa = graphicsGrhRopa.height;

                var tmpsXBody =
                    this.sX - Math.floor((widthRopa * 16) / 32) + 16;
                var tmpsYBody =
                    this.sY - Math.floor((heightRopa * 32) / 32) + 16;

                if (!this.inits.preCacheGraphics[graphicsGrhRopa.numFile]) {
                    var imgBody = new Image();
                    imgBody.src =
                        "/static/graficos/" + graphicsGrhRopa.numFile + ".png";

                    imgBody.onload = () => {
                        this.inits.preCacheGraphics[
                            graphicsGrhRopa.numFile
                        ] = imgBody;

                        this.ctx.drawImage(
                            this.inits.preCacheGraphics[
                                graphicsGrhRopa.numFile
                            ],
                            graphicsGrhRopa.sX,
                            graphicsGrhRopa.sY,
                            widthRopa,
                            heightRopa,
                            tmpsXBody,
                            tmpsYBody,
                            widthRopa,
                            heightRopa
                        );
                    };
                } else {
                    this.ctx.drawImage(
                        this.inits.preCacheGraphics[graphicsGrhRopa.numFile],
                        graphicsGrhRopa.sX,
                        graphicsGrhRopa.sY,
                        widthRopa,
                        heightRopa,
                        tmpsXBody,
                        tmpsYBody,
                        widthRopa,
                        heightRopa
                    );
                }
            }

            if (this.character.idHelmet) {
                var casco = this.inits.cascos[this.character.idHelmet];

                var grhHelmet = this.inits.cascos[this.character.idHelmet][2];

                var graphicGrhHelmet = this.inits.graphics[grhHelmet];

                var widtHelmet = graphicGrhHelmet.width;
                var heightHelmet = graphicGrhHelmet.height;

                if (!this.inits.preCacheGraphics[graphicGrhHelmet.numFile]) {
                    var imgHelmet = new Image();
                    imgHelmet.src =
                        "/static/graficos/" + graphicGrhHelmet.numFile + ".png";

                    imgHelmet.onload = () => {
                        this.inits.preCacheGraphics[
                            graphicGrhHelmet.numFile
                        ] = imgHelmet;

                        this.ctx.drawImage(
                            this.inits.preCacheGraphics[
                                graphicGrhHelmet.numFile
                            ],
                            graphicGrhHelmet.sX,
                            graphicGrhHelmet.sY,
                            widtHelmet,
                            heightHelmet,
                            this.sX + this.OffsetXHead + casco.offsetX,
                            this.sY +
                                this.inits.bodies[this.character.idBody]
                                    .headOffsetY -
                                34 +
                                casco.offsetY,
                            widtHelmet,
                            heightHelmet
                        );
                    };
                } else {
                    this.ctx.drawImage(
                        this.inits.preCacheGraphics[graphicGrhHelmet.numFile],
                        graphicGrhHelmet.sX,
                        graphicGrhHelmet.sY,
                        widtHelmet,
                        heightHelmet,
                        this.sX + this.OffsetXHead + casco.offsetX,
                        this.sY +
                            this.inits.bodies[this.character.idBody]
                                .headOffsetY -
                            34 +
                            casco.offsetY,
                        widtHelmet,
                        heightHelmet
                    );
                }
            }

            if (graphicsGrhWeapon) {
                var widthWeapon = graphicsGrhWeapon.width;
                var heightWeapon = graphicsGrhWeapon.height;

                var tmpsXWeapon =
                    this.sX - Math.floor((widthWeapon * 16) / 32) + 16;
                var tmpsYWeapon =
                    this.sY - Math.floor((heightWeapon * 32) / 32) + 12;

                if (!this.inits.preCacheGraphics[graphicsGrhWeapon.numFile]) {
                    var imgWeapon = new Image();
                    imgWeapon.src =
                        "/static/graficos/" +
                        graphicsGrhWeapon.numFile +
                        ".png";

                    imgWeapon.onload = () => {
                        this.inits.preCacheGraphics[
                            graphicsGrhWeapon.numFile
                        ] = imgWeapon;

                        this.ctx.drawImage(
                            this.inits.preCacheGraphics[
                                graphicsGrhWeapon.numFile
                            ],
                            graphicsGrhWeapon.sX,
                            graphicsGrhWeapon.sY,
                            widthWeapon,
                            heightWeapon,
                            tmpsXWeapon,
                            tmpsYWeapon,
                            widthWeapon,
                            heightWeapon
                        );
                    };
                } else {
                    this.ctx.drawImage(
                        this.inits.preCacheGraphics[graphicsGrhWeapon.numFile],
                        graphicsGrhWeapon.sX,
                        graphicsGrhWeapon.sY,
                        widthWeapon,
                        heightWeapon,
                        tmpsXWeapon,
                        tmpsYWeapon,
                        widthWeapon,
                        heightWeapon
                    );
                }
            }

            if (graphicsGrhShield) {
                var widthShield = graphicsGrhShield.width;
                var heightShield = graphicsGrhShield.height;

                var tmpsXShield =
                    this.sX - Math.floor((widthShield * 16) / 32) + 16;
                var tmpsYShield =
                    this.sY - Math.floor((heightShield * 32) / 32) + 16;

                if (!this.inits.preCacheGraphics[graphicsGrhShield.numFile]) {
                    var imgShield = new Image();
                    imgShield.src =
                        "/static/graficos/" +
                        graphicsGrhShield.numFile +
                        ".png";

                    imgShield.onload = () => {
                        this.inits.preCacheGraphics[
                            graphicsGrhShield.numFile
                        ] = imgShield;

                        this.ctx.drawImage(
                            this.inits.preCacheGraphics[
                                graphicsGrhShield.numFile
                            ],
                            graphicsGrhShield.sX,
                            graphicsGrhShield.sY,
                            widthShield,
                            heightShield,
                            tmpsXShield,
                            tmpsYShield,
                            widthShield,
                            heightShield
                        );
                    };
                } else {
                    this.ctx.drawImage(
                        this.inits.preCacheGraphics[graphicsGrhShield.numFile],
                        graphicsGrhShield.sX,
                        graphicsGrhShield.sY,
                        widthShield,
                        heightShield,
                        tmpsXShield,
                        tmpsYShield,
                        widthShield,
                        heightShield
                    );
                }
            }
        }
    }
}

export default RenderCharacters;
