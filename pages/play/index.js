import React from "react";
import { connect } from "react-redux";

import inits from "../../engine/inits";

import _ from "lodash";

import { fetchUrl, routerPush } from "../../config/utils";

import style from "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {
    static async getInitialProps({ reduxStore, req }) {}

    constructor(props) {
        super(props);

        this.nameKeyCode = {
            flechaArriba: 0,
            flechaAbajo: 1,
            flechaIzquierda: 2,
            flechaDerecha: 3,
            usar: 4,
            atacar: 5,
            agarrar: 6,
            tirar: 7,
            equipar: 8,
            domar: 9,
            robar: 10,
            seguro: 11
        };

        this.state = {
            showModalControlPanel: false,
            showInventary: true,
            showMacroConfig: false,
            loading: true,
            user: {},
            selectItem: 0,
            showConsole: true,
            messagesConsole: [],
            crosshair: false,
            nameMap: "",
            showModalReconnect: false,
            showInputText: false,
            textDialog: "",
            showModalTrade: false,
            trade: {
                idPosTrade: 0,
                idPosInv: 0,
                titleItem: "",
                infoItem: "",
                imgItem: "",
                goldItem: "",
                itemsTrade: {},
                itemsUser: {}
            },
            cantTrade: 1,
            mapasToLoad: 0,
            mapasCargados: 0,
            keyMacro: {
                indexMacro: "",
                idPosItem: "",
                idSpell: "",
                idPosSpell: "",
                key: "",
                keyChar: ""
            },
            valueKeyMacro: [
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                }
            ],
            keyCodeMacros: {},
            tmpKeyCodeDefault: {},
            keyCodeDefault: {
                [this.nameKeyCode.flechaArriba]: 38,
                [this.nameKeyCode.flechaAbajo]: 40,
                [this.nameKeyCode.flechaIzquierda]: 37,
                [this.nameKeyCode.flechaDerecha]: 39,
                [this.nameKeyCode.usar]: 85,
                [this.nameKeyCode.atacar]: 17,
                [this.nameKeyCode.agarrar]: 65,
                [this.nameKeyCode.tirar]: 84,
                [this.nameKeyCode.equipar]: 69,
                [this.nameKeyCode.domar]: 68,
                [this.nameKeyCode.robar]: 82,
                [this.nameKeyCode.seguro]: 83
            },
            keyCodeDefaultReset: {
                [this.nameKeyCode.flechaArriba]: 38,
                [this.nameKeyCode.flechaAbajo]: 40,
                [this.nameKeyCode.flechaIzquierda]: 37,
                [this.nameKeyCode.flechaDerecha]: 39,
                [this.nameKeyCode.usar]: 85,
                [this.nameKeyCode.atacar]: 17,
                [this.nameKeyCode.agarrar]: 65,
                [this.nameKeyCode.tirar]: 84,
                [this.nameKeyCode.equipar]: 69,
                [this.nameKeyCode.domar]: 68,
                [this.nameKeyCode.robar]: 82,
                [this.nameKeyCode.seguro]: 83
            },
            charKeyCodeDefault: {}
        };

        this.macros = [];
        this.modalMacro = {};

        this.canvas = {
            background: {},
            techos: {},
            foreground: {},
            items: {},
            textos: {}
        };

        this.clickUse = 0;
        this.lastClickIdItem = 0;

        this.pkg = {};
        this.user = {};
        this.general = {};
        this.game = {};
        this.engine = {};
        this.messages = {};
        this.connection = {};
        this.config = {};
    }

    charKeyCodeDefault = () => {
        let { keyCodeDefault, charKeyCodeDefault } = this.state;

        Object.keys(keyCodeDefault).map(key => {
            const keyCode = keyCodeDefault[key];

            let fromChar = String.fromCharCode(keyCode);

            if (this.config.keyCodeMap[keyCode]) {
                fromChar = this.config.keyCodeMap[keyCode];
            }

            charKeyCodeDefault[key] = fromChar;
        });

        this.setState({
            charKeyCodeDefault: charKeyCodeDefault
        });
    };

    async componentDidMount() {
        inits.setReact(this);

        const macros = window.localStorage.getItem("macros");

        if (macros) {
            let tmpKeyCodeMacros = {};
            const jsonMacros = JSON.parse(macros);

            jsonMacros.map((macro, index) => {
                if (macro.key) {
                    tmpKeyCodeMacros[macro.key] = index;
                }
            });

            this.setState({
                valueKeyMacro: jsonMacros,
                keyCodeMacros: tmpKeyCodeMacros
            });
        }

        const defaultKeys = window.localStorage.getItem("defaultKeys");

        if (defaultKeys) {
            const jsonDefaultKeys = JSON.parse(defaultKeys);

            await this.setState({
                keyCodeDefault: _.cloneDeep(jsonDefaultKeys),
                tmpKeyCodeDefault: _.cloneDeep(jsonDefaultKeys)
            });
        }

        this.config = require("../../engine/config").default;
        const Engine = require("../../engine/engine").default;
        const General = require("../../engine/general").default;
        const Messages = require("../../engine/connection/messages").default;
        const Connection = require("../../engine/connection/connection")
            .default;
        const Game = require("../../engine/game").default;
        const User = require("../../engine/user").default;
        const Package = require("../../engine/connection/package").default;

        this.pkg = new Package();
        this.user = new User();

        this.general = new General(this.pkg, this.config);
        this.game = new Game(inits, this.user, this.pkg, this.config, this);
        this.engine = new Engine(
            inits,
            this.user,
            this.pkg,
            this.config,
            this.game,
            this.canvas,
            this
        );
        this.messages = new Messages(
            this.user,
            this.engine,
            inits,
            this.pkg,
            this.config,
            this.game,
            this
        );
        this.connection = new Connection(
            this.messages,
            this.pkg,
            this.game,
            this.engine,
            this.user,
            this.config,
            this
        );

        this.charKeyCodeDefault();

        await this.engine.initCanvas();

        this.connection.startWebSocket();

        this.setState({
            loading: false
        });

        document.oncontextmenu = e => {
            e.stopPropagation();
            return false;
        };

        document.onkeyup = e => {
            const {
                selectItem,
                showInputText,
                textDialog,
                showMacroConfig,
                valueKeyMacro,
                keyCodeMacros
            } = this.state;
            const keyCode = e.keyCode;

            if (showMacroConfig) return;

            if (!showInputText && !isNaN(parseInt(keyCodeMacros[keyCode]))) {
                const macro = valueKeyMacro[keyCodeMacros[keyCode]];

                if (macro.idPosItem !== "") {
                    this.game.useItem(macro.idPosItem);
                } else if (macro.idSpell !== "") {
                    this.selectSpell(macro.idPosSpell);
                }

                return;
            }

            //Usar
            if (
                keyCode ==
                    this.state.keyCodeDefault[this.config.nameKeyCode.usar] &&
                !showInputText
            ) {
                if (selectItem) this.game.useItem(selectItem);
            }

            //Equipar
            if (
                keyCode ==
                    this.state.keyCodeDefault[
                        this.config.nameKeyCode.equipar
                    ] &&
                !showInputText
            ) {
                const item = this.user.items[selectItem];

                if (selectItem && item)
                    this.game.equiparItem(selectItem, item.idItem);
            }

            //Agarrar
            if (
                keyCode ==
                    this.state.keyCodeDefault[
                        this.config.nameKeyCode.agarrar
                    ] &&
                !showInputText
            ) {
                this.pkg.setPackageID(this.pkg.serverPacketID.agarrarItem);
                this.config.ws.send(this.pkg.dataSend());
            }

            //Tirar
            if (
                keyCode ==
                    this.state.keyCodeDefault[this.config.nameKeyCode.tirar] &&
                !showInputText
            ) {
                let cantItem = 1;

                if (selectItem) {
                    cantItem = prompt("¿Cuántos quieres tirar?", 1);
                }

                if (cantItem > 0) {
                    this.pkg.setPackageID(this.pkg.serverPacketID.tirarItem);
                    this.pkg.writeInt(selectItem);
                    this.pkg.writeShort(parseInt(cantItem));
                    this.config.ws.send(this.pkg.dataSend());
                }
            }

            //Enter
            if (keyCode == 13) {
                if (showInputText) {
                    this.general.sendDialog(textDialog);

                    this.setState({
                        textDialog: ""
                    });
                }

                this.setState({
                    showInputText: !showInputText
                });
            }

            if (keyCode == 77 && !showInputText) {
                this.general.sendDialog("/meditar");
            }

            if (
                keyCode ==
                    this.state.keyCodeDefault[this.config.nameKeyCode.seguro] &&
                !showInputText
            ) {
                if (this.config.seguroActivado) {
                    this.config.seguroActivado = false;
                } else {
                    this.config.seguroActivado = true;
                }

                this.pkg.setPackageID(this.pkg.serverPacketID.changeSeguro);
                this.config.ws.send(this.pkg.dataSend());
            }
            if (
                keyCode ==
                this.state.keyCodeDefault[this.config.nameKeyCode.atacar]
            ) {
                if (
                    +Date.now() - this.config.timeHitStart >
                    this.config.intervalHit
                ) {
                    this.engine.hit();
                }
            }

            event = event || window.event;
            if (event.ctrlKey) {
                const c = event.which || keyCode;
                switch (c) {
                    case 83:
                    case 87:
                    case 68:
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                }
            }
        };
    }

    closeModalTrade = () => {
        this.setState({
            showModalTrade: false
        });
    };

    openConsole = () => {
        const { showConsole } = this.state;

        this.setState({
            showConsole: !showConsole
        });
    };

    selectItem = i => {
        const { keyMacro, showMacroConfig, user } = this.state;

        this.setState({
            selectItem: i
        });

        if (showMacroConfig) {
            const items = user.items;
            const item = items[i];

            if (item) {
                keyMacro.idSpell = "";
                keyMacro.idPosItem = i;
                keyMacro.img = `/static/graficos/${
                    inits.graphics[item.grhIndex].numFile
                }.png`;
            }

            this.setState({
                keyMacro: keyMacro
            });

            return;
        }

        if (this.clickUse > 1 && this.lastClickIdItem == i) {
            this.clickUse = 0;
            this.game.useItem(i);
        }

        this.clickUse++;

        this.lastClickIdItem = i;
    };

    selectSpell = i => {
        const { keyMacro, showMacroConfig } = this.state;
        const spell = this.user.spells[i];

        if (showMacroConfig && spell) {
            keyMacro.idSpell = spell.idSpell;
            keyMacro.idPosSpell = i;
            keyMacro.idPosItem = "";
            keyMacro.img = `/static/spells/${spell.idSpell}.png`;

            this.setState({
                keyMacro: keyMacro
            });

            return;
        }

        if (this.user.maxMana > 0) {
            this.config.hechizoSelected = i;
            this.setState({
                crosshair: true
            });
            this.game.writeConsole("Haz click sobre el objetivo...", "gray");
        }
    };

    clickCanvas = e => {
        let xCanvas = e.nativeEvent.offsetX;
        let yCanvas = e.nativeEvent.offsetY;

        const posX = Math.round(this.user.pos.x + xCanvas / 32 - 544 / 64);
        const posY = Math.round(this.user.pos.y + yCanvas / 32 - 544 / 64);

        this.engine.clickCanvas({
            x: posX,
            y: posY
        });
    };

    renderBoxItems = () => {
        const { user, selectItem } = this.state;
        const items = user.items || {};

        let html = [];

        for (let i = 1; i < 22; i++) {
            const item = items[i];

            html.push(
                <div
                    className={`${style.slot_inv} ${
                        selectItem === i ? style.item_selected : ""
                    }`}
                    key={i}
                    onClick={() => this.selectItem(i)}
                >
                    <div
                        className={`${style.img_item} ${
                            item && !item.validUser ? style.itemNotValid : ""
                        }`}
                        style={{
                            backgroundImage: item
                                ? `url("/static/graficos/${
                                      inits.graphics[item.grhIndex].numFile
                                  }.png")`
                                : "none"
                        }}
                    />
                    <div className={style.amount}>{item ? item.cant : ""}</div>

                    {item && item.equipped ? (
                        <div className={style.equipped}>E</div>
                    ) : null}
                </div>
            );
        }

        return html;
    };

    renderBoxSpells = () => {
        const { user } = this.state;
        const spells = user.spells || {};

        let html = [];

        for (let i = 1; i < 29; i++) {
            const spell = spells[i];

            html.push(
                <div
                    className={style.slot_spell}
                    key={i}
                    onClick={() => this.selectSpell(i)}
                >
                    <div
                        className={style.img_spell}
                        style={{
                            backgroundImage: spell
                                ? `url("/static/spells/${spell.idSpell}.png")`
                                : "none"
                        }}
                    />
                </div>
            );
        }

        return html;
    };

    renderBoxMacros = () => {
        const { valueKeyMacro } = this.state;

        let html = [];

        for (let i = 0; i < 6; i++) {
            const macro = valueKeyMacro[i];

            html.push(
                <div
                    key={i}
                    className={style.macro}
                    onContextMenu={e => this.showMacroConfig(e, i)}
                    ref={ref => {
                        this.macros[i] = ref;
                    }}
                >
                    {macro.idPosItem !== "" && macro.img ? (
                        <div
                            className={style.item}
                            style={{
                                backgroundImage: `url("${macro.img}")`
                            }}
                        />
                    ) : null}

                    {macro.idSpell !== "" && macro.img ? (
                        <div
                            className={style.spell}
                            style={{
                                backgroundImage: `url("${macro.img}")`
                            }}
                        />
                    ) : null}

                    {macro.keyChar !== "" ? (
                        <div className={style.key}>{macro.keyChar}</div>
                    ) : null}
                </div>
            );
        }

        return html;
    };

    renderBoxItemsUserTrade = () => {
        const { trade } = this.state;

        let html = [];

        for (let i = 1; i < 26; i++) {
            const item = trade.itemsUser[i];

            html.push(
                <div
                    className={`${style.slotInventary} ${
                        trade.idPosInv === i ? style.slotInventarySelected : ""
                    }`}
                    key={i}
                    onClick={() => this.selectItemUserTrade(i)}
                >
                    <div
                        className={`${style.imgItem} ${
                            item && !item.validUser ? style.itemNotValid : ""
                        }`}
                        style={{
                            backgroundImage: item
                                ? `url("${item.imgItem}")`
                                : "none"
                        }}
                    />
                    <div className={style.cant}>{item && item.cant}</div>
                    {item && item.equipped ? (
                        <div className={style.equipped}>E</div>
                    ) : null}
                </div>
            );
        }

        return html;
    };

    renderBoxItemsTrade = () => {
        const { trade } = this.state;

        let html = [];

        for (let i = 1; i < 26; i++) {
            const item = trade.itemsTrade[i];

            html.push(
                <div
                    className={`${style.slotTrade} ${
                        item && !item.validUser ? style.itemNotValid : ""
                    } ${trade.idPosTrade === i ? style.slotTradeSelected : ""}`}
                    key={i}
                    onClick={() => this.selectItemTrade(i)}
                >
                    <div
                        className={style.imgItem}
                        style={{
                            backgroundImage: item
                                ? `url("${item.imgItem}")`
                                : "none"
                        }}
                    />
                </div>
            );
        }

        return html;
    };

    selectItemUserTrade = i => {
        const { trade } = this.state;

        const item = trade.itemsUser[i];

        trade.idPosInv = i;

        if (item) {
            trade.titleItem = item.name;
            trade.infoItem = item.info;
            trade.imgItem = item.imgItem;
            trade.goldItem = item.gold;
        } else {
            trade.titleItem = "";
            trade.infoItem = "";
            trade.imgItem = "";
            trade.goldItem = "";
        }

        this.setState({
            trade: trade
        });
    };

    selectItemTrade = i => {
        const { trade } = this.state;

        const item = trade.itemsTrade[i];

        trade.idPosTrade = i;

        if (item) {
            trade.titleItem = item.name;
            trade.infoItem = item.info;
            trade.imgItem = item.imgItem;
            trade.goldItem = item.gold;
        } else {
            trade.titleItem = "";
            trade.infoItem = "";
            trade.imgItem = "";
            trade.goldItem = "";
        }

        this.setState({
            trade: trade
        });
    };

    buyTrade = () => {
        const { trade, cantTrade } = this.state;

        if (trade.idPosTrade) {
            this.pkg.setPackageID(this.pkg.serverPacketID.buyItem);
            this.pkg.writeByte(trade.idPosTrade);
            this.pkg.writeShort(cantTrade);
            this.config.ws.send(this.pkg.dataSend());
        }
    };

    sellTrade = () => {
        const { trade, cantTrade } = this.state;

        if (trade.idPosInv) {
            this.pkg.setPackageID(this.pkg.serverPacketID.sellItem);
            this.pkg.writeByte(trade.idPosInv);
            this.pkg.writeShort(cantTrade);
            this.config.ws.send(this.pkg.dataSend());
        }
    };

    showInventary = () => {
        this.setState({
            showInventary: true
        });
    };

    showSpells = () => {
        this.setState({
            showInventary: false
        });
    };

    showMacroConfig = (e, key) => {
        let { keyMacro } = this.state;

        e.preventDefault();

        const refMacro = this.macros[key];

        this.modalMacro.style.left = `${refMacro.offsetLeft - 57}px`;
        this.modalMacro.style.top = `${refMacro.offsetTop - 210}px`;

        keyMacro = {
            indexMacro: key,
            idPosItem: "",
            idPosSpell: "",
            idSpell: "",
            key: "",
            keyChar: ""
        };

        this.setState({
            showMacroConfig: true,
            keyMacro: keyMacro
        });
    };

    handleKeyMacro = e => {
        const { keyMacro, keyCodeMacros, keyCodeDefault } = this.state;
        const keyCode = e.keyCode;

        if (
            Object.values(keyCodeDefault).indexOf(keyCode) > -1 ||
            !isNaN(parseInt(keyCodeMacros[keyCode]))
        ) {
            keyMacro.key = "";
            keyMacro.keyChar = "";
            alert("La tecla ya está asignada");
        } else {
            let fromChar = String.fromCharCode(keyCode);

            if (this.config.keyCodeMap[keyCode]) {
                fromChar = this.config.keyCodeMap[keyCode];
            }

            keyMacro.key = keyCode;
            keyMacro.keyChar = fromChar;
        }

        this.setState({
            keyMacro: keyMacro
        });
    };

    saveMacro = () => {
        const { keyMacro, valueKeyMacro, keyCodeMacros } = this.state;

        valueKeyMacro[keyMacro.indexMacro] = {
            idPosItem: keyMacro.idPosItem,
            idSpell: keyMacro.idSpell,
            idPosSpell: keyMacro.idPosSpell,
            img: keyMacro.img,
            key: keyMacro.key,
            keyChar: keyMacro.keyChar
        };

        keyCodeMacros[keyMacro.key] = keyMacro.indexMacro;

        this.setState({
            valueKeyMacro: valueKeyMacro,
            keyCodeMacros: keyCodeMacros,
            showMacroConfig: false
        });

        window.localStorage.setItem("macros", JSON.stringify(valueKeyMacro));
    };

    handleKeyDefault = (e, keyType) => {
        const {
            keyCodeMacros,
            charKeyCodeDefault,
            tmpKeyCodeDefault
        } = this.state;
        const keyCode = e.keyCode;

        if (
            Object.values(tmpKeyCodeDefault).indexOf(keyCode) > -1 ||
            !isNaN(parseInt(keyCodeMacros[keyCode]))
        ) {
            alert("La tecla ya está asignada");
        } else {
            let fromChar = String.fromCharCode(keyCode);

            if (this.config.keyCodeMap[keyCode]) {
                fromChar = this.config.keyCodeMap[keyCode];
            }

            tmpKeyCodeDefault[keyType] = keyCode;
            charKeyCodeDefault[keyType] = fromChar;
        }

        this.setState({
            charKeyCodeDefault: charKeyCodeDefault,
            tmpKeyCodeDefault: tmpKeyCodeDefault
        });
    };

    restoreDefaultKeys = async () => {
        const { keyCodeDefaultReset } = this.state;

        window.localStorage.setItem(
            "defaultKeys",
            JSON.stringify(keyCodeDefaultReset)
        );

        await this.setState({
            keyCodeDefault: _.cloneDeep(keyCodeDefaultReset),
            tmpKeyCodeDefault: _.cloneDeep(keyCodeDefaultReset)
        });

        this.charKeyCodeDefault();
    };

    saveChangesKeys = () => {
        const { tmpKeyCodeDefault } = this.state;

        window.localStorage.setItem(
            "defaultKeys",
            JSON.stringify(tmpKeyCodeDefault)
        );

        this.setState({
            keyCodeDefault: _.cloneDeep(tmpKeyCodeDefault)
        });

        alert("Teclas guardadas.");
    };

    restoreMacros = () => {
        window.localStorage.setItem("macros", "");

        this.setState({
            keyCodeMacros: {},
            valueKeyMacro: [
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                },
                {
                    idPosItem: "",
                    idSpell: "",
                    idPosSpell: "",
                    img: "",
                    key: "",
                    keyChar: ""
                }
            ]
        });

        alert("Macros reseteados.");
    };

    render() {
        const {
            showInventary,
            showMacroConfig,
            loading,
            user,
            showConsole,
            messagesConsole,
            crosshair,
            nameMap,
            showInputText,
            textDialog,
            showModalTrade,
            trade,
            cantTrade,
            mapasToLoad,
            mapasCargados,
            keyMacro,
            showModalControlPanel,
            keyCodeDefault,
            charKeyCodeDefault
        } = this.state;

        return (
            <React.Fragment>
                <div
                    className={style.progressBar}
                    style={{ display: loading ? "block" : "none" }}
                >
                    <div className={style.logo_tmp} />
                    <div className={style.text}>
                        <span id="porcentajeBarra">
                            {mapasCargados} / {mapasToLoad} Mapas
                        </span>
                    </div>
                    <div className={style.contentBar}>
                        <div className={style.carga} />
                        <div
                            className={style.barra}
                            style={{
                                width: `${(mapasCargados * 578) /
                                    mapasToLoad}px`
                            }}
                        />
                    </div>
                    <div className={style.contBox}>
                        <div className={style.help}>
                            <p>Mover: Flechas</p>
                            <p>Atacar: Ctrl</p>
                            <p>Agarrar: A</p>
                            <p>Usar: U</p>
                            <p>Tirar: T</p>
                            <p>Seguro: S</p>
                            <p>Meditar: M</p>
                            <p>Hablar: Enter</p>
                        </div>
                        <div className={style.news}>
                            <div className={style.news_content}>
                                <div className={style.title}>
                                    Actualización 03/06/2016
                                </div>
                                <p>- Volvimos!.</p>
                                <p>
                                    - Síguemos en nuestra página de{" "}
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href="https://www.facebook.com/ArgentumOnlineWeb"
                                    >
                                        Facebook
                                    </a>{" "}
                                    para más novedades!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className={style.modalInfo} />

                <div
                    className={style.modalControlPanel}
                    style={{
                        display: showModalControlPanel ? "block" : "none"
                    }}
                >
                    <div
                        className={style.closeControlPanel}
                        onClick={() => {
                            this.setState({ showModalControlPanel: false });
                        }}
                    />
                    <div className={style.sound} />
                    <div className={style.teclas}>
                        <input
                            type="text"
                            className={`${style.tecla} ${
                                style.margin_left_tecla
                            }`}
                            value={
                                charKeyCodeDefault[
                                    this.nameKeyCode.flechaArriba
                                ]
                            }
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.flechaArriba
                                );
                            }}
                        />
                        <input
                            type="text"
                            className={style.tecla}
                            value={
                                charKeyCodeDefault[this.nameKeyCode.flechaAbajo]
                            }
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.flechaAbajo
                                );
                            }}
                        />
                        <input
                            type="text"
                            className={style.tecla}
                            value={
                                charKeyCodeDefault[
                                    this.nameKeyCode.flechaIzquierda
                                ]
                            }
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.flechaIzquierda
                                );
                            }}
                        />
                        <input
                            type="text"
                            className={style.tecla}
                            value={
                                charKeyCodeDefault[
                                    this.nameKeyCode.flechaDerecha
                                ]
                            }
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.flechaDerecha
                                );
                            }}
                        />

                        <input
                            type="text"
                            className={`${style.tecla} ${
                                style.margin_left_tecla
                            }`}
                            value={charKeyCodeDefault[this.nameKeyCode.usar]}
                            onKeyUp={e => {
                                this.handleKeyDefault(e, this.nameKeyCode.usar);
                            }}
                        />
                        <input
                            type="text"
                            className={style.tecla}
                            value={charKeyCodeDefault[this.nameKeyCode.atacar]}
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.atacar
                                );
                            }}
                        />
                        <input
                            type="text"
                            className={style.tecla}
                            value={charKeyCodeDefault[this.nameKeyCode.agarrar]}
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.agarrar
                                );
                            }}
                        />
                        <input
                            type="text"
                            className={style.tecla}
                            value={charKeyCodeDefault[this.nameKeyCode.tirar]}
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.tirar
                                );
                            }}
                        />

                        <input
                            type="text"
                            className={`${style.tecla} ${
                                style.margin_left_tecla
                            }`}
                            value={charKeyCodeDefault[this.nameKeyCode.equipar]}
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.equipar
                                );
                            }}
                        />
                        <input
                            type="text"
                            className={style.tecla}
                            value={charKeyCodeDefault[this.nameKeyCode.domar]}
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.domar
                                );
                            }}
                        />
                        <input
                            type="text"
                            className={style.tecla}
                            value={charKeyCodeDefault[this.nameKeyCode.robar]}
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.robar
                                );
                            }}
                        />
                        <input
                            type="text"
                            className={style.tecla}
                            value={charKeyCodeDefault[this.nameKeyCode.seguro]}
                            onKeyUp={e => {
                                this.handleKeyDefault(
                                    e,
                                    this.nameKeyCode.seguro
                                );
                            }}
                        />

                        <div
                            className={style.default_teclas}
                            onClick={this.restoreDefaultKeys}
                        />
                        <div
                            className={style.save_cambios}
                            onClick={this.saveChangesKeys}
                        />
                        <div
                            className={style.reset_macros}
                            onClick={this.restoreMacros}
                        />
                    </div>
                </div>

                <div
                    className={style.modalReconnect}
                    style={{ top: "285px", left: "638.5px" }}
                />

                <div
                    className={style.modalMacro}
                    style={{ display: showMacroConfig ? "block" : "none" }}
                    ref={ref => {
                        this.modalMacro = ref;
                    }}
                >
                    <div
                        className={`${style.cruz} ${style.closeMacro}`}
                        onClick={() => {
                            this.setState({ showMacroConfig: false });
                        }}
                    />
                    <input
                        type="text"
                        onKeyUp={this.handleKeyMacro}
                        className={style.keyMacro}
                        value={keyMacro.keyChar}
                    />
                    <div className={style.img}>
                        {keyMacro.idPosItem && keyMacro.img ? (
                            <div
                                className={style.item}
                                style={{
                                    backgroundImage: `url("${keyMacro.img}")`
                                }}
                            />
                        ) : null}

                        {keyMacro.idSpell && keyMacro.img ? (
                            <div
                                className={style.spell}
                                style={{
                                    backgroundImage: `url("${keyMacro.img}")`
                                }}
                            />
                        ) : null}
                    </div>
                    <div
                        className={style.guardarMacro}
                        onClick={this.saveMacro}
                    />
                </div>

                <div
                    className={style.modalTrade}
                    style={{ display: showModalTrade ? "block" : "none" }}
                >
                    <div className={style.headTrade}>
                        <div className={style.imgItemTrade}>
                            <div
                                className={style.imgItem}
                                style={{
                                    backgroundImage: trade.imgItem
                                        ? `url("${trade.imgItem}")`
                                        : "none"
                                }}
                            />
                        </div>
                        <div className={style.titleAndGold}>
                            <div className={style.titleItemTrade}>
                                {trade.titleItem}
                            </div>
                            <div className={style.infoItem}>
                                {trade.infoItem}
                            </div>
                            <div className={style.goldItemTrade}>
                                {trade.goldItem}
                            </div>
                        </div>
                        <div
                            className={style.closeTrade}
                            onClick={this.closeModalTrade}
                        />
                    </div>
                    <div className={style.itemsTrade}>
                        <div className={style.trade}>
                            {this.renderBoxItemsTrade()}
                        </div>
                        <div className={style.inventary}>
                            {this.renderBoxItemsUserTrade()}
                        </div>
                    </div>
                    <div className={style.footerTrade}>
                        <div
                            className={style.buttonBuy}
                            onClick={this.buyTrade}
                        />
                        <div className={style.buttonLess} />
                        <input
                            type="text"
                            className={style.cantTrade}
                            value={cantTrade}
                            onChange={e => {
                                this.setState({ cantTrade: e.target.value });
                            }}
                        />
                        <div className={style.buttonMore} />
                        <div
                            className={style.buttonSell}
                            onClick={this.sellTrade}
                        />
                    </div>
                </div>

                <div
                    className={style.outer}
                    style={{ display: loading ? "none" : "table" }}
                >
                    <div className={style.middle}>
                        <div className={style.content}>
                            <div className={style.content_left}>
                                <div className={style.render}>
                                    <input
                                        type="text"
                                        name="text"
                                        autoFocus
                                        ref={input => input && input.focus()}
                                        className={style.text}
                                        style={{
                                            display: showInputText
                                                ? "block"
                                                : "none"
                                        }}
                                        value={textDialog}
                                        onChange={e => {
                                            this.setState({
                                                textDialog: e.target.value
                                            });
                                        }}
                                    />
                                    <canvas
                                        width="544"
                                        height="544"
                                        id="background"
                                        className={style.background}
                                        ref={ref => {
                                            this.canvas.background = ref;
                                        }}
                                    />
                                    <canvas
                                        width="544"
                                        height="544"
                                        id="foreground"
                                        className={style.foreground}
                                        ref={ref => {
                                            this.canvas.foreground = ref;
                                        }}
                                    />
                                    <canvas
                                        width="544"
                                        height="544"
                                        id="items"
                                        className={style.items}
                                        ref={ref => {
                                            this.canvas.items = ref;
                                        }}
                                    />
                                    <canvas
                                        width="544"
                                        height="544"
                                        id="techos"
                                        className={style.techos}
                                        ref={ref => {
                                            this.canvas.techos = ref;
                                        }}
                                    />
                                    <canvas
                                        width="544"
                                        height="544"
                                        id="textos"
                                        className={style.textos}
                                        ref={ref => {
                                            this.canvas.textos = ref;
                                        }}
                                    />
                                    <canvas
                                        width="544"
                                        height="544"
                                        id="mouseEvent"
                                        className={style.mouseEvent}
                                        onClick={this.clickCanvas}
                                        style={{
                                            cursor: crosshair
                                                ? "crosshair"
                                                : "default"
                                        }}
                                    />
                                    <div
                                        id="console"
                                        ref="console"
                                        className={style.console}
                                        style={{
                                            display: showConsole
                                                ? "block"
                                                : "none"
                                        }}
                                    >
                                        {messagesConsole}
                                    </div>
                                    <div
                                        className={style.openConsole}
                                        title="Abrir o cerrar consola"
                                        onClick={this.openConsole}
                                    >
                                        <FontAwesomeIcon icon={faComment} />
                                    </div>
                                </div>

                                <div className={style.macros}>
                                    {this.renderBoxMacros()}
                                </div>
                            </div>
                            <div className={style.content_right}>
                                <div className={style.header}>
                                    <div className={style.level}>
                                        {user.level}
                                    </div>
                                    <div
                                        className={style.configuration}
                                        onClick={async () => {
                                            await this.setState({
                                                showModalControlPanel: true,
                                                tmpKeyCodeDefault: _.cloneDeep(
                                                    keyCodeDefault
                                                )
                                            });
                                            this.charKeyCodeDefault();
                                        }}
                                    />
                                    <div className={style.name}>
                                        {user.nameCharacter}
                                    </div>
                                    <div className={style.exp}>
                                        <div
                                            className={style.progress_bar}
                                            style={{
                                                width: `${(((user.exp * 100) /
                                                    user.expNextLevel) *
                                                    this.config.xpLength) /
                                                    100}px`
                                            }}
                                        />
                                        <div className={style.porcentaje}>{`${(
                                            (user.exp * 100) /
                                            user.expNextLevel
                                        ).toFixed(2)}%`}</div>
                                        <div className={style.num}>{`${
                                            user.exp
                                        } / ${user.expNextLevel}`}</div>
                                    </div>
                                    <div className={style.buttons}>
                                        <div
                                            className={`${style.button_inv} ${
                                                !showInventary
                                                    ? style.buttonInvSelected
                                                    : ""
                                            }`}
                                            onClick={this.showInventary}
                                        />
                                        <div
                                            className={`${style.button_spell} ${
                                                showInventary
                                                    ? style.buttonInvSelected
                                                    : ""
                                            }`}
                                            onClick={this.showSpells}
                                        />
                                    </div>
                                </div>
                                <div className={style.body}>
                                    <div
                                        className={style.inventary}
                                        style={{
                                            display: showInventary
                                                ? "block"
                                                : "none"
                                        }}
                                    >
                                        {this.renderBoxItems()}
                                    </div>
                                    <div
                                        className={style.spell}
                                        style={{
                                            display: showInventary
                                                ? "none"
                                                : "block"
                                        }}
                                    >
                                        {this.renderBoxSpells()}
                                    </div>
                                </div>
                                <div className={style.footer}>
                                    <div className={style.info_map}>
                                        <div className={style.name_map}>
                                            {nameMap}
                                        </div>
                                        <div className={style.pos_map}>
                                            {user.pos
                                                ? `Mapa: ${
                                                      this.config.mapNumber
                                                  } X: ${user.pos.x} Y: ${
                                                      user.pos.y
                                                  }`
                                                : ""}
                                        </div>
                                    </div>
                                    <div className={style.left_footer}>
                                        <div className={style.hp}>
                                            <div
                                                className={style.progress_bar}
                                                style={{
                                                    width: `${(user.hp *
                                                        this.config.hpLength) /
                                                        user.maxHp}px`
                                                }}
                                            />
                                            <div className={style.num}>{`${
                                                user.hp
                                            } / ${user.maxHp}`}</div>
                                        </div>
                                        <div className={style.mana}>
                                            <div
                                                className={style.progress_bar}
                                                style={{
                                                    width: `${(user.mana *
                                                        this.config
                                                            .manaLength) /
                                                        user.maxMana}px`
                                                }}
                                            />
                                            <div className={style.num}>{`${
                                                user.mana
                                            } / ${user.maxMana}`}</div>
                                        </div>
                                        <div className={style.gold}>
                                            {user.gold}
                                        </div>
                                        <div className={style.attr}>
                                            <div className={style.agilidad}>
                                                {user.attrAgilidad}
                                            </div>
                                            <div className={style.fuerza}>
                                                {user.attrFuerza}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.right_footer}>
                                        <div
                                            className={style.minimap}
                                            style={{
                                                backgroundImage: this.config
                                                    .mapNumber
                                                    ? `url('/static/imgs_mapas/${
                                                          this.config.mapNumber
                                                      }.png')`
                                                    : "none"
                                            }}
                                        >
                                            <div
                                                className={style.point_minimap}
                                                style={{
                                                    top: user.pos
                                                        ? `${user.pos.y - 1}px`
                                                        : 0,
                                                    left: user.pos
                                                        ? `${user.pos.x - 1}px`
                                                        : 0
                                                }}
                                            />
                                        </div>

                                        <div className={style.buttons_map}>
                                            <div className={style.open_map} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect()(Home);
