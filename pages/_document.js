// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <html lang="es">
                <Head>
                    <meta charSet="utf-8" />

                    <meta
                        name="description"
                        content="Argentum Online Web es un juego de Rol gratuito, en el que podrás demostrar tus habilidades combatiendo contra otros usuarios."
                    />

                    <link
                        href="https://fonts.googleapis.com/css?family=Doppio+One&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
