
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development'
const Config = require('../config/config')[env]

const sequelize = new Sequelize(
    Config.database,
    Config.username,
    Config.password,
    {
        ...Config,
        logging:false
    }
    // {
    //     host:Config.host,
    //     dialect : Config.dialect
    // }
    )
    
const auth = async ()=>{
    try{
    await sequelize.authenticate()
    console.log('Conneted to database')
    }catch(err){
        console.log('error while connecting to database')
    } 
}
auth()


module.exports = sequelize
