const express = require('express')
const mongoose = require('mongoose')
const routing = require('./Routes/routes')
const bodyparser = require('body-parser')

const app = express()

const port=3000
mongoose.connect("mongodb+srv://Harsha:Harsha@cluster0.l06la.mongodb.net/mcart?retryWrites=true&w=majority", {useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
db.once('open', () => {
    console.log("Database connected")
})
app.use(bodyparser.json())
app.use('/',routing)
app.listen(port, () =>{
    console.log('Node App statred at port 3000')
})

