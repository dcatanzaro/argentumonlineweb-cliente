class Game {
    constructor(inits, user, pkg, config, react) {
        this.inits = inits;
        this.user = user;
        this.pkg = pkg;
        this.config = config;
        this.react = react;
    }

    useItem = idPos => {
        if (idPos) {
            const items = this.user.items;
            const objItem = this.inits.objs[items[idPos].idItem];

            if (objItem.proyectil && items[idPos].equipped) {
                this.react.setState({
                    crosshair: true
                });

                this.config.itemSelected = items[idPos].idItem;
            } else {
                if (
                    +Date.now() - this.config.timeItemStart >
                    this.config.intervalItem
                ) {
                    this.config.timeItemStart = +Date.now();

                    this.pkg.setPackageID(this.pkg.serverPacketID.useItem);
                    this.pkg.writeInt(idPos);
                    this.config.ws.send(this.pkg.dataSend());
                }
            }
        }
    };

    equiparItem = (idPos, id) => {
        this.pkg.setPackageID(this.pkg.serverPacketID.equiparItem);
        this.pkg.writeInt(idPos);
        this.config.ws.send(this.pkg.dataSend());
    };

    connectCharacter = () => {
        this.pkg.setPackageID(this.pkg.serverPacketID.connectCharacter);
        this.pkg.writeString(localStorage.getItem("idAccount"));
        this.pkg.writeString(localStorage.getItem("idCharacter") || "");
        this.pkg.writeString(localStorage.getItem("email"));
        this.pkg.writeByte(parseInt(localStorage.getItem("typeGame")));
        this.pkg.writeByte(parseInt(localStorage.getItem("idChar")));

        this.config.ws.send(this.pkg.dataSend());
    };

    writeConsole = (msg, color, bold, italic) => {
        const { messagesConsole } = this.react.state;

        if (!color) {
            color = "white";
        }

        if (bold) {
            bold = "bold";
        } else {
            bold = "normal";
        }

        if (italic) {
            italic = "italic";
        } else {
            italic = "normal";
        }

        messagesConsole.push(
            <span
                style={{ color: color, fontWeight: bold, fontStyle: italic }}
                key={+new Date()}
                dangerouslySetInnerHTML={{ __html: msg }}
            />
        );

        if (messagesConsole.length > 8) {
            messagesConsole.shift();
        }

        this.react.setState({
            messagesConsole: messagesConsole
        });

        const consoleElem = this.react.refs.console;
        const scrollHeight = consoleElem.scrollHeight;
        const height = consoleElem.clientHeight;

        const maxScrollTop = scrollHeight - height;
        consoleElem.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };
}

export default Game;
