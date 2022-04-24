require("./database/index.js");
require("./website/utils/discord");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const { Collection, Client, Discord } = require("discord.js");
const client = new Client({
    disableMention: "everyone",
});
const path = require("path");
const fs = require("fs");
const config = require("./config.json");

module.exports = client;
client.commands = new Collection();
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve("src/commands"));
["command"].forEach((handler) => {
    require(path.resolve(`src/handlers/${handler}`))(client);
});

// Express Configuration
app.use(express.static("./src/website/public"));
app.set("view engine", "ejs");
app.set("views", path.resolve("src/website/views"));

// Passport & Sessions
app.use(
    session({
        secret: "somethingverysecret",

        cookie: {
            maxAge: 60000 * 60 * 24,
        },
        // resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./website/routes/index"));
app.use("/api", require("./website/routes/api"));
app.use("/auth", require("./website/routes/auth"));

client.login(config.client.token);
app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});
