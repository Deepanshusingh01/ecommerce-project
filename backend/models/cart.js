
  module.exports = (sequelize,Sequelize)=>{
    const Cart = sequelize.define("cart",{
      cartId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      productId: {
        type : Sequelize.INTEGER,
        allowNull : false
      }
    });
    return Cart;
  
  }
