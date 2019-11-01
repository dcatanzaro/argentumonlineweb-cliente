import React from "react";
import { connect } from "react-redux";

import MainContainer from "../../components/mainContainer/index";

import { fetchUrl, routerPush } from "../../config/utils";
import { setAccount } from "../../store";

import style from "./style.scss";

class Register extends React.Component {
    static async getInitialProps({ reduxStore, req, res }) {
        const account = reduxStore.getState().account;

        if (account.accountId) {
            if (req) {
                res.writeHead(302, {
                    Location: "/"
                });
                res.end();
                return (res.finished = true);
            } else {
                routerPush("/");
            }
        }

        const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;

        return { userAgent };
    }

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password: "",
            repassword: "",
            email: ""
        };
    }

    handleInput = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    handleSave = async () => {
        const { name, password, repassword, email } = this.state;
        const { dispatch } = this.props;

        if (!name || !password || !repassword || !email) {
            return alert("Faltan campos por completar.");
        }

        if (password != repassword) {
            return alert("Las contraseñas no coinciden.");
        }

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(email.toLowerCase())) {
            return alert("El email no es válido.");
        }

        const body = {
            name: name,
            password: password,
            email: email.toLowerCase()
        };

        const result = await fetchUrl("/register", {
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

        routerPush("/");
    };

    render() {
        const { name, password, repassword, email } = this.state;
        const { userAgent } = this.props;

        return (
            <MainContainer userAgent={userAgent}>
                <div className={style.contentLeft}>
                    <div className={style.shadow}>
                        <h4>Registro</h4>
                        <div className={style.register}>
                            <div className={style.form}>
                                <div className={style.groupInput}>
                                    <label htmlFor="">USUARIO </label>
                                    <input
                                        type="text"
                                        className={style.inputText}
                                        name="name"
                                        value={name}
                                        onChange={this.handleInput}
                                    />
                                </div>

                                <div className={style.groupInput}>
                                    <label htmlFor="">CONTRASEÑA </label>
                                    <input
                                        type="password"
                                        className={style.inputText}
                                        name="password"
                                        value={password}
                                        onChange={this.handleInput}
                                    />
                                </div>

                                <div className={style.groupInput}>
                                    <label htmlFor="">RE-CONTRASEÑA </label>
                                    <input
                                        type="password"
                                        className={style.inputText}
                                        name="repassword"
                                        value={repassword}
                                        onChange={this.handleInput}
                                    />
                                </div>

                                <div className={style.groupInput}>
                                    <label htmlFor="">E-MAIL </label>
                                    <input
                                        type="text"
                                        className={style.inputText}
                                        name="email"
                                        value={email}
                                        onChange={this.handleInput}
                                    />
                                </div>

                                <button
                                    className={style.buttonRegister}
                                    onClick={this.handleSave}
                                >
                                    Registrarse
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}

function mapStateToProps(state) {
    const { account } = state;
    return { account };
}

export default connect(mapStateToProps)(Register);
