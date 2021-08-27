const express = require('express')
const mcartController = require('../Controller/mcartController')
const routing = express.Router()

routing.post('/signup',mcartController.userSignUp)
routing.get('/login',mcartController.login)


module.exports = routing