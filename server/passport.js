const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    Accounts = require("./models/accounts"),
    bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "name",
            passwordField: "password"
        },
        (req, name, password, done) => {
            return Accounts.findOne({ nameSanitized: name.toLowerCase() }).then(
                data => {
                    if (!data) {
                        return done(null, {
                            error: true,
                            message: "Usuario o contraseña incorrectos."
                        });
                    }

                    if (!isValidPassword(data.password, password)) {
                        return done(null, {
                            error: true,
                            message: "Usuario o contraseña incorrectos."
                        });
                    }

                    const bodyAccount = {
                        accountId: data._id,
                        name: data.name,
                        nameSanitized: data.nameSanitized,
                        email: data.email
                    };

                    return done(null, bodyAccount);
                }
            );
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

function isValidPassword(userpass, password) {
    return bcrypt.compareSync(password, userpass);
}
