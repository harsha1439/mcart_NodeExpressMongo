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
            res.status(200).json({
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