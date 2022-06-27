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
      .setColor("#00ff00")
      .setTitle(client.user.username + " Logged in!")
      .setDescription("Ready in " + (Date.now() - time) + "ms!")
      .addField("Client ID", client.user.id)
      .addField("Logged in at", time)
  );

  console.log(`Done, ready in ${Date.now() - time}ms`);
});

client.login(config.get("token"));
