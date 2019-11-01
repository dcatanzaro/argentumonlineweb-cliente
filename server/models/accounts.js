var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var Accounts = new Schema({
    name: String,
    nameSanitized: String,
    password: String,
    email: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("accounts", Accounts);
