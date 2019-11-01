const passport = require("passport");
const bcrypt = require("bcryptjs");

class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }

    login(req, res, next) {
        passport.authenticate("local", (err, user) => {
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                return res.json(user);
            });
        })(req, res, next);
    }

    logout(req, res) {
        req.logout();

        return res.json({
            logout: true
        });
    }

    async verifyLogin(req, res) {
        if (req.user) {
            return res.json(req.user);
        } else {
            return res.json({
                err: true,
                logged: false
            });
        }
    }

    async register(req, res, next) {
        const { name, email, password } = req.body;
        const accountByEmail = await this.accountService.findAccountsByEmail(
            email
        );

        if (accountByEmail) {
            return res.json({
                error: true,
                message: "Ya existe una cuenta creada con ese email."
            });
        }

        const accountByName = await this.accountService.findAccountsByName(
            name
        );

        if (accountByName) {
            return res.json({
                error: true,
                message: "Ya existe una cuenta creada con ese usuario."
            });
        }

        const hashedPassword = bcrypt.hashSync(password);

        const data = {
            name,
            nameSanitized: name.toLowerCase(),
            email,
            password: hashedPassword
        };

        const newAccount = await this.accountService.addUser(data);

        passport.authenticate("local", (err, user) => {
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                return res.json(user);
            });
        })(req, res, next);
    }
}

module.exports = AccountController;
