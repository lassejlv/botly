const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix } = require("../../config.json");
const blue = require("../../config.json").colors.blue[600];
const red = require("../../config.json").colors.red[600];

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Shows all available bot commands.",
    run: async (client, message, args) => {
        const roleColor =
            message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;

        if (!args[0]) {
            let categories = [];

            readdirSync("./src/commands/").forEach((dir) => {
                const commands = readdirSync(`./src/commands/${dir}/`).filter(
                    (file) => file.endsWith(".js")
                );

                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "In progress." : cmds.join(" "),
                };

                categories.push(data);
            });

            const embed = new MessageEmbed()
                .setTitle("📬 Do you need help? Here are all of my commands:")
                .addFields(categories)
                .setDescription(
                    `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ping\`.`
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()
                .setColor(blue);
            return message.channel.send(embed);
        } else {
            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) =>
                        c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(
                        `Invalid command! Use \`${prefix}help\` for all of my commands!`
                    )
                    .setColor(red);
                return message.channel.send(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField("PREFIX:", `\`${prefix}\``)
                .addField(
                    "COMMAND:",
                    command.name
                        ? `\`${command.name}\``
                        : "No name for this command."
                )
                .addField(
                    "ALIASES:",
                    command.aliases
                        ? `\`${command.aliases.join("` `")}\``
                        : "No aliases for this command."
                )
                .addField(
                    "USAGE:",
                    command.usage
                        ? `\`${prefix}${command.name} ${command.usage}\``
                        : `\`${prefix}${command.name}\``
                )
                .addField(
                    "DESCRIPTION:",
                    command.description
                        ? command.description
                        : "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()
                .setColor(blue);
            return message.channel.send(embed);
        }
    },
};
