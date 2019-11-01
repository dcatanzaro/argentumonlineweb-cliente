import React from "react";
import { connect } from "react-redux";
import style from "./style.scss";

import { fetchUrl } from "../../config/utils";
import { setAccount } from "../../store";

import CreateLink from "../createLink/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password: ""
        };
    }

    handleInput = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    handleLogin = async () => {
        const { dispatch } = this.props;
        const { name, password } = this.state;

        if (!name || !password) return;

        const body = {
            name: name,
            password: password
        };

        const result = await fetchUrl("/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (result.error) {
            return alert(result.message);
        }

        dispatch(setAccount(result));
    };

    handleLogout = () => {
        const { dispatch } = this.props;

        dispatch(setAccount({}));

        fetchUrl("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
    };

    render() {
        const { name, password } = this.state;
        const { account } = this.props;

        return (
            <div className={style.servidores}>
                <div className={style.svtitulo}>
                    <img src="/static/imgs/deco.png" alt="" />
                    <p className={style.servidorTxt}>SERVIDOR</p>

                    <p className={style.cantUser} style={{ color: "green" }}>
                        Online
                    </p>
                </div>

                {account.accountId ? (
                    <div className={style.login} style={{ height: "150px" }}>
                        <div className={style.avatar}>
                            <img src="/static/imgs/logo-aoweb.png" alt="" />
                            <a onClick={this.handleLogout}>
                                SALIR <FontAwesomeIcon icon={faSignOutAlt} />
                            </a>
                        </div>
                        <span className={style.name}>{account.name}</span>
                    </div>
                ) : (
                    <div className={style.login} style={{ height: "140px" }}>
                        <div className={style.user}>
                            <p>USUARIO</p>
                            <div className={style.contentInput}>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={this.handleInput}
                                />
                            </div>
                        </div>
                        <div className={style.pass}>
                            <p>CONTRASEÑA</p>
                            <div className={style.contentInput}>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={this.handleInput}
                                />
                            </div>
                        </div>

                        <CreateLink href="/register">
                            <a
                                style={{
                                    textDecoration: "none",
                                    color: "#006e2e",
                                    marginRight: "44px"
                                }}
                            >
                                CREAR CUENTA
                            </a>
                        </CreateLink>

                        <button
                            onClick={this.handleLogin}
                            className={style.bold}
                            style={{
                                color: "#ff9000",
                                marginRight: "29px"
                            }}
                        >
                            ENTRAR
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { account } = state;
    return { account };
}

export default connect(mapStateToProps)(Login);
