const express = require('express')
const routes = express.Router()
const axios =  require('axios')

routes.get("/", (req,res)=> {

    res.render("index")

})

routes.get("/dieta", async(req,res)=> {

    try {
        const {data} = await axios("https://taco-food-api.herokuapp.com/api/v1/food/")

        res.render("dieta", {data})
        
    } catch (error) {
        console.error(error)
    }


})



module.exports = routes