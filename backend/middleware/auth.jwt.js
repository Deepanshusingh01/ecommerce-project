const jwt = require('jsonwebtoken')
const config = require('../config/server.config')
const db = require('../models')
const User = db.user
const { StatusCodes } = require('http-status-codes')


const verifyToken = (req, res ,next) => {

    const token = req.headers['x-access-token'];

    if(!token) {
        return res.status(StatusCodes.FORBIDDEN).send({
            mesg: 'Token is not provided'
        })
    }
    jwt.verify(token, config.SECRET, async(err, decoded) => {
        if(err) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                mesg: 'Unauthorized!'
            })
        }
        const user = await User.findOne({ where: { userId: decoded.id }})
        req.user = user
        next()
    })
}

const refreshToken = (req, res, next) => {

    const refreshToken = req.headers['refresh-token'];

    if(!refreshToken) {
        return res.status(StatusCodes.FORBIDDEN).send({
            mesg: 'refresh token is not provided'
        })
    }
    jwt.verify(refreshToken, config.SECRET1, async(err, decoded) => {
        if(err) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                mesg: 'unauthorized!'
            })
        }
        const user = await User.findOne({ where: { userId: decoded.id } });
        req.user = user;
        next()
    })
}

const verify = {
    verifyToken,
    refreshToken,
}

module.exports = verify