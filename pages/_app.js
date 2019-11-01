import App, { Container } from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import Head from "../components/Head";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/style.scss";

import { config as configFA } from "@fortawesome/fontawesome-svg-core";
configFA.autoAddCss = false;

import { fetchUrl, routerPush } from "../config/utils";

import { setAccount } from "../store";

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        if (ctx.req) {
            const account = await fetchUrl("/checkuserlogged", {
                credentials: "include",
                headers: { cookie: ctx.req.headers.cookie }
            });

            if (ctx.req.url == "/createCharacter" && !account.logged) {
                ctx.res.writeHead(302, {
                    Location: "/register"
                });
                ctx.res.end();
                return (ctx.res.finished = true);
            }

            return { pageProps, account: account };
        }

        return { pageProps, account: {} };
    }

    constructor(props) {
        super(props);

        const { reduxStore, account } = this.props;

        if (account && !account.err) {
            reduxStore.dispatch(setAccount(account));
        }
    }

    render() {
        const { Component, pageProps, reduxStore } = this.props;
        return (
            <React.Fragment>
                <Head />
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </React.Fragment>
        );
    }
}

export default withReduxStore(MyApp);
