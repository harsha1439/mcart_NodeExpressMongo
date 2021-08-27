const express = require('express')
const mcartController = require('../Controller/mcartController')
const routing = express.Router()

routing.post('/signup',mcartController.userSignUp)


module.exports = routing