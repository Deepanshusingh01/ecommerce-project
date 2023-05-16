const db = require('../models');
const User = db.user;



module.exports = {

    findAllUser: async () => {
        const users = await User.findAll();
        return users;
    },
    findUserByPk:async (userId)=>{
        const user = await User.findByPk(userId)
        return user;
    },
    updateUserByUserId:async(userData,Id)=>{
        const updatedUser = await User.update(userData,{
            where:{userId:Id},
            returning : true
        })
        return updatedUser;
    }
}






























// module.exports = {
//     createUser: async (userData) => {
//       const user = await User.create(userData);
//       return user.toJSON();
//     },
  
//     getUserById: async (userId) => {
//       const user = await User.findByPk(userId);
//       if (!user) {
//         throw new Error('User not found');
//       }
//       return user.toJSON();
//     },
  
//     updateUserById: async (userId, userData) => {
//       const [numUpdated, [updatedUser]] = await User.update(userData, {
//         where: { id: userId },
//         returning: true,
//       });
//       if (numUpdated === 0) {
//         throw new Error('User not found');
//       }
//       return updatedUser.toJSON();
//     },
  
//     deleteUserById: async (userId) => {
//       const numDeleted = await User.destroy({ where: { id: userId } });
//       if (numDeleted === 0) {
//         throw new Error('User not found');
//       }
//     },
//   };
