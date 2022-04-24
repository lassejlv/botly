const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const config = require("../../config.json");

passport.use(
    new DiscordStrategy(
        {
            clientID: config.client.client_id,
            clientSecret: config.client.client_secret,
            callbackURL: "/auth/callback",
            scope: ["identify", "guilds"],
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile.username);
        }
    )
);
