const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/dash", (req, res) => {
    res.json({
        message: "Good",
        status: 200,
    });
});

router.get("/login", (req, res) => {
    res.redirect("/auth");
});

module.exports = router;
