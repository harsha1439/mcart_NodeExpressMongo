
exports.passwordValidate = (pass) =>{
    if(pass.length < 5){
        return true
    }
}

exports.phoneValidate = (phone) =>{
    if(phone.toString().length <10 || phone.toString().length>10){
        return true
    }
}
