const userModel = require('../Model/cartModel')
const validators = require('../Utilities/validator')
const bcrypt = require('bcrypt')
const sanitize = require("mongo-sanitize");


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