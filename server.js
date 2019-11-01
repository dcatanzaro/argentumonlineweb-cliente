const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const urls = require("./config/urls.json");
const compression = require("compression");

const passport = require("passport"),
    passportConfig = require("./server/passport"),
    flash = require("express-flash"),
    cookieParser = require("cookie-parser"),
    cookieSession = require("cookie-session"),
    session = require("express-session"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    routes = require("./server/routes");

if (dev) {
    const urlMongo = "mongodb://localhost:27017/aoweb";
    mongoose.connect(urlMongo, { useNewUrlParser: true });
} else {
    const urlMongo = "";
    mongoose.connect(urlMongo, { useNewUrlParser: true });
}

const robotsOptions = {
    root: __dirname + "/static/",
    headers: {
        "Content-Type": "text/plain; charset=UTF-8"
    }
};

app.prepare().then(() => {
    const server = express();

    server.use(compression());

    server.use(
        require("cors")({
            origin: function(origin, callback) {
                callback(null, origin);
            },
            credentials: true
        })
    );

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.use(flash());

    server.use(cookieParser());
    server.use(
        cookieSession({
            name: "session",
            keys: [""],
            domain: !dev ? "argentumonlineweb.com" : "",
            maxAge: 24 * 60 * 60 * 1000 * 7
        })
    );

    server.use(passport.initialize());
    server.use(passport.session());

    server.get("/robots.txt", (req, res) =>
        res.status(200).sendFile("robots.txt", robotsOptions)
    );

    routes(server);

    Object.keys(urls).map(function(url, index) {
        const href = urls[url];

        server.get(url, (req, res) => {
            return app.render(req, res, href, req.query, req.params);
        });
    });

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
