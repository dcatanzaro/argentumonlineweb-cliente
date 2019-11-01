import React from "react";
import { connect } from "react-redux";

import MainContainer from "../../components/mainContainer/index";

import inits from "../../engine/inits";
import RenderCharacters from "../../engine/renderCharacters";

import { fetchUrl, routerPush } from "../../config/utils";
import {
    clases,
    razas,
    generos,
    nameClases,
    nameGeneros,
    nameRazas
} from "../../config/config";

import style from "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class CreateCharacter extends React.Component {
    static async getInitialProps({ reduxStore, req, res }) {
        const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;

        return { userAgent };
    }

    constructor(props) {
        super(props);

        this.state = {
            idClaseSelected: 1,
            idRazaSelected: 1,
            idGeneroSelected: 1,
            idHeadSelected: 1,
            character: {
                idBody: 1,
                idHead: 1,
                idWeapon: 48,
                idShield: 0,
                idHelmet: 0,
                idGenero: 1
            },
            nameClase: nameClases[1],
            nameRaza: nameRazas[1],
            nameGenero: nameGeneros[1]
        };

        this.canvas = {};
    }

    componentDidMount() {
        const { initsLoaded } = this.props;

        this.canvas.ctx = this.canvas.getContext("2d");

        if (initsLoaded) this.drawChar();
    }

    drawChar = () => {
        const { initsLoaded } = this.props;
        const { character } = this.state;

        if (initsLoaded && this.canvas.ctx) {
            const rndChar = new RenderCharacters(
                inits,
                this.canvas.ctx,
                character,
                24,
                60
            );
            rndChar.drawChar();
        }
    };

    prevHead = async () => {
        let { idRazaSelected, idHeadSelected, character } = this.state;

        const humanoHombreFirstHead = 1,
            elfoHombreFirstHead = 101,
            elfoDHombreFirstHead = 201,
            enanoHombreFirstHead = 301,
            gnomoHombreFirstHead = 401;

        if (idRazaSelected == razas.humano) {
            if (idHeadSelected > humanoHombreFirstHead) {
                idHeadSelected--;
            }
        } else if (idRazaSelected == razas.elfo) {
            if (idHeadSelected > elfoHombreFirstHead) {
                idHeadSelected--;
            }
        } else if (idRazaSelected == razas.elfoDrow) {
            if (idHeadSelected > elfoDHombreFirstHead) {
                idHeadSelected--;
            }
        } else if (idRazaSelected == razas.enano) {
            if (idHeadSelected > enanoHombreFirstHead) {
                idHeadSelected--;
            }
        } else if (idRazaSelected == razas.gnomo) {
            if (idHeadSelected > gnomoHombreFirstHead) {
                idHeadSelected--;
            }
        }

        character.idHead = idHeadSelected;

        await this.setState({
            character: character,
            idHeadSelected: idHeadSelected
        });

        this.drawChar();
    };

    nextHead = async () => {
        let { idRazaSelected, idHeadSelected, character } = this.state;

        const humanoHombreLastHead = 40,
            elfoHombreLastHead = 122,
            elfoDHombreLastHead = 221,
            enanoHombreLastHead = 319,
            gnomoHombreLastHead = 416;

        if (idRazaSelected == razas.humano) {
            if (idHeadSelected < humanoHombreLastHead) {
                idHeadSelected++;
            }
        } else if (idRazaSelected == razas.elfo) {
            if (idHeadSelected < elfoHombreLastHead) {
                idHeadSelected++;
            }
        } else if (idRazaSelected == razas.elfoDrow) {
            if (idHeadSelected < elfoDHombreLastHead) {
                idHeadSelected++;
            }
        } else if (idRazaSelected == razas.enano) {
            if (idHeadSelected < enanoHombreLastHead) {
                idHeadSelected++;
            }
        } else if (idRazaSelected == razas.gnomo) {
            if (idHeadSelected < gnomoHombreLastHead) {
                idHeadSelected++;
            }
        }

        character.idHead = idHeadSelected;

        await this.setState({
            character: character,
            idHeadSelected: idHeadSelected
        });

        this.drawChar();
    };

    prevClase = async () => {
        let { idClaseSelected, character } = this.state;

        if (idClaseSelected > 1) {
            idClaseSelected--;
            if (idClaseSelected == 5) {
                idClaseSelected--;
            }

            if (idClaseSelected == clases.cazador) {
                character.idWeapon = 40;
            } else {
                character.idWeapon = 48;
            }

            await this.setState({
                character: character,
                idClaseSelected: idClaseSelected,
                nameClase: nameClases[idClaseSelected]
            });

            this.drawChar();
        }
    };

    nextClase = async () => {
        let { idClaseSelected, character } = this.state;

        if (idClaseSelected < 9) {
            idClaseSelected++;
            if (idClaseSelected == 5) {
                idClaseSelected++;
            }

            if (idClaseSelected == clases.cazador) {
                character.idWeapon = 40;
            } else {
                character.idWeapon = 48;
            }

            await this.setState({
                character: character,
                idClaseSelected: idClaseSelected,
                nameClase: nameClases[idClaseSelected]
            });

            this.drawChar();
        }
    };

    prevRaza = async () => {
        let { idRazaSelected, idHeadSelected, character } = this.state;

        const humanoHombreFirstHead = 1,
            elfoHombreFirstHead = 101,
            elfoDHombreFirstHead = 201,
            enanoHombreFirstHead = 301,
            gnomoHombreFirstHead = 401;

        if (idRazaSelected > 1) {
            idRazaSelected--;

            if (idRazaSelected == razas.humano) {
                character.idBody = 1;
            } else if (idRazaSelected == razas.elfo) {
                character.idBody = 2;
            } else if (idRazaSelected == razas.elfoDrow) {
                character.idBody = 3;
            } else if (idRazaSelected == razas.enano) {
                character.idBody = 300;
            } else if (idRazaSelected == razas.gnomo) {
                character.idBody = 300;
            }

            if (idRazaSelected == razas.humano) {
                idHeadSelected = humanoHombreFirstHead;
            } else if (idRazaSelected == razas.elfo) {
                idHeadSelected = elfoHombreFirstHead;
            } else if (idRazaSelected == razas.elfoDrow) {
                idHeadSelected = elfoDHombreFirstHead;
            } else if (idRazaSelected == razas.enano) {
                idHeadSelected = enanoHombreFirstHead;
            } else if (idRazaSelected == razas.gnomo) {
                idHeadSelected = gnomoHombreFirstHead;
            }

            character.idHead = idHeadSelected;

            await this.setState({
                character: character,
                idHeadSelected: idHeadSelected,
                nameRaza: nameRazas[idRazaSelected],
                idRazaSelected: idRazaSelected
            });

            this.drawChar();
        }
    };

    nextRaza = async () => {
        let { idRazaSelected, idHeadSelected, character } = this.state;

        const humanoHombreFirstHead = 1,
            elfoHombreFirstHead = 101,
            elfoDHombreFirstHead = 201,
            enanoHombreFirstHead = 301,
            gnomoHombreFirstHead = 401;

        if (idRazaSelected < 5) {
            idRazaSelected++;

            if (idRazaSelected == razas.humano) {
                character.idBody = 1;
            } else if (idRazaSelected == razas.elfo) {
                character.idBody = 2;
            } else if (idRazaSelected == razas.elfoDrow) {
                character.idBody = 3;
            } else if (idRazaSelected == razas.enano) {
                character.idBody = 300;
            } else if (idRazaSelected == razas.gnomo) {
                character.idBody = 300;
            }

            if (idRazaSelected == razas.humano) {
                idHeadSelected = humanoHombreFirstHead;
            } else if (idRazaSelected == razas.elfo) {
                idHeadSelected = elfoHombreFirstHead;
            } else if (idRazaSelected == razas.elfoDrow) {
                idHeadSelected = elfoDHombreFirstHead;
            } else if (idRazaSelected == razas.enano) {
                idHeadSelected = enanoHombreFirstHead;
            } else if (idRazaSelected == razas.gnomo) {
                idHeadSelected = gnomoHombreFirstHead;
            }

            character.idHead = idHeadSelected;

            await this.setState({
                character: character,
                idHeadSelected: idHeadSelected,
                nameRaza: nameRazas[idRazaSelected],
                idRazaSelected: idRazaSelected
            });

            this.drawChar();
        }
    };

    prevGenero = async () => {
        let { idGeneroSelected, character } = this.state;

        if (idGeneroSelected > 1) {
            idGeneroSelected--;

            character.idGenero = idGeneroSelected;

            await this.setState({
                character: character,
                idGeneroSelected: idGeneroSelected,
                nameGenero: nameGeneros[idGeneroSelected]
            });

            this.drawChar();
        }
    };

    nextGenero = async () => {
        let { idGeneroSelected, character } = this.state;

        if (idGeneroSelected < 2) {
            idGeneroSelected++;

            character.idGenero = idGeneroSelected;

            await this.setState({
                character: character,
                idGeneroSelected: idGeneroSelected,
                nameGenero: nameGeneros[idGeneroSelected]
            });

            this.drawChar();
        }
    };

    render() {
        const { initsLoaded, userAgent } = this.props;
        const { nameClase, nameRaza, nameGenero } = this.state;

        if (typeof window !== "undefined" && initsLoaded) this.drawChar();

        return (
            <MainContainer userAgent={userAgent}>
                <div className={style.contentLeft}>
                    <div className={style.shadow}>
                        <h4>Crear Personaje</h4>

                        <div className={style.createCharacter}>
                            <div className={style.content_general}>
                                <div className={style.content_left}>
                                    <label
                                        htmlFor="name"
                                        className={style.text}
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        className={style.input_text}
                                        id="name"
                                    />
                                    <div className={style.canvasCharacter}>
                                        <FontAwesomeIcon
                                            icon={faAngleLeft}
                                            className={style.faAngleLeft}
                                            onClick={this.prevHead}
                                        />
                                        <canvas
                                            ref={ref => {
                                                this.canvas = ref;
                                            }}
                                            className={style.character}
                                            width="80"
                                            height="100"
                                        />
                                        <FontAwesomeIcon
                                            icon={faAngleRight}
                                            className={style.faAngleRight}
                                            onClick={this.nextHead}
                                        />
                                    </div>
                                </div>
                                <div className={style.content_right}>
                                    <label
                                        htmlFor="name"
                                        className={style.text}
                                    >
                                        Clase
                                    </label>

                                    <div className={style.content_input_text}>
                                        <FontAwesomeIcon
                                            icon={faAngleLeft}
                                            className={style.faAngleLeft}
                                            onClick={this.prevClase}
                                        />
                                        <input
                                            type="text"
                                            className={style.input_text}
                                            id="clase"
                                            disabled=""
                                            defaultValue={nameClase}
                                        />
                                        <FontAwesomeIcon
                                            icon={faAngleRight}
                                            className={style.faAngleRight}
                                            onClick={this.nextClase}
                                        />
                                    </div>

                                    <label
                                        htmlFor="name"
                                        className={style.text}
                                    >
                                        Raza
                                    </label>

                                    <div className={style.content_input_text}>
                                        <FontAwesomeIcon
                                            icon={faAngleLeft}
                                            className={style.faAngleLeft}
                                            onClick={this.prevRaza}
                                        />
                                        <input
                                            type="text"
                                            className={style.input_text}
                                            id="raza"
                                            defaultValue={nameRaza}
                                            disabled=""
                                        />
                                        <FontAwesomeIcon
                                            icon={faAngleRight}
                                            className={style.faAngleRight}
                                            onClick={this.nextRaza}
                                        />
                                    </div>

                                    <label
                                        htmlFor="name"
                                        className={style.text}
                                    >
                                        Género
                                    </label>

                                    <div className={style.content_input_text}>
                                        <FontAwesomeIcon
                                            icon={faAngleLeft}
                                            className={style.faAngleLeft}
                                            onClick={this.prevGenero}
                                        />
                                        <input
                                            type="text"
                                            className={style.input_text}
                                            id="genero"
                                            defaultValue={nameGenero}
                                            disabled=""
                                        />
                                        <FontAwesomeIcon
                                            icon={faAngleRight}
                                            className={style.faAngleRight}
                                            onClick={this.nextGenero}
                                        />
                                    </div>

                                    <label
                                        htmlFor="name"
                                        className={style.text}
                                    >
                                        Ciudad
                                    </label>

                                    <div
                                        className={`${style.content_input_text} ${style.margin_left}`}
                                    >
                                        <input
                                            type="text"
                                            className={style.input_text}
                                            id="ciudad"
                                            defaultValue="Ullathorpe"
                                            disabled=""
                                        />
                                    </div>
                                </div>
                            </div>

                            <button>Crear personaje</button>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

function mapStateToProps(state) {
    const { initsLoaded, account } = state;
    return { initsLoaded, account };
}

export default connect(mapStateToProps)(CreateCharacter);
