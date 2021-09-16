"use strict";
const axios = require("axios");
const movies = require("../models/Movie.model");
const cache = require('../models/CacheMovie');
const MovieController = async (req, res) => {
    let city_name = req.query.query;
    if (cache.data !== null && cache.key=== city_name  && (Date.now() - cache.timestamp < 10000000000000000)) {
        res.json(cache.data);
    }
    else if (city_name) {
        let url = `https://api.themoviedb.org/3/search/movie?query=${city_name}&api_key=${process.env.MOVIE_API_KEY}`;
        console.log('Cache miss');
        cache.timestamp = Date.now();
        cache.key = city_name;
        let axiosResponse = await axios.get(url);
        let MovieData = axiosResponse.data;
        cache.data = MovieData.results.map(item => {
            return new movies(
                item.title,
                item.overview,
                item.vote_average,
                item.vote_count,
                item.poster_path,
                item.popularity,
                item.release_date,
            );
        })
        res.status(200).json(cache.data);
    } else {
        res.status(400).send("please provide correct query params");
    }
}
module.exports = MovieController;