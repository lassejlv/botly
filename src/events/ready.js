const client = require("../../src/index");

client.on("ready", () => {
  console.log(`${client.user.tag} is now online!`);

  setInterval(() => {
    const status = [
      `Im back, I swear!`,
      `Commands are coming soon!`,
      `Over ${client.guilds.cache.size} servers`,
      `Over ${client.users.cache.size} users`,
    ];
    const random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random], { type: "WATCHING" });
  }, 5000);
});
