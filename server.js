"use strict";
const express=require("express");
const app=express();
const cors=require("cors");
const axios=require("axios");
require("dotenv").config();
app.use(cors());
const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.status(200).json({"message":"I'm working"})
})

let handleWeather= async (req,res)=>{
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    if (lat&&lon) {
        let url=`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
        let axiosResponse= await axios.get(url);
        let weatherData=axiosResponse.data;
        let cleanedData=weatherData.data.map(item=>{
            return new ForeCast(item.datetime,item.weather.description);
        })
        res.status(200).json(cleanedData);
    }else{
        res.status(400).send("please provide correct query params");
    }
   
}
let handleMovie= async (req,res)=>{
    let city_name = req.query.query;
    if (city_name) {
        let url=`http://api.themoviedb.org/3/search/movie?query=${city_name}&api_key=${process.env.MOVIE_API_KEY}`;
        let axiosResponse= await axios.get(url);
        let MovieData=axiosResponse.data;
        let cleanedData=MovieData.results.map(item=>{
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
    }else{
        res.status(400).send("please provide correct query params");
    }
   
}

app.get('/weather',handleWeather)
app.get('/movies',handleMovie)
app.listen(PORT,()=>{
   console.log(`listening to port ${PORT}`)
});

// Model
class ForeCast{
    constructor(date,description){
        this.date=date;
        this.description=description
    }
}
// Model
class movies{
    constructor(title,overview,average_votes,total_votes,image_url,popularity,released_on){
        this.title=title;
        this.overview=overview;
        this.average_votes=average_votes;
        this.total_votes=total_votes;
        this.image_url="https://image.tmdb.org/t/p/w500/"+image_url;
        this.popularity=popularity;
        this.released_on=released_on;
    }
}

// app.get('/', (req, res) => {
//     res.status(200).send("Hello world");
// });
// app.get('/weather', (req, res) => {
//     let lat = Number(req.query.lat);
//     let lon = Number(req.query.lon);
//     let searchQuery = "";
//     if (lat && lon) {
//         searchQuery = weatherData.find(element => element.lat === lat && element.lon === lon)
//             // res.status(200).json(searchQuery.city_name);

//             ;
    
//     console.log(searchQuery);
//     if (searchQuery){
//     let foreCast = searchQuery.data.map(item => {
//         return {
//             date: item.datetime,
//             description: item.weather.description,
//         }
        
//     })
//     let result={cityName:searchQuery.city_name,foreCast:foreCast};
//     res.status(200).json(result);}else{
//         res.status(400).send("resources not found")
//     }}

//     else {
//         res.status(400).send("please provide correct query params");
//     }
// })

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// });
// `https://api.themoviedb.org/3/search/movie?query=${city_name}&api_key=${process.env.MOVIE_API_KEY}`