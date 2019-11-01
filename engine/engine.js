class Engine {
    constructor(inits, user, pkg, config, game, refCanvas, react) {
        this.inits = inits;
        this.user = user;
        this.pkg = pkg;
        this.config = config;
        this.game = game;
        this.react = react;

        this.engineBaseSpeed = 0.016;

        this.delta = 0;

        this.personajes = {};

        this.lastDelta = 0;
        this.timerTicksPerFrame = 0;
        this.lFrameTimer = 0;
        this.framesPerSecCounter = 0;
        this.FPS = 0;
        this.ping = 0;

        this.offsetCounterX = 0;
        this.offsetCounterY = 0;

        this.scrollPixelsPerFrameX = 9;
        this.scrollPixelsPerFrameY = 9;

        this.posYDescClient = 0;
        this.sumPosY = 0;
        this.lifeDescClient = 0;
        this.timeMoveDescClient = 0;

        this.timeWalk = 0;

        this.canvas = {};
        this.refCanvas = refCanvas;

        this.keydown = {};

        document.addEventListener("keydown", e => {
            if (
                e.keyCode == this.react.state.keyCodeDefault[0] ||
                e.keyCode == this.react.state.keyCodeDefault[1] ||
                e.keyCode == this.react.state.keyCodeDefault[2] ||
                e.keyCode == this.react.state.keyCodeDefault[3] ||
                e.keyCode == this.react.state.keyCodeDefault[4]
            ) {
                this.keydown[e.keyCode] = true;
            }
        });

        document.addEventListener("keyup", e => {
            if (
                e.keyCode == this.react.state.keyCodeDefault[0] ||
                e.keyCode == this.react.state.keyCodeDefault[1] ||
                e.keyCode == this.react.state.keyCodeDefault[2] ||
                e.keyCode == this.react.state.keyCodeDefault[3] ||
                e.keyCode == this.react.state.keyCodeDefault[4]
            ) {
                this.keydown[e.keyCode] = false;
            }
        });
    }

    initCanvas = async () => {
        this.canvas.background = {};
        this.canvas.background.ctx = this.refCanvas.background.getContext(
            "2d",
            {
                alpha: false
            }
        );

        this.canvas.techos = {};
        this.canvas.techos.ctx = this.refCanvas.techos.getContext("2d");

        this.canvas.foreground = {};
        this.canvas.foreground.ctx = this.refCanvas.foreground.getContext("2d");

        this.canvas.items = {};
        this.canvas.items.ctx = this.refCanvas.items.getContext("2d");

        this.canvas.textos = {};
        this.canvas.textos.ctx = this.refCanvas.textos.getContext("2d");

        const loadMaps = this.inits.loadMaps();
        const loadObjs = this.inits.loadObjs();
        const loadHeads = this.inits.loadHeads();
        const loadArmas = this.inits.loadArmas();
        const loadEscudos = this.inits.loadEscudos();
        const loadCascos = this.inits.loadCascos();
        const loadBodies = this.inits.loadBodies();
        const loadFxs = this.inits.loadFxs();
        const loadGraphics = this.inits.loadGraphics();

        await Promise.all([
            loadMaps,
            loadObjs,
            loadHeads,
            loadArmas,
            loadEscudos,
            loadCascos,
            loadBodies,
            loadFxs,
            loadGraphics
        ]);
    };

    timestamp = () => {
        return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
    };

    cleanMapData = idMap => {
        if (this.inits.mapData[idMap]) {
            for (let y = 1; y <= 100; y++) {
                for (let x = 1; x <= 100; x++) {
                    this.inits.mapData[idMap][y][x].id = 0;
                    delete this.inits.mapa[idMap][y][x].o;
                }
            }
        }
    };

    setMapData = (idMap, pos, data) => {
        this.inits.mapData[idMap][pos.y][pos.x].id = data;
    };

    clickCanvas = pos => {
        let tileSelected = this.inits.mapData[this.config.mapNumber][pos.y][
            pos.x
        ];

        if (!tileSelected.id) {
            tileSelected = this.inits.mapData[this.config.mapNumber][pos.y + 1][
                pos.x
            ];
        }

        this.pkg.setPackageID(this.pkg.serverPacketID.click);
        this.pkg.writeByte(pos.x);
        this.pkg.writeByte(pos.y);
        this.config.ws.send(this.pkg.dataSend());

        if (this.config.hechizoSelected) {
            this.react.setState({
                crosshair: false
            });

            if (
                +Date.now() - this.config.timeSpellStart >
                this.config.intervalSpell
            ) {
                if (
                    this.user.mana >=
                    this.user.spells[this.config.hechizoSelected].manaRequired
                ) {
                    this.config.timeSpellStart = +Date.now();

                    this.pkg.setPackageID(this.pkg.serverPacketID.attackSpell);
                    this.pkg.writeByte(this.config.hechizoSelected);
                    this.pkg.writeByte(pos.x);
                    this.pkg.writeByte(pos.y);
                    this.config.ws.send(this.pkg.dataSend());
                } else {
                    this.game.writeConsole("No tiene suficiente mana.", "gray");
                }

                this.config.hechizoSelected = 0;
            } else {
                this.game.writeConsole(
                    "Aún no puedes realizar esa acción.",
                    "gray"
                );
            }
        }

        if (this.config.itemSelected) {
            this.react.setState({
                crosshair: false
            });

            if (
                +Date.now() - this.config.timeRangeStart >
                this.config.rangeInterval
            ) {
                this.config.timeRangeStart = +Date.now();

                this.pkg.setPackageID(this.pkg.serverPacketID.attackRange);
                this.pkg.writeByte(pos.x);
                this.pkg.writeByte(pos.y);
                this.config.ws.send(this.pkg.dataSend());

                this.config.itemSelected = 0;
            } else {
                this.game.writeConsole(
                    "Aún no puedes realizar esa acción.",
                    "gray"
                );
            }
        }
    };

    setPersonaje = personaje => {
        this.personajes[personaje.id] = personaje;
    };

    deleteAllPersonajes = () => {
        this.personajes = {};
    };

    setAttrPersonaje = (idPersonaje, attr, data) => {
        if (this.personajes[idPersonaje]) {
            this.personajes[idPersonaje][attr] = data;
        }
    };

    deletePersonaje = idPersonaje => {
        if (this.personajes[idPersonaje]) {
            this.inits.mapData[this.config.mapNumber][
                this.personajes[idPersonaje].pos.y
            ][this.personajes[idPersonaje].pos.x].id = 0;

            delete this.personajes[idPersonaje];

            if (this.config.dialogs[idPersonaje]) {
                delete this.config.dialogs[idPersonaje];
            }
        }
    };

    actPositionServer = (pos, heading) => {
        if (this.user.pos.x != pos.x || this.user.pos.y != pos.y) {
            this.user.pos.x = pos.x;
            this.user.pos.y = pos.y;

            this.inits.mapData[this.config.mapNumber][
                this.personajes[this.user.id].pos.y
            ][this.personajes[this.user.id].pos.x].id = 0;

            this.personajes[this.user.id].pos.x = pos.x;
            this.personajes[this.user.id].pos.y = pos.y;
            this.personajes[this.user.id].heading = heading;

            this.inits.mapData[this.config.mapNumber][
                this.personajes[this.user.id].pos.y
            ][this.personajes[this.user.id].pos.x].id = this.user.id;

            this.renderBackground(0, 0);
        }
    };

    inmovilizado = pos => {
        if (this.user.pos.x != pos.x || this.user.pos.y != pos.y) {
            this.user.pos.x = pos.x;
            this.user.pos.y = pos.y;

            this.inits.mapData[this.config.mapNumber][
                this.personajes[this.user.id].pos.y
            ][this.personajes[this.user.id].pos.x].id = 0;

            this.personajes[this.user.id].pos.x = pos.x;
            this.personajes[this.user.id].pos.y = pos.y;

            this.inits.mapData[this.config.mapNumber][
                this.personajes[this.user.id].pos.y
            ][this.personajes[this.user.id].pos.x].id = this.user.id;

            this.renderBackground(0, 0);
        }
    };

    hit = () => {
        const heading = this.personajes[this.user.id].heading;
        const x = this.personajes[this.user.id].pos.x;
        const y = this.personajes[this.user.id].pos.y;
        let valido = false;

        switch (heading) {
            case 1:
                if (
                    this.inits.mapData[this.config.mapNumber][y - 1][x].id !== 0
                ) {
                    valido = true;
                }
                break;
            case 2:
                if (
                    this.inits.mapData[this.config.mapNumber][y + 1][x].id !== 0
                ) {
                    valido = true;
                }
                break;
            case 3:
                if (
                    this.inits.mapData[this.config.mapNumber][y][x + 1].id !== 0
                ) {
                    valido = true;
                }
                break;
            case 4:
                if (
                    this.inits.mapData[this.config.mapNumber][y][x - 1].id !== 0
                ) {
                    valido = true;
                }
                break;
            default:
                console.log("Invalid heading");
                break;
        }

        if (valido) {
            this.config.timeHitStart = +Date.now();

            this.pkg.setPackageID(this.pkg.serverPacketID.attackMele);
            this.config.ws.send(this.pkg.dataSend());

            valido = false;
        }
    };

    loop = () => {
        //stats.begin();

        if (this.user.id) {
            this.delta = this.timestamp() - this.lastDelta;
            this.lastDelta = this.timestamp();

            this.check();
            this.render();
        }

        //stats.end();

        requestAnimationFrame(this.loop);
    };

    check = () => {
        const { showInputText } = this.react.state;

        if (
            !this.user.moving &&
            this.user.pos.x > 0 &&
            this.user.pos.y > 0 &&
            !showInputText
        ) {
            if (
                this.keydown[
                    this.react.state.keyCodeDefault[
                        this.config.nameKeyCode.flechaIzquierda
                    ]
                ]
            ) {
                this.moveTo(this.user.id, this.config.direcciones.left);
            } else if (
                this.keydown[
                    this.react.state.keyCodeDefault[
                        this.config.nameKeyCode.flechaDerecha
                    ]
                ]
            ) {
                this.moveTo(this.user.id, this.config.direcciones.right);
            } else if (
                this.keydown[
                    this.react.state.keyCodeDefault[
                        this.config.nameKeyCode.flechaArriba
                    ]
                ]
            ) {
                this.moveTo(this.user.id, this.config.direcciones.up);
            } else if (
                this.keydown[
                    this.react.state.keyCodeDefault[
                        this.config.nameKeyCode.flechaAbajo
                    ]
                ]
            ) {
                this.moveTo(this.user.id, this.config.direcciones.down);
            }
        }
    };

    clearRender = capa => {
        this.canvas[capa].ctx.clearRect(
            0,
            0,
            this.config.canvasSize.width,
            this.config.canvasSize.height
        );
    };

    showNextFrame = () => {
        try {
            if (this.user.moving) {
                if (this.user.addtoUserPos.x) {
                    this.offsetCounterX =
                        this.offsetCounterX -
                        9 * this.user.addtoUserPos.x * this.timerTicksPerFrame;

                    if (
                        Math.abs(this.offsetCounterX) >=
                        Math.abs(32 * this.user.addtoUserPos.x)
                    ) {
                        this.offsetCounterX = 0;
                        this.user.addtoUserPos.x = 0;
                        this.user.moving = false;
                    }
                }

                if (this.user.addtoUserPos.y) {
                    this.offsetCounterY =
                        this.offsetCounterY -
                        this.scrollPixelsPerFrameY *
                            this.user.addtoUserPos.y *
                            this.timerTicksPerFrame;

                    if (
                        Math.abs(this.offsetCounterY) >=
                        Math.abs(32 * this.user.addtoUserPos.y)
                    ) {
                        this.offsetCounterY = 0;
                        this.user.addtoUserPos.y = 0;
                        this.user.moving = false;
                    }
                }

                this.renderBackground(this.offsetCounterX, this.offsetCounterY);
            }

            this.renderScreen(
                this.user.pos.x - this.user.addtoUserPos.x,
                this.user.pos.y - this.user.addtoUserPos.y,
                this.offsetCounterX,
                this.offsetCounterY
            );
        } catch (err) {
            dumpError(err);
        }
    };

    fps = () => {
        if (this.timestamp() - this.lFrameTimer > 1000) {
            this.FPS = this.framesPerSecCounter;
            this.framesPerSecCounter = 0;
            this.lFrameTimer = this.timestamp();
        }
    };

    render = () => {
        try {
            this.showNextFrame();

            this.fps();
            this.framesPerSecCounter = this.framesPerSecCounter + 1;
            this.timerTicksPerFrame = this.delta * this.engineBaseSpeed;
        } catch (err) {
            dumpError(err);
        }
    };

    updateItems = (pixelOffsetX, pixelOffsetY) => {
        this.clearRender("items");

        const tileX = this.user.pos.x - this.user.addtoUserPos.x;
        const tileY = this.user.pos.y - this.user.addtoUserPos.y;

        let PixelOffsetXTemp = 0;
        let PixelOffsetYTemp = 0;

        let minXOffset = 0;
        let minYOffset = 0;

        let ScreenX = 0;
        let ScreenY = 0;

        const screenminY = tileY - 9;
        const screenmaxY = tileY + 10;
        const screenminX = tileX - 9;
        const screenmaxX = tileX + 10;

        let minY = screenminY - this.config.TileBufferSize + 2;
        let maxY = screenmaxY + this.config.TileBufferSize;
        let minX = screenminX - this.config.TileBufferSize + 2;
        let maxX = screenmaxX + this.config.TileBufferSize;

        let objInfo = {};
        let grhObj = {};

        if (minY < this.config.YMinMapSize) {
            minYOffset = this.config.YMinMapSize - minY;
            minY = this.config.YMinMapSize;
        }

        if (maxY > this.config.YMaxMapSize) {
            maxY = this.config.YMaxMapSize;
        }

        if (minX < this.config.XMinMapSize) {
            minXOffset = this.config.XMinMapSize - minX;
            minX = this.config.XMinMapSize;
        }

        if (maxX > this.config.XMaxMapSize) {
            maxX = this.config.XMaxMapSize;
        }

        ScreenY = minYOffset - this.config.TileBufferSize;

        for (let y = minY; y < maxY; y++) {
            ScreenX = minXOffset - this.config.TileBufferSize;

            for (let x = minX; x < maxX; x++) {
                PixelOffsetXTemp = ScreenX * 32 + pixelOffsetX;
                PixelOffsetYTemp = ScreenY * 32 + pixelOffsetY;

                objInfo = this.inits.mapa[this.config.mapNumber][y][x].o;

                if (objInfo) {
                    grhObj = this.inits.graphics[
                        this.inits.objs[objInfo.oi].grhIndex
                    ];

                    if (grhObj && grhObj.numFrames === 1) {
                        var CurrentGrhIndex = grhObj.frames[1];

                        grhObj = this.inits.graphics[CurrentGrhIndex];

                        PixelOffsetXTemp -=
                            Math.floor((grhObj.width * 16) / 32) - 48;
                        PixelOffsetYTemp -=
                            Math.floor((grhObj.height * 16) / 16) - 64;

                        this.drawGrhCapa(
                            "items",
                            grhObj,
                            PixelOffsetXTemp,
                            PixelOffsetYTemp
                        );
                    }
                }

                ScreenX = ScreenX + 1;
            }

            ScreenY = ScreenY + 1;
        }
    };

    renderBackground = (pixelOffsetX, pixelOffsetY) => {
        this.clearRender("background");
        this.clearRender("techos");

        const tileX = this.user.pos.x - this.user.addtoUserPos.x;
        const tileY = this.user.pos.y - this.user.addtoUserPos.y;

        let ScreenX = 0;
        let ScreenY = 0;

        const screenminY = tileY - 9;
        const screenmaxY = tileY + 10;
        const screenminX = tileX - 9;
        const screenmaxX = tileX + 10;

        let minY = screenminY - this.config.TileBufferSize + 2;
        let maxY = screenmaxY + this.config.TileBufferSize;
        let minX = screenminX - this.config.TileBufferSize + 2;
        let maxX = screenmaxX + this.config.TileBufferSize;

        if (minY < this.config.YMinMapSize) {
            minY = this.config.YMinMapSize;
        }

        if (maxY > this.config.YMaxMapSize) {
            maxY = this.config.YMaxMapSize;
        }

        if (minX < this.config.XMinMapSize) {
            minX = this.config.XMinMapSize;
        }

        if (maxX > this.config.XMaxMapSize) {
            maxX = this.config.XMaxMapSize;
        }

        for (let y = screenminY; y < screenmaxY; y++) {
            for (let x = screenminX; x < screenmaxX; x++) {
                if (
                    x > 0 &&
                    x <= this.config.XMaxMapSize &&
                    y > 0 &&
                    y <= this.config.YMaxMapSize
                ) {
                    const tempPixelOffsetX = (ScreenX - 1) * 32 + pixelOffsetX;
                    const tempPixelOffsetY = (ScreenY - 1) * 32 + pixelOffsetY;

                    const grhCapa1 = this.inits.graphics[
                        this.inits.mapa[this.config.mapNumber][y][x].g[1]
                    ];

                    if (grhCapa1 && grhCapa1.numFrames === 1) {
                        this.drawGrhCapa(
                            "background",
                            grhCapa1,
                            tempPixelOffsetX,
                            tempPixelOffsetY
                        );
                    }
                } else {
                    let tmpX = x;
                    let tmpY = y;

                    const tempPixelOffsetX = (ScreenX - 1) * 32 + pixelOffsetX;
                    const tempPixelOffsetY = (ScreenY - 1) * 32 + pixelOffsetY;

                    if (y > this.config.YMaxMapSize) {
                        tmpY = this.config.YMaxMapSize;
                    }
                    if (y <= 0) {
                        tmpY = 1;
                    }

                    if (x > this.config.XMaxMapSize) {
                        tmpX = this.config.XMaxMapSize;
                    }
                    if (x <= 0) {
                        tmpX = 1;
                    }

                    const grhCapa1 = this.inits.graphics[
                        this.inits.mapa[this.config.mapNumber][tmpY][tmpX].g[1]
                    ];

                    if (grhCapa1 && grhCapa1.numFrames === 1) {
                        this.drawGrhCapa(
                            "background",
                            grhCapa1,
                            tempPixelOffsetX,
                            tempPixelOffsetY
                        );
                    }
                }

                ScreenX = ScreenX + 1;
            }

            ScreenX = 0;
            ScreenY = ScreenY + 1;
        }

        this.updateItems(pixelOffsetX, pixelOffsetY);

        this.config.actTechos = true;
    };

    renderScreen = (tileX, tileY, pixelOffsetX, pixelOffsetY) => {
        //try {
        this.clearRender("foreground");
        this.clearRender("textos");

        let PixelOffsetXTemp = 0;
        let PixelOffsetYTemp = 0;

        let minXOffset = 0;
        let minYOffset = 0;

        let ScreenX = 0;
        let ScreenY = 0;

        const screenminY = tileY - 10;
        const screenmaxY = tileY + 9;
        const screenminX = tileX - 10;
        const screenmaxX = tileX + 9;

        const screenminY2 = tileY - 9;
        const screenmaxY2 = tileY + 10;
        const screenminX2 = tileX - 9;
        const screenmaxX2 = tileX + 10;

        let minY = screenminY - this.config.TileBufferSize + 3;
        let maxY = screenmaxY + this.config.TileBufferSize;
        let minX = screenminX - this.config.TileBufferSize + 3;
        let maxX = screenmaxX + this.config.TileBufferSize;

        if (minY < this.config.YMinMapSize) {
            minYOffset = this.config.YMinMapSize - minY;
            minY = this.config.YMinMapSize;
        }

        if (maxY > this.config.YMaxMapSize) {
            maxY = this.config.YMaxMapSize;
        }

        if (minX < this.config.XMinMapSize) {
            minXOffset = this.config.XMinMapSize - minX;
            minX = this.config.XMinMapSize;
        }

        if (maxX > this.config.XMaxMapSize) {
            maxX = this.config.XMaxMapSize;
        }

        for (let y = screenminY2; y < screenmaxY2; y++) {
            for (let x = screenminX2; x < screenmaxX2; x++) {
                if (
                    x > 0 &&
                    x <= this.config.XMaxMapSize &&
                    y > 0 &&
                    y <= this.config.YMaxMapSize
                ) {
                    const tempPixelOffsetX = (ScreenX - 1) * 32 + pixelOffsetX;
                    const tempPixelOffsetY = (ScreenY - 1) * 32 + pixelOffsetY;

                    let grhCapa1 = this.inits.graphics[
                        this.inits.mapa[this.config.mapNumber][y][x].g[1]
                    ];

                    if (grhCapa1 && grhCapa1.numFrames > 1) {
                        grhCapa1.frameCounter += this.delta / grhCapa1.speed;

                        if (
                            Math.ceil(grhCapa1.frameCounter) >
                            grhCapa1.numFrames
                        ) {
                            grhCapa1.frameCounter = 0;
                            grhCapa1.frameCounter +=
                                this.delta / grhCapa1.speed;
                        }

                        const CurrentGrhIndex =
                            grhCapa1.frames[Math.ceil(grhCapa1.frameCounter)];

                        grhCapa1 = this.inits.graphics[CurrentGrhIndex];

                        this.drawGrhCapa(
                            "foreground",
                            grhCapa1,
                            tempPixelOffsetX,
                            tempPixelOffsetY
                        );
                    }

                    const grhCapa2 = this.inits.graphics[
                        this.inits.mapa[this.config.mapNumber][y][x].g[2]
                    ];

                    if (grhCapa2 && grhCapa2.numFrames) {
                        this.drawGrhCapa(
                            "foreground",
                            grhCapa2,
                            tempPixelOffsetX,
                            tempPixelOffsetY
                        );
                    }
                }
                ScreenX = ScreenX + 1;
            }

            ScreenX = 0;
            ScreenY = ScreenY + 1;
        }

        ScreenY = minYOffset - this.config.TileBufferSize;

        for (let y = minY; y < maxY; y++) {
            ScreenX = minXOffset - this.config.TileBufferSize;

            for (let x = minX; x < maxX; x++) {
                PixelOffsetXTemp = ScreenX * 32 + pixelOffsetX;
                PixelOffsetYTemp = ScreenY * 32 + pixelOffsetY;

                const objInfo = this.inits.mapa[this.config.mapNumber][y][x].o;

                if (objInfo) {
                    let grhObj = this.inits.graphics[
                        this.inits.objs[objInfo.oi].grhIndex
                    ];

                    if (grhObj && grhObj.numFrames > 1) {
                        grhObj.frameCounter += this.delta / grhObj.speed;

                        if (Math.ceil(grhObj.frameCounter) > grhObj.numFrames) {
                            grhObj.frameCounter = 0;
                            grhObj.frameCounter += this.delta / grhObj.speed;
                        }

                        const CurrentGrhIndex =
                            grhObj.frames[Math.ceil(grhObj.frameCounter)];

                        grhObj = this.inits.graphics[CurrentGrhIndex];

                        PixelOffsetXTemp -=
                            Math.floor((grhObj.width * 16) / 32) - 48;
                        PixelOffsetYTemp -=
                            Math.floor((grhObj.height * 16) / 16) - 64;

                        this.drawGrhCapa(
                            "foreground",
                            grhObj,
                            PixelOffsetXTemp,
                            PixelOffsetYTemp
                        );
                    }
                }

                ScreenX = ScreenX + 1;
            }

            ScreenY = ScreenY + 1;
        }

        ScreenY = minYOffset - this.config.TileBufferSize;

        for (let y = minY; y < maxY; y++) {
            ScreenX = minXOffset - this.config.TileBufferSize;

            for (let x = minX; x < maxX; x++) {
                PixelOffsetXTemp = (ScreenX + 0) * 32 + pixelOffsetX;
                PixelOffsetYTemp = (ScreenY + 0) * 32 + pixelOffsetY;

                let grhCapa3 = this.inits.graphics[
                    this.inits.mapa[this.config.mapNumber][y][x].g[3]
                ];

                if (
                    x >= 0 &&
                    x <= this.config.XMaxMapSize &&
                    y >= 0 &&
                    y <= this.config.YMaxMapSize
                ) {
                    if (this.inits.mapData[this.config.mapNumber][y][x].id) {
                        const tempPixelOffsetX =
                            (ScreenX + 1) * 32 + pixelOffsetX;
                        const tempPixelOffsetY =
                            (ScreenY + 1) * 32 + pixelOffsetY;

                        const personaje = this.personajes[
                            this.inits.mapData[this.config.mapNumber][y][x].id
                        ];

                        if (personaje) {
                            this.charRender(
                                personaje,
                                tempPixelOffsetX,
                                tempPixelOffsetY
                            );
                        }
                    }
                }

                if (grhCapa3 && grhCapa3.numFrames) {
                    const CurrentGrhIndex = grhCapa3.frames[1];

                    grhCapa3 = this.inits.graphics[CurrentGrhIndex];

                    PixelOffsetXTemp -=
                        Math.floor((grhCapa3.width * 16) / 32) - 48;
                    PixelOffsetYTemp -=
                        Math.floor((grhCapa3.height * 16) / 16) - 64;

                    this.drawGrhCapa(
                        "foreground",
                        grhCapa3,
                        PixelOffsetXTemp,
                        PixelOffsetYTemp
                    );
                }

                ScreenX = ScreenX + 1;
            }

            ScreenY = ScreenY + 1;
        }

        if (this.config.actTechos) {
            ScreenY = minYOffset - this.config.TileBufferSize;
            for (let y = minY; y < maxY; y++) {
                ScreenX = minXOffset - this.config.TileBufferSize;

                for (let x = minX; x < maxX; x++) {
                    let PixelOffsetXTemp = ScreenX * 32 + pixelOffsetX;
                    let PixelOffsetYTemp = ScreenY * 32 + pixelOffsetY;

                    let grhCapa4 = this.inits.graphics[
                        this.inits.mapa[this.config.mapNumber][y][x].g[4]
                    ];

                    if (grhCapa4 && grhCapa4.numFrames) {
                        var CurrentGrhIndex = grhCapa4.frames[1];

                        grhCapa4 = this.inits.graphics[CurrentGrhIndex];
                        PixelOffsetXTemp -=
                            Math.floor((grhCapa4.width * 16) / 32) - 48;
                        PixelOffsetYTemp -=
                            Math.floor((grhCapa4.height * 16) / 16) - 64;

                        this.drawGrhCapa(
                            "techos",
                            grhCapa4,
                            PixelOffsetXTemp,
                            PixelOffsetYTemp,
                            true
                        );
                    }

                    ScreenX = ScreenX + 1;
                }

                ScreenY = ScreenY + 1;
            }

            this.config.actTechos = false;
        }

        this.cargarDescCliente();

        this.renderText(
            "Ping (ms): " + this.ping + " | FPS: " + this.FPS,
            10,
            20,
            "red",
            true,
            12,
            "Tahoma"
        );

        if (this.config.seguroActivado) {
            this.renderText(
                "Seguro Activado",
                10,
                35,
                "red",
                true,
                12,
                "Tahoma"
            );
        } else {
            this.renderText(
                "Seguro Desactivado",
                10,
                35,
                "red",
                true,
                12,
                "Tahoma"
            );
        }
    };

    cargarDescCliente = () => {
        if (this.config.descClient.length) {
            this.posYDescClient = 0;

            if (this.timeMoveDescClient > 500) {
                this.config.descClient = [];
            } else {
                this.timeMoveDescClient++;
            }
        }
    };

    drawGrhCapa = (capa, grh, x, y, alpha) => {
        try {
            if (grh) {
                const image = this.inits.preCacheGraphics[grh.numFile];

                if (image) {
                    if (alpha) {
                        this.canvas[capa].ctx.globalAlpha = 0.5;
                    }
                    if (this.canvas[capa].ctx) {
                        this.canvas[capa].ctx.drawImage(
                            image,
                            grh.sX,
                            grh.sY,
                            grh.width,
                            grh.height,
                            x,
                            y,
                            grh.width,
                            grh.height
                        );
                    }
                    if (alpha) {
                        this.canvas[capa].ctx.globalAlpha = 1;
                    }
                } else {
                    if (grh.numFile) {
                        this.inits
                            .loadImage(grh.numFile)
                            .then(() => {
                                this.drawGrhCapa(capa, grh, x, y, alpha);
                            })
                            .catch(() => {
                                if (grh.grhIndex) {
                                    delete this.inits.graphics[grh.grhIndex];
                                }

                                console.log("Error :(");
                            });
                    }
                }
            }
        } catch (err) {
            dumpError(err);
        }
    };

    charRender = (personaje, pixelOffsetX, pixelOffsetY) => {
        try {
            let moved = false;

            if (personaje.moving) {
                if (personaje.scrollDirectionX) {
                    personaje.moveOffsetX =
                        personaje.moveOffsetX +
                        this.scrollPixelsPerFrameX *
                            personaje.scrollDirectionX *
                            this.timerTicksPerFrame;

                    moved = true;

                    if (
                        (this.sign(personaje.scrollDirectionX) == 1 &&
                            personaje.moveOffsetX >= 0) ||
                        (this.sign(personaje.scrollDirectionX) == -1 &&
                            personaje.moveOffsetX <= 0)
                    ) {
                        personaje.moveOffsetX = 0;
                        personaje.scrollDirectionX = 0;
                    }
                }

                if (personaje.scrollDirectionY) {
                    personaje.moveOffsetY =
                        personaje.moveOffsetY +
                        this.scrollPixelsPerFrameY *
                            personaje.scrollDirectionY *
                            this.timerTicksPerFrame;

                    moved = true;

                    if (
                        (this.sign(personaje.scrollDirectionY) == 1 &&
                            personaje.moveOffsetY >= 0) ||
                        (this.sign(personaje.scrollDirectionY) == -1 &&
                            personaje.moveOffsetY <= 0)
                    ) {
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

            this.drawChar(
                personaje,
                pixelOffsetX + personaje.moveOffsetX,
                pixelOffsetY + personaje.moveOffsetY
            );

            if (personaje.fxId) {
                this.drawFx(
                    personaje,
                    pixelOffsetX + personaje.moveOffsetX,
                    pixelOffsetY + personaje.moveOffsetY,
                    true
                );
            }
        } catch (err) {
            dumpError(err);
        }
    };

    drawChar = (personaje, sX, sY) => {
        try {
            const nameLength = personaje.nameCharacter.length * 3.5;

            if (this.delta) {
                let grhRopa = "";
                let grhWeapon = "";
                let grhShield = "";

                if (personaje.idBody) {
                    grhRopa = this.inits.bodies[personaje.idBody][
                        personaje.heading
                    ];
                }

                if (personaje.idWeapon) {
                    grhWeapon = this.inits.armas[personaje.idWeapon][
                        personaje.heading
                    ];
                }

                if (personaje.idShield) {
                    grhShield = this.inits.escudos[personaje.idShield][
                        personaje.heading
                    ];
                }

                if (personaje.moving) {
                    personaje.frameCounter +=
                        this.delta / this.inits.graphics[grhRopa].speed;

                    if (
                        Math.ceil(personaje.frameCounter) >
                        this.inits.graphics[grhRopa].numFrames
                    ) {
                        personaje.frameCounter = 0;
                        personaje.frameCounter +=
                            this.delta / this.inits.graphics[grhRopa].speed;
                    }

                    if (grhWeapon) {
                        personaje.frameCounterWeapon +=
                            this.delta / this.inits.graphics[grhWeapon].speed;

                        if (
                            Math.ceil(personaje.frameCounterWeapon) >
                            this.inits.graphics[grhWeapon].numFrames
                        ) {
                            personaje.frameCounterWeapon = 0;
                            personaje.frameCounterWeapon +=
                                this.delta /
                                this.inits.graphics[grhWeapon].speed;
                        }
                    }

                    if (grhShield) {
                        personaje.frameCounterShield +=
                            this.delta / this.inits.graphics[grhShield].speed;

                        if (
                            Math.ceil(personaje.frameCounterShield) >
                            this.inits.graphics[grhShield].numFrames
                        ) {
                            personaje.frameCounterShield = 0;
                            personaje.frameCounterShield +=
                                this.delta /
                                this.inits.graphics[grhShield].speed;
                        }
                    }
                }

                if (
                    personaje.frameCounter > 0 &&
                    Math.ceil(personaje.frameCounter) <=
                        this.inits.graphics[grhRopa].numFrames
                ) {
                    let graphicsGrhRopa = "";
                    let graphicsGrhWeapon = "";
                    let graphicsGrhShield = "";

                    if (grhRopa) {
                        const CurrentGrhRopa = this.inits.graphics[grhRopa]
                            .frames[Math.ceil(personaje.frameCounter)];
                        graphicsGrhRopa = this.inits.graphics[CurrentGrhRopa];
                    }

                    if (grhWeapon) {
                        const CurrentGrhWeapon = this.inits.graphics[grhWeapon]
                            .frames[Math.ceil(personaje.frameCounterWeapon)];
                        graphicsGrhWeapon = this.inits.graphics[
                            CurrentGrhWeapon
                        ];
                    }

                    if (grhShield) {
                        const CurrentGrhShield = this.inits.graphics[grhShield]
                            .frames[Math.ceil(personaje.frameCounterShield)];
                        graphicsGrhShield = this.inits.graphics[
                            CurrentGrhShield
                        ];
                    }

                    if (personaje.idHead) {
                        const grhCabeza = this.inits.heads[personaje.idHead][
                            personaje.heading
                        ];

                        const graphicGrhHead = this.inits.graphics[grhCabeza];

                        const widtHead = graphicGrhHead.width;
                        const heightHead = graphicGrhHead.height;

                        if (
                            this.inits.preCacheGraphics[graphicGrhHead.numFile]
                        ) {
                            this.canvas.foreground.ctx.drawImage(
                                this.inits.preCacheGraphics[
                                    graphicGrhHead.numFile
                                ],
                                graphicGrhHead.sX,
                                graphicGrhHead.sY,
                                widtHead,
                                heightHead,
                                sX + this.config.OffsetXHead,
                                sY +
                                    this.inits.bodies[personaje.idBody]
                                        .headOffsetY -
                                    18,
                                widtHead,
                                heightHead
                            );
                        } else {
                            this.inits.loadImage(graphicGrhHead.numFile);
                        }
                    }

                    if (graphicsGrhRopa) {
                        const widthRopa = graphicsGrhRopa.width;
                        const heightRopa = graphicsGrhRopa.height;

                        const tmpsX =
                            sX - Math.floor((widthRopa * 16) / 32) + 16;
                        const tmpsY =
                            sY - Math.floor((heightRopa * 32) / 32) + 32;

                        if (
                            this.inits.preCacheGraphics[graphicsGrhRopa.numFile]
                        ) {
                            this.canvas.foreground.ctx.drawImage(
                                this.inits.preCacheGraphics[
                                    graphicsGrhRopa.numFile
                                ],
                                graphicsGrhRopa.sX,
                                graphicsGrhRopa.sY,
                                widthRopa,
                                heightRopa,
                                tmpsX,
                                tmpsY,
                                widthRopa,
                                heightRopa
                            );
                        } else {
                            this.inits.loadImage(graphicsGrhRopa.numFile);
                        }
                    }

                    if (personaje.idHelmet) {
                        const casco = this.inits.cascos[personaje.idHelmet];
                        const grhHelmet = this.inits.cascos[personaje.idHelmet][
                            personaje.heading
                        ];

                        const graphicGrhHelmet = this.inits.graphics[grhHelmet];

                        const widtHelmet = graphicGrhHelmet.width;
                        const heightHelmet = graphicGrhHelmet.height;

                        if (
                            this.inits.preCacheGraphics[
                                graphicGrhHelmet.numFile
                            ]
                        ) {
                            this.canvas.foreground.ctx.drawImage(
                                this.inits.preCacheGraphics[
                                    graphicGrhHelmet.numFile
                                ],
                                graphicGrhHelmet.sX,
                                graphicGrhHelmet.sY,
                                widtHelmet,
                                heightHelmet,
                                sX + this.config.OffsetXHead + casco.offsetX,
                                sY +
                                    this.inits.bodies[personaje.idBody]
                                        .headOffsetY -
                                    18 +
                                    casco.offsetY,
                                widtHelmet,
                                heightHelmet
                            );
                        } else {
                            this.inits.loadImage(graphicGrhHelmet.numFile);
                        }
                    }

                    if (graphicsGrhWeapon) {
                        const widthWeapon = graphicsGrhWeapon.width;
                        const heightWeapon = graphicsGrhWeapon.height;

                        const tmpsX =
                            sX - Math.floor((widthWeapon * 16) / 32) + 16;
                        const tmpsY =
                            sY - Math.floor((heightWeapon * 32) / 32) + 28;

                        if (
                            this.inits.preCacheGraphics[
                                graphicsGrhWeapon.numFile
                            ]
                        ) {
                            this.canvas.foreground.ctx.drawImage(
                                this.inits.preCacheGraphics[
                                    graphicsGrhWeapon.numFile
                                ],
                                graphicsGrhWeapon.sX,
                                graphicsGrhWeapon.sY,
                                widthWeapon,
                                heightWeapon,
                                tmpsX,
                                tmpsY,
                                widthWeapon,
                                heightWeapon
                            );
                        } else {
                            this.inits.loadImage(graphicsGrhWeapon.numFile);
                        }
                    }

                    if (graphicsGrhShield) {
                        const widthShield = graphicsGrhShield.width;
                        const heightShield = graphicsGrhShield.height;

                        const tmpsX =
                            sX - Math.floor((widthShield * 16) / 32) + 16;
                        const tmpsY =
                            sY - Math.floor((heightShield * 32) / 32) + 32;

                        if (
                            this.inits.preCacheGraphics[
                                graphicsGrhShield.numFile
                            ]
                        ) {
                            this.canvas.foreground.ctx.drawImage(
                                this.inits.preCacheGraphics[
                                    graphicsGrhShield.numFile
                                ],
                                graphicsGrhShield.sX,
                                graphicsGrhShield.sY,
                                widthShield,
                                heightShield,
                                tmpsX,
                                tmpsY,
                                widthShield,
                                heightShield
                            );
                        } else {
                            this.inits.loadImage(graphicsGrhShield.numFile);
                        }
                    }

                    const nameX = sX - nameLength + 16;

                    this.renderText2(
                        personaje.nameCharacter,
                        nameX,
                        sY + 45,
                        personaje.color,
                        true,
                        13,
                        "Tahoma"
                    );

                    if (personaje.clan) {
                        var clanLength = personaje.clan.length * 4;
                        const clanX = sX - clanLength + 16;

                        this.renderText2(
                            personaje.clan,
                            clanX,
                            sY + 65,
                            personaje.color,
                            true,
                            13,
                            "Tahoma"
                        );
                    }

                    if (this.config.dialogs[personaje.id]) {
                        const textLength = this.config.dialogs[personaje.id].msg
                            .length;
                        let firstLineLength;

                        if (textLength >= 30) {
                            firstLineLength = 45;
                        } else {
                            firstLineLength = textLength * 3;
                        }

                        const dialogX = sX + 32 - firstLineLength;

                        this.renderDialog(
                            personaje.id,
                            dialogX,
                            sY +
                                this.inits.bodies[personaje.idBody]
                                    .headOffsetY -
                                this.config.dialogs[personaje.id].y,
                            this.config.dialogs[personaje.id].color,
                            true,
                            13,
                            "Tahoma"
                        );
                    }
                }
            }
        } catch (err) {
            dumpError(err);
        }
    };

    drawFx = (personaje, sX, sY, alpha) => {
        try {
            if (this.delta) {
                const grh = this.inits.fxs[personaje.fxId].grh;

                personaje.frameFxCounter +=
                    this.delta / this.inits.graphics[grh].speed;

                if (
                    Math.ceil(personaje.frameFxCounter) >
                    this.inits.graphics[grh].numFrames
                ) {
                    personaje.frameFxCounter = 0;
                    personaje.frameFxCounter +=
                        this.delta / this.inits.graphics[grh].speed;
                    if (
                        personaje.fxId != 4 &&
                        personaje.fxId != 5 &&
                        personaje.fxId != 6 &&
                        personaje.fxId != 16 &&
                        personaje.fxId != 34
                    ) {
                        personaje.fxId = 0;
                    }
                }

                if (
                    personaje.frameFxCounter > 0 &&
                    Math.ceil(personaje.frameFxCounter) <=
                        this.inits.graphics[grh].numFrames &&
                    personaje.fxId
                ) {
                    const CurrentGrhIndex = this.inits.graphics[grh].frames[
                        Math.ceil(personaje.frameFxCounter)
                    ];

                    const graphicCurrentGrh = this.inits.graphics[
                        CurrentGrhIndex
                    ];

                    const width = graphicCurrentGrh.width;
                    const height = graphicCurrentGrh.height;

                    sX += this.inits.fxs[personaje.fxId].offsetX;
                    sY += this.inits.fxs[personaje.fxId].offsetY;

                    if (alpha) {
                        this.canvas.foreground.ctx.globalAlpha = 0.6;
                    }

                    if (
                        this.inits.preCacheGraphics[graphicCurrentGrh.numFile]
                    ) {
                        this.canvas.foreground.ctx.drawImage(
                            this.inits.preCacheGraphics[
                                graphicCurrentGrh.numFile
                            ],
                            graphicCurrentGrh.sX,
                            graphicCurrentGrh.sY,
                            width,
                            height,
                            sX,
                            sY,
                            width,
                            height
                        );
                    } else {
                        this.inits.loadImage(graphicCurrentGrh.numFile);
                    }

                    if (alpha) {
                        this.canvas.foreground.ctx.globalAlpha = 1;
                    }
                }
            }
        } catch (err) {
            dumpError(err);
        }
    };

    renderDialog = (id, x, y, color, bold, fontSize, fontType) => {
        try {
            let options = "";

            if (bold) {
                options += "bold";
            }

            if (fontSize) {
                options += " " + fontSize + "px";
            }

            if (fontType) {
                options += " " + fontType;
            }

            this.canvas.textos.ctx.font = options;

            if (color) {
                this.canvas.textos.ctx.fillStyle = color;
            }

            const text = this.config.dialogs[id].msg;
            const words = text.split(" ");
            let wordsLine = "";
            let count = 0;
            let currentLine = 0;
            const lineHeight = 20;
            const cantWordsPerLine = 4;
            let posYText = 0;

            const wordsLength = words.length;
            const textLength = text.length;

            if (wordsLength > 4 && textLength >= 30) {
                posYText =
                    (Math.ceil(words.length / cantWordsPerLine) - 1) * 20;
            }

            for (let i = 0; i < wordsLength; i++) {
                if (count <= cantWordsPerLine || textLength < 30) {
                    wordsLine += words[i] + " ";
                }

                count++;

                if (
                    (count >= cantWordsPerLine && textLength >= 30) ||
                    i == wordsLength - 1
                ) {
                    const textPosY = y + lineHeight * currentLine++ - posYText;

                    this.canvas.textos.ctx.strokeStyle = "#000000";
                    this.canvas.textos.ctx.strokeText(
                        wordsLine,
                        x - 20,
                        textPosY
                    );
                    this.canvas.textos.ctx.fillText(
                        wordsLine,
                        x - 20,
                        textPosY
                    );
                    wordsLine = "";
                    count = 0;
                }
            }

            if (this.config.dialogs[id].life > 150) {
                delete this.config.dialogs[id];
            } else {
                if (this.config.dialogs[id].y < 30) {
                    this.config.dialogs[id].y++;
                }
                this.config.dialogs[id].life++;
            }
        } catch (err) {
            dumpError(err);
        }
    };

    renderText = (text, x, y, color, bold, fontSize, fontType) => {
        try {
            let options = "";

            if (bold) {
                options += "bold";
            }

            if (fontSize) {
                options += " " + fontSize + "px";
            }

            if (fontType) {
                options += " " + fontType;
            }

            this.canvas.textos.ctx.font = options;

            if (color) {
                this.canvas.textos.ctx.fillStyle = color;
            }

            this.canvas.textos.ctx.strokeStyle = "#000000";
            this.canvas.textos.ctx.strokeText(text, x, y);
            this.canvas.textos.ctx.fillText(text, x, y);
        } catch (err) {
            dumpError(err);
        }
    };

    renderText2 = (text, x, y, color, bold, fontSize, fontType) => {
        try {
            let options = "";

            if (bold) {
                options += "bold";
            }

            if (fontSize) {
                options += " " + fontSize + "px";
            }

            if (fontType) {
                options += " " + fontType;
            }

            this.canvas.foreground.ctx.font = options;

            if (color) {
                this.canvas.foreground.ctx.fillStyle = color;
            }

            this.canvas.foreground.ctx.strokeStyle = "#000000";
            this.canvas.foreground.ctx.strokeText(text, x, y);
            this.canvas.foreground.ctx.fillText(text, x, y);
        } catch (err) {
            dumpError(err);
        }
    };

    moveTo = (userId, direccion) => {
        if (+Date.now() - this.timeWalk > this.config.timeWalkMS) {
            if (!this.user.inmovilizado) {
                if (this.personajes[userId]) {
                    this.moveScreen(direccion, false);
                }
            } else {
                this.pkg.setPackageID(this.pkg.serverPacketID.position);
                this.pkg.writeByte(direccion);
                this.config.ws.send(this.pkg.dataSend());

                this.personajes[userId].heading = direccion;

                this.timeWalk = +Date.now();
            }
        }
    };

    moveScreen = (direccion, dontSend) => {
        try {
            let x = 0;
            let y = 0;
            let tX = 0;
            let tY = 0;

            switch (direccion) {
                case this.config.direcciones.up:
                    y = -1;
                    break;

                case this.config.direcciones.right:
                    x = 1;
                    break;

                case this.config.direcciones.down:
                    y = 1;
                    break;

                case this.config.direcciones.left:
                    x = -1;
                    break;
            }

            tX = this.user.pos.x + x;
            tY = this.user.pos.y + y;

            if (this.legalPos(tX, tY, this.user.navegando)) {
                this.user.addtoUserPos.x = x;
                this.user.pos.x = tX;
                this.user.addtoUserPos.y = y;
                this.user.pos.y = tY;
                this.user.moving = 1;

                //changePositionPointMinimap(tX, tY);

                this.moveCharByHead(this.user.id, direccion, dontSend);
            } else {
                if (this.personajes[this.user.id].heading != direccion) {
                    this.personajes[this.user.id].heading = direccion;

                    this.pkg.setPackageID(
                        this.pkg.serverPacketID.changeHeading
                    );
                    this.pkg.writeByte(direccion);
                    this.config.ws.send(this.pkg.dataSend());
                }
            }

            this.timeWalk = +Date.now();

            this.react.setState({
                user: this.user
            });
        } catch (err) {
            dumpError(err);
        }
    };

    legalPos = (tX, tY, aguaValida) => {
        if (tX >= 1 && tY >= 1 && tX <= 100 && tY <= 100) {
            let ret = true;

            if (!this.inits.mapa[this.config.mapNumber][tY][tX].b) {
                if (this.inits.mapData[this.config.mapNumber][tY][tX].id) {
                    ret = false;
                } else {
                    ret = true;
                }
            } else {
                ret = false;
            }

            if (this.hayAgua(tX, tY)) {
                if (
                    aguaValida &&
                    !this.inits.mapData[this.config.mapNumber][tY][tX].id
                ) {
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
    };

    hayAgua = (tX, tY) => {
        if (
            (this.inits.mapa[this.config.mapNumber][tY][tX].g[1] >= 1505 &&
                this.inits.mapa[this.config.mapNumber][tY][tX].g[1] <= 1520 &&
                !this.inits.mapa[this.config.mapNumber][tY][tX].g[2]) ||
            (this.inits.mapa[this.config.mapNumber][tY][tX].g[1] >= 5665 &&
                this.inits.mapa[this.config.mapNumber][tY][tX].g[1] <= 5680 &&
                !this.inits.mapa[this.config.mapNumber][tY][tX].g[2]) ||
            (this.inits.mapa[this.config.mapNumber][tY][tX].g[1] >= 13547 &&
                this.inits.mapa[this.config.mapNumber][tY][tX].g[1] <= 13562 &&
                !this.inits.mapa[this.config.mapNumber][tY][tX].g[2])
        ) {
            return true;
        } else {
            return false;
        }
    };

    moveCharByHead = (idPj, heading, dontSend) => {
        try {
            const personaje = this.personajes[idPj];

            if (!personaje) {
                return;
            }

            const oldX = personaje.pos.x;
            const oldY = personaje.pos.y;

            let newX = 0;
            let newY = 0;

            if (heading == this.config.direcciones.right) {
                newX = 1;
            } else if (heading == this.config.direcciones.left) {
                newX = -1;
            } else if (heading == this.config.direcciones.down) {
                newY = 1;
            } else if (heading == this.config.direcciones.up) {
                newY = -1;
            }

            const posX = oldX + newX;
            const posY = oldY + newY;

            personaje.heading = heading;

            this.inits.mapData[this.config.mapNumber][oldY][oldX].id = 0;
            this.inits.mapData[this.config.mapNumber][posY][posX].id = idPj;

            personaje.moving = true;

            personaje.pos.x = posX;
            personaje.pos.y = posY;

            personaje.moveOffsetX = -1 * (32 * newX);
            personaje.moveOffsetY = -1 * (32 * newY);

            personaje.scrollDirectionX = this.sign(newX);
            personaje.scrollDirectionY = this.sign(newY);

            //if (!personaje.muerto) spellSound(24);

            if (!dontSend) {
                this.timeWalk = +Date.now();

                this.pkg.setPackageID(this.pkg.serverPacketID.position);
                this.pkg.writeByte(heading);
                this.config.ws.send(this.pkg.dataSend());
            }
        } catch (err) {
            dumpError(err);
        }
    };

    moveCharByPos = (idPj, posX, posY) => {
        try {
            const personaje = this.personajes[idPj];

            if (!personaje) {
                return;
            }

            const oldX = personaje.pos.x;
            const oldY = personaje.pos.y;

            let newX = 0;
            let newY = 0;

            let heading = 0;

            newX = posX - oldX;
            newY = posY - oldY;

            if (this.sign(newX) == 1) {
                heading = this.config.direcciones.right;
            } else if (this.sign(newX) == -1) {
                heading = this.config.direcciones.left;
            } else if (this.sign(newY) == 1) {
                heading = this.config.direcciones.down;
            } else if (this.sign(newY) == -1) {
                heading = this.config.direcciones.up;
            }

            personaje.heading = heading;

            /*if (!legalPos(posX, posY)) {
                return;
            }*/

            this.inits.mapData[this.config.mapNumber][oldY][oldX].id = 0;
            this.inits.mapData[this.config.mapNumber][posY][posX].id = idPj;

            personaje.moving = true;

            personaje.pos.x = posX;
            personaje.pos.y = posY;

            personaje.heading = heading;

            personaje.moveOffsetX = -1 * (32 * newX);
            personaje.moveOffsetY = -1 * (32 * newY);

            personaje.scrollDirectionX = this.sign(newX);
            personaje.scrollDirectionY = this.sign(newY);

            //if (!personaje.muerto) spellSound(24);
        } catch (err) {
            dumpError(err);
        }
    };

    validSendPosition = (posX, posY) => {
        if (
            this.user.pos.x < posX + 10 &&
            this.user.pos.x > posX - 10 &&
            this.user.pos.y < posY + 11 &&
            this.user.pos.y > posY - 11
        ) {
            return true;
        } else {
            return false;
        }
    };

    respawnMe = (idPj, numMap, posX, posY) => {
        try {
            const personaje = this.personajes[idPj];

            if (!personaje) {
                return;
            }

            if (this.config.mapNumber != numMap) {
                this.inits.mapData[this.config.mapNumber] = [];

                for (let y = 1; y <= 100; y++) {
                    this.inits.mapData[this.config.mapNumber][y] = [];

                    for (let x = 1; x <= 100; x++) {
                        this.inits.mapData[this.config.mapNumber][y][x] = {
                            id: 0
                        };
                    }
                }

                this.config.mapNumber = numMap;

                this.user.pos.x = posX;
                this.user.pos.y = posY;

                personaje.pos.x = posX;
                personaje.pos.y = posY;

                this.inits.mapData[this.config.mapNumber][posY][posX].id = idPj;

                this.renderBackground(0, 0);
            } else {
                this.inits.mapData[this.config.mapNumber][
                    this.personajes[idPj].pos.y
                ][this.personajes[idPj].pos.x].id = 0;

                this.user.pos.x = posX;
                this.user.pos.y = posY;

                personaje.pos.x = posX;
                personaje.pos.y = posY;

                this.inits.mapData[this.config.mapNumber][posY][posX].id = idPj;

                this.renderBackground(0, 0);
            }
        } catch (err) {
            dumpError(err);
        }
    };

    respawn = (idPj, posX, posY) => {
        try {
            const personaje = this.personajes[idPj];

            if (!personaje) {
                return;
            }

            this.inits.mapData[this.config.mapNumber][
                this.personajes[idPj].pos.y
            ][this.personajes[idPj].pos.x].id = 0;

            personaje.pos.x = posX;
            personaje.pos.y = posY;

            this.inits.mapData[this.config.mapNumber][posY][posX].id = idPj;
        } catch (err) {
            dumpError(err);
        }
    };

    sign = x => {
        return x > 0 ? 1 : x < 0 ? -1 : 0;
    };
}

function dumpError(err) {
    if (typeof err === "object") {
        if (err.message) {
            console.log("\nMessage: " + err.message);
        }
        if (err.stack) {
            console.log("\nStacktrace:");
            console.log("====================");
            console.log(err.stack);
        }
    } else {
        console.log("dumpError :: argument is not an object");
    }
}

export default Engine;
