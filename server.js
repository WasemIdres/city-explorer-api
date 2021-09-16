"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
app.use(cors());
const PORT = process.env.PORT;
const getWeather=require("./controllers/Weather");
const MovieController=require("./controllers/Movie");
app.get('/', (req, res) => {
    res.status(200).json({ "message": "I'm working" })
})
app.get('/weather', getWeather)
app.get('/movies', MovieController)
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
});