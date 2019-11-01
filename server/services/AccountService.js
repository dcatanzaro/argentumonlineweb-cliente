const Accounts = require("../models/accounts");

class AccountService {
    constructor() {}

    getAccount(data) {
        const query = Accounts.findOne(data).lean();

        return query;
    }

    addUser(data) {
        const newAccounts = new Accounts(data);

        return newAccounts.save();
    }

    updateAccounts(id, data) {
        const account = Accounts.findOneAndUpdate({ _id: id }, data).lean();

        return account;
    }

    findAccountsByEmail(email) {
        const query = Accounts.findOne({ email: email }).lean();

        return query;
    }

    findAccountsByName(name) {
        const query = Accounts.findOne({ name: name }).lean();

        return query;
    }

    findAccountsById(id) {
        const query = Accounts.findOne({ _id: id }).lean();

        return query;
    }
}

module.exports = AccountService;
