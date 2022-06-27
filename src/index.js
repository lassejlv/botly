require("dotenv").config();
const ClientConfig = require("./ClientClient");
const Discord = require("discord.js");
const chalk = require("chalk");

const config = new ClientConfig({
  token: process.env.TOKEN,
  prefix: "!",
});

const client = new Discord.Client({ disableMentions: "everyone" });
let time = Date.now();

client.on("ready", () => {
  client.channels.cache.get("988161146500563004").send(
    new Discord.MessageEmbed()
      .setColor("WHITE")
      .setTitle(client.user.username + " ready to serve! 🚀")
      .setDescription("Ready in " + (Date.now() - time) + "ms!")
      .addField("Client ID", `${client.user.id}`)
  );

  console.log(`Done, ready in ${Date.now() - time}ms`);
});

client.login(config.get("token"));
