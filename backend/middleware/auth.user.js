const db = require("../models");
const User = db.user

function validEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
}

const verifyUserSignup = async(req,res,next) =>{

    if(!req.body.name){
        return res.status(400).send({
            mesg : "Name is not provided"
        })
    }

    if(!req.body.email){
        return res.status(400).send({
            mesg : "Email is not provided"
        })
    }else if(req.body.email){

        if(!validEmail(req.body.email)){
            return res.status(400).send({
                mesg : "Not a valid Email"
            })
        }else{
            const user = await User.findOne({where:{email:req.body.email}});
            if(user){
                return res.status(400).send({
                    mesg : "User already exist with this email"
                })
            }
        }
    }
    

    if(!req.body.password){
        return res.status(400).send({
            mesg : "Password is not provided"
        })
    }

    if(!req.body.phoneNo){
        return res.status(400).send({
            mesg : "Phone number is not provided"
        })
    }else{
        if((req.body.phoneNo).toString().length !== 10){
            return res.status(400).send({
                mesg:"Phone number should be of 10 digit"
            })
        }
    }
    next()
}


module.exports = {
    verifyUserSignup : verifyUserSignup
}