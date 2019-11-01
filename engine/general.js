class General {
    constructor(pkg, config) {
        this.pkg = pkg;
        this.config = config;
    }

    sendDialog = msg => {
        msg = msg.trim();
        if (msg) {
            const msgsplit = msg.split(" ");

            if (msgsplit[0].charAt(0) == "/") {
                msgsplit[0] = msgsplit[0].toLowerCase();
            }
            if (msg.length > this.config.textMaxLength) {
                msg = msg.slice(0, this.config.textMaxLength);
            }

            this.pkg.setPackageID(this.pkg.serverPacketID.dialog);
            this.pkg.writeString(msg);
            this.config.ws.send(this.pkg.dataSend());
        }
    };
}

export default General;
