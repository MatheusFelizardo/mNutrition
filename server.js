const express = require('express')

const app = express()
const nunjucks = require("nunjucks")
const routes = require('./routes')

app.set ("view engine", "njk")
app.use(express.urlencoded({ extended: true}))

app.use(routes)

nunjucks.configure ("", {
    express: app, 
    autoescape: false,
    noCache: true
})

app.use(express.static('public'))

app.listen ("5000", () =>{
    console.log("Servidor rodando.")
})