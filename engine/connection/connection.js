class Connection {
    constructor(messages, pkg, game, engine, user, config, react) {
        this.messages = messages;
        this.pkg = pkg;
        this.game = game;
        this.engine = engine;
        this.user = user;
        this.config = config;
        this.react = react;

        window.onbeforeunload = () => {
            this.config.ws.onclose = () => {};
            this.config.ws.close();
        };
    }

    startWebSocket() {
        if (this.config.debug) {
            this.config.ws = new WebSocket(this.config.LOCAL_SERVER_ENDPOINT);
        } else {
            this.config.ws = new WebSocket(this.config.PROD_SERVER_ENDPOINT);
        }

        this.config.ws.binaryType = "arraybuffer";

        this.config.ws.onopen = () => {
            this.react.setState({
                showModalReconnect: false
            });

            console.log("Conecto Web Socket");
            this.game.connectCharacter();

            setInterval(() => {
                if (this.user.id) {
                    this.config.pingStart = +Date.now();

                    this.pkg.setPackageID(this.pkg.serverPacketID.ping);
                    this.config.ws.send(this.pkg.dataSend());
                }
            }, 10000);
        };

        this.config.ws.onclose = () => {
            this.engine.deleteAllPersonajes();
            this.config.usersOnline = 0;
            this.config.dialogs = {};
            this.user.id = 0;
            this.user.pos.x = 0;
            this.user.pos.y = 0;
            this.engine.ping = 0;
            this.config.items = {};
            this.config.spells = {};
            this.config.seguroActivado = true;

            this.items = {};
            this.spells = {};

            this.react.setState({
                user: this.user,
                messagesConsole: []
            });

            this.engine.clearRender("items");
            this.engine.clearRender("background");
            this.engine.clearRender("techos");
            this.engine.clearRender("foreground");
            this.engine.clearRender("textos");

            if (!this.config.varCloseForce) {
                this.react.setState({
                    showModalReconnect: true
                });

                setTimeout(() => {
                    if (this.config.debug) {
                        this.startWebSocket();
                    } else {
                        this.startWebSocket();
                    }
                }, 5000);
            }
        };

        this.config.ws.onerror = err => {
            console.log("WebSocket Error ");
            console.log(err);
        };

        this.config.ws.onmessage = this.messages.connectionMessages;
    }
}

export default Connection;

// export function cleanMap() {
//     for (numMap = 1; numMap <= 290; numMap++) {
//         engine.cleanMapData(numMap);
//     }

//     console.log("borro todo");
// }
