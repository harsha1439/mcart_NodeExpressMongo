const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: [true, 'Required Field']
    },
    productName: {
        type: String,
        required: [true, 'Required Field']
    },
    productCode: {
        type: String,
        required: [true, 'Required Field']
    },
    description: {
        type: String,
        required: [true, 'Required Field']
    },
    price: {
        type: Number,
        required: [true, 'Required Field']
    },
    rating: {
        type: Number,
        required: [true, 'Required Field']
    },
    manufacturer: {
        type: String,
        required: [true, 'Required Field']
    },
    osType: {
        type: String,
        required: [true, 'Required Field']
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

const productModel = mongoose.model('products',productSchema)

module.exports = productModel