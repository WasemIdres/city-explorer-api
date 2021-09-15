"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
app.use(cors());
const PORT = process.env.PORT;
const WeatherController=require("./controllers/Weather.controller");
const MovieController=require("./controllers/Movie.controller");
app.get('/', (req, res) => {
    res.status(200).json({ "message": "I'm working" })
})
app.get('/weather', WeatherController)
app.get('/movies', MovieController)
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
});