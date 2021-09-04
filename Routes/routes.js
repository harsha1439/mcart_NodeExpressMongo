const express = require('express')
const mcartController = require('../Controller/mcartController')
const routing = express.Router()

routing.post('/signup',mcartController.userSignUp)
routing.get('/login',mcartController.login)
//products
routing.post('/products', mcartController.addProducts)
routing.get('/tablets',mcartController.getTablets)
routing.get('/mobiles',mcartController.getTablets)
//cart
routing.post('/carts',mcartController.addCart)
routing.get('/carts',mcartController.getCarts)
routing.get('/carts/:username',mcartController.getCartByUsername)
routing.put('/carts/:username',mcartController.updateByUsername)

module.exports = routing