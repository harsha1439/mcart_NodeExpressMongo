const userModel = require('../Model/cartModel')
const validators = require('../Utilities/validator')
const bcrypt = require('bcrypt')
const sanitize = require("mongo-sanitize");
const productModel = require('../Model/productsModel');
const cartModel = require('../Model/cart');


exports.userSignUp = async (req,res) =>{
const userDataSanatized = sanitize(req.body)
try {
    if(validators.passwordValidate(req.body.password)){
        res.status(404).json({
            message: 'Minimum 5 characters should be there in password'
        })
    }else if(validators.phoneValidate(req.body.phoneNumber)){
        res.status(404).json({
            message: 'Phone number should be 10 digits'
        })
    }
    else{
        const findUsername = await userModel.findOne({username:req.body.username})
        if(findUsername==null){
            const genSalt = bcrypt.genSaltSync(10)
            const hashPwd = bcrypt.hashSync(req.body.password, genSalt);
            req.body.password = hashPwd
            const userData = await userModel.create(userDataSanatized)
            if(userData){
            res.status(201).json({
                message: `User Registered with Name: ${req.body.username}`
            })
        }
        }else{
            res.status(404).json({
                message: 'User already registered'
            })
        }     
    } 
}
catch(err){

}
}



exports.login = async (req,res) => {
    try{
        const user = await userModel.find({username:req.body.username})
        if(user.length>0){
            const match = bcrypt.compareSync(req.body.password,user[0].password)
            if(match){
                res.sendStatus(200)
            }else{
                res.sendStatus(404)
            }
        }else{
            res.sendStatus(401)
        }
    }
    catch(err){

    }
}

exports.addProducts = async (req,res) =>{
    console.log("addproduct route handler")
    try{
        const productsantize = sanitize(req.body)
        const products = await productModel.create(productsantize)
        if(products){
            res.status(201).json({
                message: 'product created successfully'
            })
        }else{
            res.status(404).json({
                message: 'Product not created'
            })
        }
    }
    catch (err){
        res.status(404).json({
            message: err.message
        })
    }
}


exports.getTablets = async (req,res) => {
    try{
        const tablets = await productModel.find({})
        if(tablets.length > 0){
            let devicesFiltered = null
            if(req.url === '/tablets'){
                devicesFiltered =  tablets.filter(item => item.productCode.startsWith("TAB"))
            }else{
                devicesFiltered =  tablets.filter(item => item.productCode.startsWith("MOB"))
            }
           res.status(200).json({
               data: devicesFiltered
           })
        }else{
            res.status(404).json({
                message: "No tablet devices found"
            })
        }
    }
    catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}

exports.addCart = async (req,res) => {
    try{
        const cartDataSanatize = sanitize(req.body)
        //find if cart id is available
        const findCart = await cartModel.findOne({cartId: req.body.cartId})
        //if available append the data to same cart to same cart ID
        console.log(findCart)
        if(findCart != null){
                res.status(406).json({
                    message: 'Users cart is already available, append to the same cart'
                })
        }else{
            //if not available add the new cart item
            const cart = await cartModel.create(cartDataSanatize)
            if(cart){
                res.status(201).json({
                    message: `New items got inserted into the cart with the ID : ${cart.cartId}`
                })
            }else{
                res.status(404).json({
                    message: 'Not able to add cart item'
                })
            }
        }
    }
    catch(err) {
        res.status(404).json({
            message: err.message
        })
    }
}

exports.getCarts = async(req,res,next) => {
    try {
        const getAllCarts = await cartModel.find({})
        if(getAllCarts.length>0){
            res.status(200).json({
                data: getAllCarts
            })
        }else{
            res.status(401).json({
                message: 'No cart items available'
            })
        }
    }catch(err){
        next(err)
    }
}

exports.getCartByUsername = async(req,res) => {
    try{
        const getCartbyUser = await cartModel.findOne({username:req.params.username})
        if(getCartbyUser){
            res.status(200).json({
                data: getCartbyUser
            })
        }else{
            res.status(404).json({
                message: 'No cart available with username'
            })
        }
    }
    catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}


exports.updateByUsername = async(req,res) => {
    try{
        const updateCart = await cartModel.findOneAndUpdate({username:req.params.username},req.body)
        if(updateCart){
            res.status(200).json({
                message: `CartID: ${updateCart.cartId} updated`
            })
        }else{
            res.status(404).json({
                message: 'No cart available with username'
            })
        }
    }
    catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}


