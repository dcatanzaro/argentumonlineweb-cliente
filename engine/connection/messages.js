import { htmlEntities } from "../utils";

class Messages {
    constructor(user, engine, inits, pkg, config, game, react) {
        this.user = user;
        this.engine = engine;
        this.inits = inits;
        this.pkg = pkg;
        this.config = config;
        this.game = game;
        this.react = react;

        this.dictionaryClient = {
            [this.pkg.clientPacketID.getMyCharacter]: this.getMyCharacter,
            [this.pkg.clientPacketID.getCharacter]: this.getCharacter,
            [this.pkg.clientPacketID.changeRopa]: this.changeRopa,
            [this.pkg.clientPacketID.changeHelmet]: this.changeHelmet,
            [this.pkg.clientPacketID.changeWeapon]: this.changeWeapon,
            [this.pkg.clientPacketID.changeArrow]: this.changeArrow,
            [this.pkg.clientPacketID.actPosition]: this.actPosition,
            [this.pkg.clientPacketID.changeHeading]: this.changeHeading,
            [this.pkg.clientPacketID.deleteCharacter]: this.deleteCharacter,
            [this.pkg.clientPacketID.dialog]: this.dialog,
            [this.pkg.clientPacketID.console]: this.dataConsole,
            [this.pkg.clientPacketID.pong]: this.pong,
            [this.pkg.clientPacketID.animFX]: this.animFX,
            [this.pkg.clientPacketID.inmo]: this.inmo,
            [this.pkg.clientPacketID.updateHP]: this.updateHP,
            [this.pkg.clientPacketID.updateMaxHP]: this.updateMaxHP,
            [this.pkg.clientPacketID.updateMana]: this.updateMana,
            [this.pkg.clientPacketID.telepMe]: this.telepMe,
            [this.pkg.clientPacketID.actOnline]: this.actOnline,
            [this.pkg.clientPacketID.consoleOnline]: this.consoleOnline,
            [this.pkg.clientPacketID.actPositionServer]: this.actPositionServer,
            [this.pkg.clientPacketID.actExp]: this.actExp,
            [this.pkg.clientPacketID.actMyLevel]: this.actMyLevel,
            [this.pkg.clientPacketID.actGold]: this.actGold,
            [this.pkg.clientPacketID.actColorName]: this.actColorName,
            [this.pkg.clientPacketID.error]: this.error,
            [this.pkg.clientPacketID.changeName]: this.changeName,
            [this.pkg.clientPacketID.changeShield]: this.changeShield,
            [this.pkg.clientPacketID.getNpc]: this.getNpc,
            [this.pkg.clientPacketID.changeShield]: this.changeShield,
            [this.pkg.clientPacketID.putBodyAndHeadDead]: this
                .putBodyAndHeadDead,
            [this.pkg.clientPacketID.revivirUsuario]: this.revivirUsuario,
            [this.pkg.clientPacketID.quitarUserInvItem]: this.quitarUserInvItem,
            [this.pkg.clientPacketID.renderItem]: this.renderItem,
            [this.pkg.clientPacketID.deleteItem]: this.deleteItem,
            [this.pkg.clientPacketID.agregarUserInvItem]: this
                .agregarUserInvItem,
            [this.pkg.clientPacketID.blockMap]: this.blockMap,
            [this.pkg.clientPacketID.changeObjIndex]: this.changeObjIndex,
            [this.pkg.clientPacketID.openTrade]: this.openTrade,
            [this.pkg.clientPacketID.aprenderSpell]: this.aprenderSpell,
            [this.pkg.clientPacketID.closeForce]: this.closeForce,
            [this.pkg.clientPacketID.nameMap]: this.nameMap,
            [this.pkg.clientPacketID.changeBody]: this.changeBody,
            [this.pkg.clientPacketID.navegando]: this.navegando,
            [this.pkg.clientPacketID.updateAgilidad]: this.updateAgilidad,
            [this.pkg.clientPacketID.updateFuerza]: this.updateFuerza,
            [this.pkg.clientPacketID.playSound]: this.playSound
        };
    }

    connectionMessages = res => {
        this.pkg.setData(res.data);

        const packageID = this.pkg.getPackageID();

        this.dictionaryClient[packageID]();
    };

    getMyCharacter = () => {
        this.user.id = parseInt(this.pkg.getDouble());
        this.user.nameCharacter = this.pkg.getString();
        this.user.idClase = this.pkg.getByte();
        this.config.mapNumber = this.pkg.getShort();
        this.user.pos.x = this.pkg.getByte();
        this.user.pos.y = this.pkg.getByte();
        this.user.idHead = this.pkg.getShort();
        this.user.idHelmet = this.pkg.getShort();
        this.user.idWeapon = this.pkg.getShort();
        this.user.idShield = this.pkg.getShort();
        this.user.idBody = this.pkg.getShort();
        this.user.hp = this.pkg.getShort();
        this.user.maxHp = this.pkg.getShort();
        this.user.mana = this.pkg.getShort();
        this.user.maxMana = this.pkg.getShort();
        this.user.privileges = this.pkg.getByte();
        this.user.exp = this.pkg.getDouble();
        this.user.expNextLevel = this.pkg.getDouble();
        this.user.level = this.pkg.getByte();
        this.user.gold = this.pkg.getInt();
        this.user.heading = this.pkg.getByte();
        this.user.inmovilizado = this.pkg.getByte();
        this.user.zonaSegura = this.pkg.getByte();
        this.user.color = this.pkg.getString();
        this.user.clan = this.pkg.getString();
        this.user.navegando = this.pkg.getByte();

        this.user.attrAgilidad = this.pkg.getByte();
        this.user.attrFuerza = this.pkg.getByte();

        const itemsLength = this.pkg.getByte();

        for (let i = 0; i < itemsLength; i++) {
            const idPos = this.pkg.getByte();

            this.user.items[idPos] = {
                idItem: this.pkg.getInt(),
                nameItem: this.pkg.getString(),
                equipped: this.pkg.getByte(),
                grhIndex: this.pkg.getShort(),
                cant: this.pkg.getShort(),
                gold: this.pkg.getInt(),
                objType: this.pkg.getByte(),
                validUser: this.pkg.getByte(),
                info: this.pkg.getString()
            };
        }

        if (this.user.maxMana > 0) {
            const spellsLength = this.pkg.getByte();

            for (let i = 0; i < spellsLength; i++) {
                const idPos = this.pkg.getByte();

                this.user.spells[idPos] = {
                    idSpell: this.pkg.getShort(),
                    name: this.pkg.getString(),
                    manaRequired: this.pkg.getShort()
                };
            }
        }

        this.react.setState({
            user: this.user
        });

        let tmpPersonaje = JSON.parse(JSON.stringify(this.user));
        tmpPersonaje.moveOffsetX = 0;
        tmpPersonaje.moveOffsetY = 0;
        tmpPersonaje.fxId = 0;
        tmpPersonaje.frameFxCounter = 0;
        tmpPersonaje.scrollDirectionX = 0;
        tmpPersonaje.scrollDirectionY = 0;
        tmpPersonaje.moving = 0;
        tmpPersonaje.frameCounter = 0;
        tmpPersonaje.frameCounterWeapon = 0;
        tmpPersonaje.color = this.user.color;
        tmpPersonaje.clan = this.user.clan;

        this.engine.setPersonaje(tmpPersonaje);

        this.engine.setMapData(
            this.config.mapNumber,
            this.user.pos,
            this.user.id
        );

        if (!this.config.engineStart) {
            this.engine.loop();
            this.config.engineStart = true;
        }

        this.engine.renderBackground(0, 0);
    };

    getCharacter = () => {
        var id = this.pkg.getDouble();

        var tmpPersonaje = {};

        tmpPersonaje.id = id;
        tmpPersonaje.nameCharacter = this.pkg.getString();
        tmpPersonaje.idClase = this.pkg.getByte();
        tmpPersonaje.pos = {
            x: 0,
            y: 0
        };
        tmpPersonaje.map = this.pkg.getShort();
        tmpPersonaje.pos.x = this.pkg.getByte();
        tmpPersonaje.pos.y = this.pkg.getByte();
        tmpPersonaje.idHead = this.pkg.getShort();
        tmpPersonaje.idHelmet = this.pkg.getShort();
        tmpPersonaje.idWeapon = this.pkg.getShort();
        tmpPersonaje.idShield = this.pkg.getShort();
        tmpPersonaje.idBody = this.pkg.getShort();
        tmpPersonaje.isNpc = false;
        tmpPersonaje.privileges = this.pkg.getByte();
        tmpPersonaje.heading = this.pkg.getByte();
        tmpPersonaje.color = this.pkg.getString();
        tmpPersonaje.clan = this.pkg.getString();

        tmpPersonaje.moveOffsetX = 0;
        tmpPersonaje.moveOffsetY = 0;
        tmpPersonaje.fxId = 0;
        tmpPersonaje.frameFxCounter = 0;
        tmpPersonaje.scrollDirectionX = 0;
        tmpPersonaje.scrollDirectionY = 0;
        tmpPersonaje.moving = 0;
        tmpPersonaje.frameCounter = 0;

        this.engine.setPersonaje(tmpPersonaje);

        this.engine.setMapData(
            this.config.mapNumber,
            tmpPersonaje.pos,
            tmpPersonaje.id
        );
    };

    getNpc = () => {
        const id = this.pkg.getDouble();

        let tmpPersonaje = {};

        tmpPersonaje.id = id;
        tmpPersonaje.nameCharacter = this.pkg.getString();
        tmpPersonaje.idClase = this.pkg.getByte();
        tmpPersonaje.pos = {
            x: 0,
            y: 0
        };
        tmpPersonaje.map = this.pkg.getShort();
        tmpPersonaje.pos.x = this.pkg.getByte();
        tmpPersonaje.pos.y = this.pkg.getByte();
        tmpPersonaje.idHead = this.pkg.getShort();
        tmpPersonaje.idHelmet = this.pkg.getShort();
        tmpPersonaje.idWeapon = this.pkg.getShort();
        tmpPersonaje.idShield = this.pkg.getShort();
        tmpPersonaje.idBody = this.pkg.getShort();
        tmpPersonaje.isNpc = true;
        tmpPersonaje.heading = this.pkg.getByte();
        tmpPersonaje.color = this.pkg.getString();
        tmpPersonaje.clan = this.pkg.getString();

        tmpPersonaje.moveOffsetX = 0;
        tmpPersonaje.moveOffsetY = 0;
        tmpPersonaje.fxId = 0;
        tmpPersonaje.frameFxCounter = 0;
        tmpPersonaje.scrollDirectionX = 0;
        tmpPersonaje.scrollDirectionY = 0;
        tmpPersonaje.moving = 0;
        tmpPersonaje.frameCounter = 0;

        this.engine.setPersonaje(tmpPersonaje);

        this.engine.setMapData(
            this.config.mapNumber,
            tmpPersonaje.pos,
            tmpPersonaje.id
        );
    };

    changeName = () => {
        const id = this.pkg.getDouble();

        this.engine.setAttrPersonaje(id, "nameCharacter", this.pkg.getString());
    };

    changeRopa = () => {
        const id = this.pkg.getDouble();
        const grhRopa = this.pkg.getShort();
        const idPos = this.pkg.getByte();

        if (id == this.user.id) {
            for (let idIndexPos in this.user.items) {
                const item = this.user.items[idIndexPos];

                if (item.objType == this.config.objType.armaduras) {
                    if (idIndexPos != idPos) {
                        this.user.items[idIndexPos].equipped = false;
                    }
                }
            }

            const item = this.user.items[idPos];

            this.user.items[idPos].equipped = !item.equipped;

            this.react.setState({
                user: this.user
            });
        }

        this.engine.setAttrPersonaje(id, "idBody", grhRopa);
    };

    changeHelmet = () => {
        const id = this.pkg.getDouble();
        const grhHelmet = this.pkg.getShort();

        const idPos = this.pkg.getByte();

        if (id == this.user.id) {
            for (let idIndexPos in this.user.items) {
                const item = this.user.items[idIndexPos];

                if (item.objType == this.config.objType.cascos) {
                    if (idIndexPos != idPos) {
                        this.user.items[idIndexPos].equipped = false;
                    }
                }
            }

            const item = this.user.items[idPos];

            this.user.items[idPos].equipped = !item.equipped;

            this.react.setState({
                user: this.user
            });
        }

        this.engine.setAttrPersonaje(id, "idHelmet", grhHelmet);
    };

    changeWeapon = () => {
        const id = this.pkg.getDouble();
        const grhWeapon = this.pkg.getShort();

        const idPos = this.pkg.getByte();

        if (id == this.user.id) {
            for (let idIndexPos in this.user.items) {
                const item = this.user.items[idIndexPos];

                if (item.objType == this.config.objType.armas) {
                    if (idIndexPos != idPos) {
                        this.user.items[idIndexPos].equipped = false;
                    }
                }
            }

            const item = this.user.items[idPos];

            this.user.items[idPos].equipped = !item.equipped;

            this.react.setState({
                user: this.user
            });
        }

        this.engine.setAttrPersonaje(id, "idWeapon", grhWeapon);
    };

    changeArrow = () => {
        const id = this.pkg.getDouble();
        const idPos = this.pkg.getByte();

        if (id == this.user.id) {
            for (let idIndexPos in this.user.items) {
                const item = this.user.items[idIndexPos];

                if (item.objType == this.config.objType.flechas) {
                    if (idIndexPos != idPos) {
                        this.user.items[idIndexPos].equipped = false;
                    }
                }
            }

            const item = this.user.items[idPos];

            this.user.items[idPos].equipped = !item.equipped;

            this.react.setState({
                user: this.user
            });
        }
    };

    changeShield = () => {
        const id = this.pkg.getDouble();
        const grhShield = this.pkg.getShort();

        const idPos = this.pkg.getByte();

        if (id == this.user.id) {
            for (let idIndexPos in this.user.items) {
                const item = this.user.items[idIndexPos];

                if (item.objType == this.config.objType.escudos) {
                    if (idIndexPos != idPos) {
                        this.user.items[idIndexPos].equipped = false;
                    }
                }
            }

            const item = this.user.items[idPos];

            this.user.items[idPos].equipped = !item.equipped;

            this.react.setState({
                user: this.user
            });
        }

        this.engine.setAttrPersonaje(id, "idShield", grhShield);
    };

    actPosition = () => {
        const id = this.pkg.getDouble();
        const x = this.pkg.getByte();
        const y = this.pkg.getByte();

        this.engine.moveCharByPos(id, x, y);
    };

    changeHeading = () => {
        const id = this.pkg.getDouble();
        const heading = this.pkg.getByte();

        this.engine.setAttrPersonaje(id, "heading", heading);
    };

    dialog = () => {
        const id = this.pkg.getDouble();
        const msg = this.pkg.getString();
        const haveName = this.pkg.getByte();
        let name = "";

        if (haveName) {
            name = this.pkg.getString();
        }

        const color = this.pkg.getString();
        const consoleFlag = this.pkg.getByte();

        this.config.dialogs[id] = {
            msg: msg,
            color: color,
            life: 0,
            y: 20
        };

        if (consoleFlag) {
            this.game.writeConsole(
                "[" + name + "]  " + htmlEntities(msg),
                this.config.dialogs[id].color,
                0,
                1
            );
        }
    };

    dataConsole = () => {
        const msg = this.pkg.getString();
        const haveColor = this.pkg.getByte();

        let color = "";
        if (haveColor) {
            color = this.pkg.getString();
        }

        const bold = this.pkg.getByte();
        const italic = this.pkg.getByte();

        this.game.writeConsole(msg, color, bold, italic);
    };

    pong = () => {
        this.engine.ping = +Date.now() - this.config.pingStart;
    };

    animFX = () => {
        const id = this.pkg.getDouble();
        const fxID = this.pkg.getShort();

        this.engine.setAttrPersonaje(id, "fxId", fxID);
    };

    playSound = () => {
        const idSound = this.pkg.getByte();

        if (idSound !== 0) {
            //spellSound(idSound);
        }
    };

    inmo = () => {
        const inmovilizado = this.pkg.getByte();
        const pos = {
            x: this.pkg.getByte(),
            y: this.pkg.getByte()
        };

        this.user.inmovilizado = inmovilizado;

        this.engine.inmovilizado(pos);
    };

    updateHP = () => {
        const hp = this.pkg.getShort();

        this.user.hp = hp;

        this.react.setState({
            user: this.user
        });
    };

    updateMaxHP = () => {
        const hp = this.pkg.getShort();
        const maxHp = this.pkg.getShort();

        this.user.hp = hp;
        this.user.maxHp = maxHp;

        this.react.setState({
            user: this.user
        });
    };

    updateMana = () => {
        const mana = this.pkg.getShort();

        this.user.mana = mana;

        this.react.setState({
            user: this.user
        });
    };

    updateAgilidad = () => {
        const agilidad = this.pkg.getByte();

        this.user.attrAgilidad = agilidad;

        this.react.setState({
            user: this.user
        });
    };

    updateFuerza = () => {
        const fuerza = this.pkg.getByte();

        this.user.attrFuerza = fuerza;

        this.react.setState({
            user: this.user
        });
    };

    deleteCharacter = () => {
        const id = this.pkg.getDouble();

        this.engine.deletePersonaje(id);
    };

    telepMe = () => {
        const id = this.pkg.getDouble();

        const numMap = this.pkg.getShort();

        const pos = {
            x: this.pkg.getByte(),
            y: this.pkg.getByte()
        };

        this.engine.respawnMe(id, numMap, pos.x, pos.y);
    };

    actOnline = () => {
        this.config.usersOnline = this.pkg.getShort();
    };

    consoleOnline = () => {};

    actPositionServer = () => {
        const pos = {
            x: this.pkg.getByte(),
            y: this.pkg.getByte()
        };

        const heading = this.pkg.getByte();

        this.engine.actPositionServer(pos, heading);
    };

    actExp = () => {
        const exp = this.pkg.getDouble();

        this.user.exp = exp;

        this.react.setState({
            user: this.user
        });
    };

    actMyLevel = () => {
        const exp = this.pkg.getDouble();
        const expNextLevel = this.pkg.getDouble();
        const lvl = this.pkg.getByte();
        const hp = this.pkg.getShort();
        const mana = this.pkg.getShort();

        this.user.exp = exp;
        this.user.expNextLevel = expNextLevel;
        this.user.lvl = lvl;
        this.user.hp = hp;
        this.user.maxHp = hp;
        this.user.maxMana = mana;

        this.react.setState({
            user: this.user
        });
    };

    actGold = () => {
        const gold = this.pkg.getInt();

        this.user.gold = gold;

        this.react.setState({
            user: this.user
        });
    };

    actColorName = () => {
        const id = this.pkg.getDouble();
        const color = this.pkg.getString();

        this.engine.setAttrPersonaje(id, "color", color);
    };

    error = () => {
        alert(this.pkg.getString());
    };

    putBodyAndHeadDead = () => {
        const id = this.pkg.getDouble();
        const idHead = this.pkg.getShort();
        const idHelmet = this.pkg.getShort();
        const idWeapon = this.pkg.getShort();
        const idShield = this.pkg.getShort();
        const idBody = this.pkg.getShort();

        if (this.user.id == id) {
            for (let idIndexPos in this.user.items) {
                this.user.items[idIndexPos].equipped = 0;
            }
        }

        this.react.setState({
            user: this.user
        });

        this.engine.setAttrPersonaje(id, "idHead", idHead);
        this.engine.setAttrPersonaje(id, "idHelmet", idHelmet);
        this.engine.setAttrPersonaje(id, "idWeapon", idWeapon);
        this.engine.setAttrPersonaje(id, "idShield", idShield);
        this.engine.setAttrPersonaje(id, "idBody", idBody);
        this.engine.setAttrPersonaje(id, "muerto", true);
    };

    revivirUsuario = () => {
        const id = this.pkg.getDouble();
        const idHead = this.pkg.getShort();
        const idBody = this.pkg.getShort();

        this.engine.setAttrPersonaje(id, "idHead", idHead);
        this.engine.setAttrPersonaje(id, "idBody", idBody);
        this.engine.setAttrPersonaje(id, "muerto", false);
    };

    quitarUserInvItem = () => {
        const { showModalTrade, trade } = this.react.state;

        const idUser = this.pkg.getDouble();
        const idPos = this.pkg.getByte();
        const cant = this.pkg.getShort();

        const cantOld = this.user.items[idPos].cant;

        const newCant = cantOld - cant;

        if (newCant <= 0) {
            delete this.user.items[idPos];

            if (showModalTrade) {
                delete trade.itemsUser[idPos];
            }
        } else {
            this.user.items[idPos].cant = newCant;

            if (showModalTrade) {
                trade.itemsUser[idPos].cant = newCant;
            }
        }

        this.react.setState({
            user: this.user,
            trade: trade
        });
    };

    renderItem = () => {
        const idItem = this.pkg.getInt(),
            idMap = this.pkg.getShort(),
            posX = this.pkg.getByte(),
            posY = this.pkg.getByte();

        this.inits.mapa[idMap][posY][posX].o = {
            oi: idItem
        };

        this.engine.updateItems(0, 0);
    };

    deleteItem = () => {
        const idMap = this.pkg.getShort(),
            posX = this.pkg.getByte(),
            posY = this.pkg.getByte();

        delete this.inits.mapa[idMap][posY][posX].o;

        this.engine.updateItems(0, 0);
    };

    agregarUserInvItem = () => {
        const { showModalTrade, trade } = this.react.state;

        const idPos = this.pkg.getByte();

        this.user.items[idPos] = {
            idItem: this.pkg.getInt(),
            nameItem: this.pkg.getString(),
            equipped: this.pkg.getByte(),
            grhIndex: this.pkg.getShort(),
            cant: this.pkg.getShort(),
            gold: this.pkg.getInt(),
            objType: this.pkg.getByte(),
            validUser: this.pkg.getByte(),
            info: this.pkg.getString()
        };

        if (showModalTrade) {
            const item = this.user.items[idPos];

            trade.itemsUser[idPos] = {
                idPos: idPos,
                name: item.nameItem,
                cant: item.cant,
                info: item.info,
                gold: item.gold,
                imgItem: `/static/graficos/${
                    this.inits.graphics[item.grhIndex].numFile
                }.png`,
                validUser: item.validUser,
                equipped: item.equipped
            };
        }

        this.react.setState({
            user: this.user,
            trade: trade
        });
    };

    blockMap = () => {
        const idMap = this.pkg.getShort();
        const posX = this.pkg.getByte();
        const posY = this.pkg.getByte();
        const blocked = this.pkg.getByte();

        this.inits.mapa[idMap][posY][posX].b = blocked;
    };

    changeObjIndex = () => {
        const idMap = this.pkg.getShort();
        const posX = this.pkg.getByte();
        const posY = this.pkg.getByte();
        const objIndex = this.pkg.getShort();

        this.inits.mapa[idMap][posY][posX].o.oi = objIndex;
    };

    openTrade = () => {
        const { trade } = this.react.state;

        let itemsLength = this.pkg.getByte();

        this.user.npcTrade = true;

        trade.itemsTrade = {};

        for (let i = 0; i < itemsLength; i++) {
            const objIndex = this.pkg.getShort();
            const name = this.pkg.getString();
            const cant = this.pkg.getShort();
            const gold = this.pkg.getInt();
            const itemValidUser = this.pkg.getByte();
            const info = this.pkg.getString();

            trade.itemsTrade[i] = {
                idPos: i,
                name: name,
                info: info,
                cant: cant,
                gold: parseInt(gold / 2),
                imgItem: `/static/graficos/${
                    this.inits.graphics[objIndex].numFile
                }.png`,
                validUser: itemValidUser
            };
        }

        trade.itemsUser = {};

        itemsLength = this.pkg.getByte();

        for (let i = 0; i < itemsLength; i++) {
            const objIndexItemInv = this.pkg.getShort();
            const nameItemInv = this.pkg.getString();
            const cantItemInv = this.pkg.getShort();
            const goldItemInv = this.pkg.getInt();
            const equippedItemInv = this.pkg.getByte();
            const idPos = this.pkg.getByte();
            const itemValidUserItemInv = this.pkg.getByte();
            const infoItemInv = this.pkg.getString();

            trade.itemsUser[idPos] = {
                idPos: idPos,
                name: nameItemInv,
                cant: cantItemInv,
                info: infoItemInv,
                gold: goldItemInv,
                imgItem: `/static/graficos/${
                    this.inits.graphics[objIndexItemInv].numFile
                }.png`,
                validUser: itemValidUserItemInv,
                equipped: equippedItemInv
            };
        }

        this.react.setState({
            showModalTrade: true,
            trade: trade
        });
    };

    aprenderSpell = () => {
        const idPos = this.pkg.getByte();

        this.user.spells[idPos] = {
            idSpell: this.pkg.getShort(),
            name: this.pkg.getString(),
            manaRequired: this.pkg.getShort()
        };

        this.react.setState({
            user: this.user
        });
    };

    closeForce = () => {
        this.config.varCloseForce = true;
    };

    nameMap = () => {
        const name = this.pkg.getString();

        this.react.setState({
            nameMap: name
        });
    };

    changeBody = () => {
        const id = this.pkg.getDouble();

        this.engine.setAttrPersonaje(id, "idHead", this.pkg.getShort());
        this.engine.setAttrPersonaje(id, "idBody", this.pkg.getShort());
        this.engine.setAttrPersonaje(id, "idHelmet", this.pkg.getShort());
        this.engine.setAttrPersonaje(id, "idWeapon", this.pkg.getShort());
        this.engine.setAttrPersonaje(id, "idShield", this.pkg.getShort());
    };

    navegando = () => {
        this.user.navegando = this.pkg.getByte();

        this.react.setState({
            user: this.user
        });
    };
}

export default Messages;
