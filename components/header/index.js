import React from "react";
import { connect } from "react-redux";

import style from "./style.scss";

import { fetchUrl, routerPush } from "../../config/utils";
import { setInitLoaded } from "../../store";

import pvpChars from "../../config/pvpChars.json";
import inits from "../../engine/inits";
import RenderCharacters from "../../engine/renderCharacters";

import CreateLink from "../createLink/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import MobileDetect from "mobile-detect";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openModalCharacters: false,
            characters: [],
            charactersPvP: pvpChars,
            typeGame: "PvE",
            loadCharacters: false,
            buttonCreatePj: "Creación deshabilitada"
        };

        this.canvasCharacter = [];
    }

    async componentDidMount() {
        const { loadCharacters } = this.state;
        const { dispatch, account } = this.props;

        if (account.accountId && !loadCharacters) {
            this.setState({
                loadCharacters: true
            });
            this.getAllCharacters();
        }

        this.canvasCharacter.map((canvas, index) => {
            this.canvasCharacter[index].ctx = canvas.getContext("2d");
        });

        await inits.initialize();

        dispatch(setInitLoaded(true));
    }

    clearCanvas = () => {
        this.canvasCharacter.map((canvas, index) => {
            this.canvasCharacter[index].ctx.clearRect(0, 0, 80, 100);
        });
    };

    getAllCharacters = async () => {
        const result = await fetchUrl("/characters");

        this.setState({
            characters: result
        });
    };

    changeTypeGame = async typeGame => {
        await this.setState({
            typeGame: typeGame,
            buttonCreatePj:
                typeGame === "PvP"
                    ? "Crear Personaje"
                    : "Creación deshabilitada"
        });

        this.renderCharacters();
    };

    renderCharacters = () => {
        this.clearCanvas();

        const { characters, charactersPvP, typeGame } = this.state;

        const tmpCharacters = typeGame == "PvE" ? characters : charactersPvP;

        tmpCharacters.map((character, index) => {
            const ctx = this.canvasCharacter[index].ctx;

            const rndChar = new RenderCharacters(inits, ctx, character, 24, 60);
            rndChar.drawChar();
        });
    };

    play = (character, key) => {
        const { account } = this.props;
        const { typeGame } = this.state;

        if (!character) {
            this.setState({
                openModalCharacters: false
            });

            return routerPush("/createCharacter");
        }

        window.localStorage.setItem("idAccount", account.accountId);
        window.localStorage.setItem("email", account.email);
        if (typeGame == "PvE") {
            window.localStorage.setItem("idCharacter", character._id);
        } else {
            window.localStorage.setItem("idChar", key);
        }

        window.localStorage.setItem("typeGame", typeGame == "PvE" ? 1 : 2);

        return routerPush("/play", "", true);
    };

    renderBoxCharacters = () => {
        const { characters, charactersPvP, typeGame } = this.state;

        let html = [];

        for (let i = 0; i < 10; i++) {
            const character =
                typeGame === "PvE" ? characters[i] : charactersPvP[i];

            html.push(
                <div className={style.contentGral} key={i}>
                    <span className={style.name}>
                        {character ? character.name : ""}
                    </span>
                    <canvas
                        ref={ref => {
                            this.canvasCharacter[i] = ref;
                        }}
                        className={style.contentImgA}
                        onClick={() => this.play(character, i)}
                        width="80"
                        height="100"
                    />
                </div>
            );
        }

        return html;
    };

    openModal = () => {
        const { account, userAgent } = this.props;
        const { openModalCharacters } = this.state;

        const md = new MobileDetect(userAgent);

        if (md.mobile()) {
            alert("Argentum Online Web no está disponible para celulares.");
            return;
        }

        if (!account.accountId) {
            return routerPush("/register");
        }

        this.setState({
            openModalCharacters: !openModalCharacters
        });

        this.renderCharacters();
    };

    render() {
        const {
            openModalCharacters,
            typeGame,
            loadCharacters,
            buttonCreatePj
        } = this.state;
        const { account } = this.props;

        if (
            typeof window !== "undefined" &&
            account.accountId &&
            !loadCharacters
        )
            this.getAllCharacters();

        return (
            <React.Fragment>
                <div className={style.logo}>
                    <CreateLink href="/">
                        <a>
                            <img src="/static/imgs/logo.png" alt="logo" />
                        </a>
                    </CreateLink>
                </div>

                <nav>
                    <ul>
                        <CreateLink href="/">
                            <a>
                                <li className={style.inicio}>INICIO</li>
                            </a>
                        </CreateLink>

                        <a onClick={this.openModal}>
                            <li className={style.jugar} />
                        </a>

                        <CreateLink href="/ranking">
                            <a>
                                <li className={style.inicio}>RANKING</li>
                            </a>
                        </CreateLink>
                    </ul>
                </nav>

                <div
                    className={style.modalPlay}
                    style={{ display: openModalCharacters ? "block" : "none" }}
                >
                    <div className={style.shadow}>
                        <div className={style.header}>
                            <div className={style.selectTypeGame}>
                                <button
                                    className={
                                        typeGame === "PvE" ? style.selected : ""
                                    }
                                    onClick={() => this.changeTypeGame("PvE")}
                                >
                                    PvE
                                </button>
                                <button
                                    className={
                                        typeGame === "PvP" ? style.selected : ""
                                    }
                                    onClick={() => this.changeTypeGame("PvP")}
                                >
                                    PvP
                                </button>
                            </div>

                            <FontAwesomeIcon
                                icon={faTimes}
                                className={style.closeWindow}
                                onClick={() =>
                                    this.setState({
                                        openModalCharacters: !openModalCharacters
                                    })
                                }
                            />
                        </div>

                        {this.renderBoxCharacters()}

                        <div
                            className={style.createCharacter}
                            data-js="createCharacter"
                        >
                            <CreateLink href="/createCharacter">
                                <a className={style.buttonRegister}>
                                    {buttonCreatePj}
                                </a>
                            </CreateLink>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { account } = state;
    return { account };
}

export default connect(mapStateToProps)(Header);
