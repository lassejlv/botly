const client = require("../index.js");
const Guild = require("../database/models/Guild");

/* Emitted whenever the client joins a guild.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The created guild    */
client.on("guildCreate", (guild, message) => {
    Guild.findOne({ guild_id: guild.id }, (err, noGuild) => {
        if (err) console.log(err);
        if (!noGuild) {
            const newGuild = new Guild({
                guild_id: guild.id,
            });
            newGuild.save();
        }
    });
});
