"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;

app.get('/hi', (req, res) => {

    res.status(200).send("Hello world");
});
app.get('/weather', (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let searchQuery = "";
    if (lat && lon) {
        searchQuery = weatherData.find(element => element.lat === lat && element.lon === lon)
            // res.status(200).json(searchQuery.city_name);

            ;
    
    console.log(searchQuery);
    if (searchQuery){
    let foreCast = searchQuery.data.map(item => {
        return {
            date: item.datetime,
            description: item.weather.description,
        }
        
    })
    let result={cityName:searchQuery.city_name,foreCast:foreCast};
    res.status(200).json(result);}else{
        res.status(400).send("resources not found")
    }}

    else {
        res.status(400).send("please provide correct query params");
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});