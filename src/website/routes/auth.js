const router = require("express").Router();
const passport = require("passport");

router.get("/", passport.authenticate("discord"));

router.get(
    "/callback",
    passport.authenticate("discord", {
        failureRedirect: "/forbidden",
    }),
    (req, res) => res.send(200)
);

module.exports = router;
