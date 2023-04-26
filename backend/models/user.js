


module.exports = (sequelize,Sequelize) =>{

    const User = sequelize.define("user",{
        userId : {
            type : Sequelize.INTEGER,
            allownull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.STRING(50),
            allownull : false
        },
        email : {
            type : Sequelize.STRING(50),
            allownull : false
        },
        password : {
            type : Sequelize.STRING,
            allownull : false
        },
        phoneNo : {
            type : Sequelize.BIGINT,
            allownull:false
          },
        createdAt : {
            type : Sequelize.DATE,
            defaultValue : Sequelize.NOW
        }
    })
    return User;
}