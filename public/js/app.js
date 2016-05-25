// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
var timer = +Date.now();
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app": "../app",
        "config": "../app/engine/config.js?v=" + timer,
        "helper": "../app/helper.js?v=" + timer,
        "jquery": "jquery.min",
        "hotkeys": "jquery.hotkeys.min",
        "keystatus": "keyStatus.min",
        "screenfull": "screenfull",
        "engine": "../app/engine.js?v=" + timer,
        "connection": "../app/connection/connection.js?v=" + timer,
        "messages": "../app/connection/messages.js?v=" + timer,
        "console": "../app/engine/console.js?v=" + timer,
        "PxLoader": "PxLoader",
        "PxLoaderImage": "PxLoaderImage",
        "Long": "Long.min",
        "ByteBuffer": "ByteBuffer",
        "stats": "stats.min",
        "pkg": '../app/connection/package.js?v=' + timer
    },
    "shim": {
        "hotkeys": ["jquery"],
        "keystatus": ["jquery"],
        "helper": ["jquery"],
        "console": ["jquery", "helper", "pkg"],
        "PxLoaderImage": ["PxLoader"],
        "ByteBuffer": ["Long"],
        "pkg": ["ByteBuffer"],
        "engine": ["PxLoader", "PxLoaderImage", "pkg", "stats"],
        "messages": ["jquery", "engine", "pkg"],
        "connection": ["helper", "config", "messages", "pkg"],
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
