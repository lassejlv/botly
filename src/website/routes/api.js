const client = require("../../index");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");

function getAllCommands() {
    const commands = [];
    const categories = fs.readdirSync(path.resolve("src/commands"));
    categories.forEach((category) => {
        const files = fs.readdirSync(path.resolve(`src/commands/${category}`));
        files.forEach((file) => {
            const command = require(path.resolve(
                `src/commands/${category}/${file}`
            ));
            commands.push(command);
        });
    });
    return commands;
}

router.get("/client/info", (req, res) => {
    res.json({
        message: "Good",
        status: 200,

        info: {
            users: client.users.cache.size,
            guilds: client.guilds.cache.size,
            channels: client.channels.cache.size,
            commands: getAllCommands().length,
        },
    });
});

module.exports = router;
