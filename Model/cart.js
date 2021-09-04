const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    cartId: {
        type: Number,
        unique: true,
        required: [true, 'Required Field']
    },
    username: {
        type: String,
        required: [true, 'Required Field']
    },
    productsInCart: {
        type: Array,
        required: [true, 'Required Field']
    },
    statusOfCart: {
        type: String,
        // required: [true, 'Required Field']
    },
},
{
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

const cartModel = mongoose.model('cart',cartSchema)

module.exports = cartModel