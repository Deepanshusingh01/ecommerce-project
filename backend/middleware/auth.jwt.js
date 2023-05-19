const jwt = require('jsonwebtoken')
const config = require('../config/server.config')
const db = require('../models')
const User = db.user


const verifyToken = (req, res ,next) => {

    const token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            mesg: 'Token is not provided'
        })
    }
    jwt.verify(token, config.SECRET, async(err, decoded) => {
        if(err) {
            return res.status(401).send({
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
        return res.status(401).send({
            mesg: 'refresh token is not provided'
        })
    }
    jwt.verify(refreshToken, config.SECRET1, async(err, decoded) => {
        if(err) {
            return res.status(403).send({
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