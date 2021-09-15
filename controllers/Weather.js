"use strict";
const axios = require("axios");
const ForeCast = require("../models/Weather.model");
const WeatherController = async (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    if (lat && lon) {
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
        let axiosResponse = await axios.get(url);
        let weatherData = axiosResponse.data;
        let cleanedData = weatherData.data.map(item => {
            return new ForeCast(item.datetime, item.weather.description);
        })
        res.status(200).json(cleanedData);
    } else {
        res.status(400).send("please provide correct query params");
    }
}
module.exports = WeatherController;