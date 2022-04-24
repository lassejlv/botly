const { Client, Message, MessageEmbed } = require("discord.js");
const Red = require("../../config.json").colors.red[600];
const Green = require("../../config.json").colors.green[600];
const Guild = require("../../database/models/Guild");

module.exports = {
    name: "logchannel",
    description: "Sets the log channel for the server.",
    cooldown: 10000,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let embedNoPerms = new MessageEmbed()
            .setColor(Red)
            .setDescription(
                `${message.author} You do not have permission to use this command.`
            );

        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(embedNoPerms);
        }

        const mention = message.mentions.channels.first();

        let embed = new MessageEmbed()
            .setColor(Red)
            .setDescription(
                "Please mention a channel to set the log channel to."
            );

        if (!mention) {
            return message.channel.send(embed);
        }

        Guild.findOneAndUpdate(
            { guild_id: message.guild.id },
            { $set: { channels: { logs: mention.id } } },
            { new: true },
            (err, guild) => {
                if (err) console.log(err);
                if (!guild) {
                    const newGuild = new Guild({
                        guild_id: message.guild.id,
                        channels: { logs: mention.id },
                    });
                    newGuild.save();
                }
            }
        );

        let embedSuccess = new MessageEmbed()
            .setColor(Green)
            .setDescription(
                `${message.author} The log channel has been set to ${mention} \n\n**Note:** To change the log channel, then just use the exact same command again.`
            );

        message.channel.send(embedSuccess);
    },
};
