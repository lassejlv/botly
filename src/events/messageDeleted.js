const client = require("../index.js");
const Guild = require("../database/models/Guild");
const { MessageEmbed } = require("discord.js");

// messageDelete
/* Emitted whenever a message is deleted.
PARAMETER      TYPE           DESCRIPTION
message        Message        The deleted message    */
client.on("messageDelete", (message) => {
    console.log(`message is deleted -> ${message}`);

    Guild.findOne({ guild_id: message.guild.id }, (err, guild) => {
        if (err) console.log(err);
        if (!guild) return;
        if (!guild.channels.logs) return;

        const embed = new MessageEmbed()
            .setColor(0x00ae86)
            .setTitle("Message Deleted")
            .setDescription(
                `A message was deleted in ${message.channel}, by ${message.author}`
            )
            .addField("Message", message.content)
            .setFooter(`Author: ${message.author.tag}`)
            .setTimestamp();

        client.channels.cache.get(guild.channels.logs).send(embed);
    });
});
