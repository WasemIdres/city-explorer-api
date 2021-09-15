"use strict";
const axios = require("axios");
const movies = require("../models/Movie.model");
const MovieController = async (req, res) => {
    let city_name = req.query.query;
    if (city_name) {
        let url = `https://api.themoviedb.org/3/search/movie?query=${city_name}&api_key=${process.env.MOVIE_API_KEY}`;
        let axiosResponse = await axios.get(url);
        let MovieData = axiosResponse.data;
        let cleanedData = MovieData.results.map(item => {
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
        res.status(200).json(cleanedData);
    } else {
        res.status(400).send("please provide correct query params");
    }
}
module.exports = MovieController;