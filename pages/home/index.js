import React from "react";
import { connect } from "react-redux";

import CreateLink from "../../components/createLink/index";
import MainContainer from "../../components/mainContainer/index";

import MobileDetect from "mobile-detect";

import style from "./style.scss";

class Home extends React.Component {
    static async getInitialProps({ reduxStore, req }) {
        const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;

        return { userAgent };
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { userAgent } = this.props;

        const md = new MobileDetect(userAgent);

        return (
            <MainContainer userAgent={userAgent}>
                <div className={style.gralinfo}>
                    <div className={style.shadow}>
                        <h2>¡Bienvenidos a Argentum Online Web!</h2>
                        {!md.mobile() ? (
                            <p>
                                <CreateLink href="/register">
                                    <a>Regístrate</a>
                                </CreateLink>{" "}
                                o <strong>Ingresa</strong> para poder jugar!
                            </p>
                        ) : null}

                        <p>
                            Síguemos en nuestra página de{" "}
                            <a
                                href="https://www.facebook.com/ArgentumOnlineWeb"
                                rel="noreferrer"
                                target="_blank"
                            >
                                Facebook
                            </a>
                            !
                        </p>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

export default connect()(Home);
