'use strict';
const cache = require('../models/Cache');
const axios = require("axios");
let getWeather = async (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    const key = 'weather-' + lat + lon;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5`;
    if (cache.data !== null && cache.key=== key  && (Date.now() - cache.timestamp < 50000)) {
        res.json(cache.data);
    } else {
        console.log('Cache miss');
        cache.timestamp = Date.now();
        cache.data = await axios.get(url)
            .then(response => parseWeather(response.data));
        cache.key = key;
        res.status(200).json(cache.data);
    }

    return cache.data;
}
function parseWeather(weatherData) {
    try {
        console.log(weatherData.data)
        console.log('Cache miss');
        let weatherSummaries = weatherData.data.map(item  => {
            return new Weather(item.datetime, item.weather.description);
        });
        return Promise.resolve(weatherSummaries);
    } catch (e) {
        return Promise.reject(e);
    }
}
class Weather {
    constructor(date, description) {
        this.date = date;
        this.description = description
    }
}
module.exports = getWeather;




