const mongoose = require("mongoose");
const { mongodb } = require("../config.json");

mongoose.connect(
    mongodb.url,
    {
        useNewUrlParser: true,
    },
    () => {
        console.log("MongoDB connected");
    }
);
