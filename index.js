const express = require("express")
const bodyParser = require("body-parser")                   // bodyparser dotenv mongoose nodemon 
const env = require("dotenv").config()
const  route  = require("./src/route/route")
const { dbConnection } = require("./src/database/db")
const url = process.env.DBconnection
const port = process.env.port
const app = express()

//helo

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


dbConnection(url)
app.use("/",route)




app.listen(port||3000,()=>{
    console.log("server start");
})
