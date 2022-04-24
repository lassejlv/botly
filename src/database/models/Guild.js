const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
    guild_id: {
        type: String,
        required: true,
    },

    prefix: {
        type: String,
        default: "!",
    },

    channels: {
        type: Object,
        default: {
            welcome: "",
            goodbye: "",
            logs: "",
        },
    },
});

module.exports = mongoose.model("Guild", GuildSchema);
