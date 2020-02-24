const express = require('express')
const router = express.Router()
const City = require('../models/city')
const request = require("request")

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/WA')





const apiKey = "da8efec24a2ebd3b14713a35bb1f2c4f"

router.get(`/city/:cityName`, function (req, res) {
    let name = req.params.cityName
    console.log(name);

    request(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`, function (request, response) {


        const data = JSON.parse(response.body);
        const city = {
            name: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].description,
            conditionPic: data.weather[0].icon,
        }

        res.send(city)


    })
})

router.get(`/cities`, function (req, res) {
    City.find({}, function (err, city) {
        res.send(city)
    })



})

router.post(`/city`, async function (req, res) {
    const city = new City(req.body)
    console.log(`name :${city.name}`);

    await city.save()
    console.log(`added :${city}`);

    res.end()

})

router.delete(`/city`, function (req, res) {
    let city = req.body
    console.log(city.name);

    City.findOneAndRemove({ name: req.body.name }, function (err) {

    })
    res.end()

})




module.exports = router
