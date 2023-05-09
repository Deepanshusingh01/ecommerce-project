const db = require("../models");
const User = db.user
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/server.config");
const userService = require("../services/userServices")

exports.signup = async(req,res) =>{

    try{
    const {name,email,phoneNo,password} = req.body;
    const hashpassword = bcrypt.hashSync(password,2);

    const user = await User.create({
        name,
        email,
        phoneNo,
        password :hashpassword
})

    const response = {
        userId : user.userId,
        name : user.name,
        email : user.email,
        phoneNo : user.phoneNo
    }

    return res.status(201).send(response)
}catch(err){
    console.log("error while registering new user",err);
    return res.status(500).send({
        mesg : "Internal server error"
    })
}
}


exports.signin = async (req,res) =>{

    try{
        
    const {email,password} = req.body
    const user = await User.findOne({where:{email}});
    if(user){
        const validPassword = bcrypt.compareSync(password,user.password)
        if(validPassword){
            const token = jwt.sign({id:user.userId},config.SECRET,{expiresIn:6000})
            const response = {
                userId : user.userId,
                name : user.name,
                accessToken : token
            }
            return res.status(200).send(response)
        }else{
            return res.status(400).send({
                mesg : "Email or Password may be wrong"
            })
        }
    }
    else{
        return res.status(400).send({
            mesg : "Email does not exist"
        })
    }
}catch(err){
    console.log("Error while user login",err);
    return res.status(500).send({
        mesg : "Internal server error"
    })
}
}

exports.findAll = async (req,res) =>{

    try{

    const users = await userService.findAllUser();
    return res.status(200).send(users)

    }catch(err){
        console.log("Error while finding all users",err);
        return res.status(500).send({
            mesg : "Internal server error"
        })
    }
}


exports.findById = async (req,res) =>{

    try{
    const userId = req.params.id
    const user = await userService.findUserByPk(userId);

    if(!user){
        return res.status(400).send({
            mesg : "User does not exist"
        })
    }
    return res.status(200).send(user)
}catch(err){
    console.log("Error while finding user by userId",err);
    return res.status(500).send({
        mesg : "Internal server error"
    })
}
}

exports.updateUser = async(req,res) =>{

    try{
    const userId = req.params.id
    const updatedUser = await userService.updateUserByUserId(req.body,userId);
    return res.status(200).send(updatedUser)
    }catch(err){
        console.log("Error while updating user by userId",err);
        return res.status(500).send({
            mesg : "Internal server error"
        })
    }
}
