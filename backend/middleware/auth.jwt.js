const jwt = require("jsonwebtoken")
const config = require("../config/server.config")
const db = require("../models")
const User = db.user


const verifyToken = (req,res,next) =>{

    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            mesg : "Token is not provided"
        })
    }
    jwt.verify(token,config.SECRET,async(err,decoded) =>{
        if(err){
            return res.status(401).send({
                mesg : "Unauthorized!"
            })
        }
        const user = await User.findOne({where:{userId:decoded.id}})
        req.user = user
        next()
    })
}

const verify = {
    verifyToken : verifyToken
}

module.exports = verify