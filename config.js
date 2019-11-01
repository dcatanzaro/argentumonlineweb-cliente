exports.api = env => {
    let apiUrl = {
        dev: "http://localhost:3000/api",
        //production: "http://localhost:3000/api"
        production: ""
    };

    return apiUrl[env];
};
