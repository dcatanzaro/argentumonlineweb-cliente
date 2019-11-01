const branchEnv = process.env.BRANCH;
const axios = require("axios");

let self = {};

self.sendTelegramMessage = message => {
    // const botId = "";
    // const chatId = "";
    // const telegramMsg = encodeURIComponent(message);
    // const url = `https://api.telegram.org/${botId}/sendMessage?chat_id=${chatId}&text=${telegramMsg}`;
    // if (branchEnv != "local") {
    //     axios.get(url);
    // }
};

module.exports = self;
