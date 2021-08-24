const express = require('express')
const mongoose = require('mongoose')


const app = express()

const port=3000
mongoose.connect("mongodb+srv://Harsha:Harsha@cluster0.l06la.mongodb.net/mcart?retryWrites=true&w=majority", {useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
console.log(db)
db.once('open', () => {
    console.log("Database connected")
})
app.listen(port, () =>{
    console.log('Node App statred at port 3000')
})

