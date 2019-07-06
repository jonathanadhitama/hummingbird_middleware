const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

let app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const GOOGLE_MAPS_PLACES_URL =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";

app.get("/places", (req, res) => {
    if (Boolean(req.query) && Boolean(req.query.input)) {
        axios
            .get(GOOGLE_MAPS_PLACES_URL, {
                params: {
                    input: req.query.input,
                    key: process.env.GOOGLE_MAP_API_KEY
                }
            })
            .then(({ data, status }) => {
                res.set("Content-Type", "application/json");
                res.status(status);
                res.send(data);
            });
    } else {
        res.status(422);
        res.send(null);
    }
});

module.exports = app;
