const express = require("express")
const request = require("request")
require("dotenv").config()

const weatherRouter = express.Router()

weatherRouter.get("/",(req,res)=>{
    res.send("welcome to the weather api")
})

weatherRouter.get("/stats", (req,res)=>{
    let city = req.query.city
    let request = require("request")
    request(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7652ca6d27e019691735afae228d1718`,
        function (error, response, body){
            let data = JSON.parse(body)
            if(response.statusCode===200){
                res.send(`The weather in you city "${city}" is ${data.weather[0].main}`)
            }
        }
    )
})

module.exports = {weatherRouter}