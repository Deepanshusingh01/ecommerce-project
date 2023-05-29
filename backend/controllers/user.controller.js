const db = require("../models");
const User = db.user;
const ResetToken = db.resetToken;
const bcrypt = require("bcryptjs");
const Op = require("sequelize").Op;
const jwt = require("jsonwebtoken");
const config = require("../config/server.config");
const userService = require("../services/userServices");
const { nodeMailer } = require("../utils/nodeMailer");
const moment = require("moment");
const { StatusCodes } = require("http-status-codes");

exports.signup = async (req, res) => {
  try {
    const { name, email, phoneNo, password } = req.body;
    const hashpassword = bcrypt.hashSync(password, 2);

    const user = await User.create({
      name,
      email,
      phoneNo,
      password: hashpassword,
    });

    const response = {
      userId: user.userId,
      name: user.name,
    };

    return res.status(StatusCodes.CREATED).send(response);
  } catch (err) {
    console.log("error while registering new user", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: "Internal server error",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const session = req.session;
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        const token = jwt.sign({ id: user.userId }, config.SECRET, {
          expiresIn: 120,
        }); // 2 min
        const refreshToken = jwt.sign({ id: user.userId }, config.SECRET1, {
          expiresIn: 600,
        }); // 10 min
        const response = {
          userId: user.userId,
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
          accessToken: token,
          refreshToken: refreshToken,
        };

        req.session.user = {
          userId: user.userId,
        };

        session.views = (session.views || 0) + 1;
        return res
          .status(StatusCodes.OK)
          .send({
            response,
            mesg: `You have visited this page ${session.views} times`,
          });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).send({
          mesg: "Email or Password may be wrong",
        });
      }
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({
        mesg: "Email does not exist",
      });
    }
  } catch (err) {
    console.log("Error while user login", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: "Internal server error",
    });
  }
};

let cachedData = [];
exports.findAll = async (req, res) => {
  try {
    if (cachedData.length !== 0) {
      return res.send(cachedData);
    }

    const users = await userService.findAllUser();
    cachedData = users.map((user) => user.toJSON());
    return res.status(StatusCodes.OK).send(cachedData);

    //------------------- pagination-----------------------------
    // let { page, limit, search } = req.query;
    // limit = parseInt(limit) || 10;
    // page = parseInt(page) || 1;
    // let offset = (page - 1) * limit
    // let query;
    // let count;
    // if(search) {
    //     query = await userService.findAllUser({
    //         where: {
    //             [Op.or]: [
    //                 { name: { [Op.like]: `%${search}%` }},
    //                 { email: { [Op.like]: `%${search}%`}}
    //             ],
    //         },
    //         offset: offset,
    //         limit: limit,
    //         order: [['userId','DESC']]
    //     })
    //     count = await User.count({
    //         where: {
    //             [Op.or]: [
    //                 { name: { [Op.like]: `%${search}%` }},
    //                 { email: { [Op.like]: `%${search}%`}}
    //             ],
    //         },
    //         offset: offset,
    //         limit: limit,
    //         order: [['userId','DESC']]
    //     })
    // }
    // if(!search) {
    //     query = await userService.findAllUser({
    //         limit: limit,
    //         page: page,
    //         offset: offset,
    //         order: [['userId', 'DESC']]
    //     })
    //     count = await User.count({
    //         limit: limit,
    //         page: page,
    //         offset: offset,
    //         order: [['userId', 'DESC']]
    //     })
    // }

    // return res.status(StatusCodes.OK).send({ users: query, pagination: { limit, count, page, search } });

    // return res.status(StatusCodes.OK).send(users)
  } catch (err) {
    console.log("Error while finding all users", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: "Internal server error",
    });
  }
};

exports.findById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.findUserByPk(userId);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        mesg: "User does not exist",
      });
    }
    return res.status(StatusCodes.OK).send(user);
  } catch (err) {
    console.log("Error while finding user by userId", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: "Internal server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updateUserByUserId(req.body, userId);
    return res.status(StatusCodes.OK).send(updatedUser);
  } catch (err) {
    console.log("Error while updating user by userId", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: "Internal server error",
    });
  }
};

//when  user logged out
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const { userId } = await User.findOne({ where: { email } });
  if (userId) {
    const otp = Math.floor(Math.random() * 9000) + 1000;
    const reset = await ResetToken.create({
      userId,
      otp,
    });
    // nodeMailer(email,otp)
    return res
      .status(StatusCodes.OK)
      .send({
        mesg: `Use : ${
          reset.otp
        } OTP to generate new password sent to this email:${email} using this URl :${"http://localhost:8080/user/reset-password/your-otp/your-userId"} expiresIn : 4 min`,
      });
  }
};

exports.resetPasswordUsingOtp = async (req, res) => {
  const { otp, userId } = req.params;
  const userDetail = await ResetToken.findOne({
    where: { userId, otp },
    include: [User],
  });
  if (userDetail) {
    if (moment(userDetail.expires).isBefore(moment())) {
      await ResetToken.destroy({ where: { userId } });
      return res.status(StatusCodes.BAD_REQUEST).send({
        mesg: `OTP ${userDetail.otp} has expired`,
      });
    } else {
      const { password } = req.body;
      if (!password) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          mesg: "New Password is not provided",
        });
      }
      const hashpassword = bcrypt.hashSync(password, 2);
      await userDetail.user.update({ password: hashpassword });
      await ResetToken.destroy({ where: { userId } });
      return res.status(StatusCodes.OK).send({
        mesg: "password is reseted",
      });
    }
  }
  await ResetToken.destroy({ where: {} });
  return res.status(StatusCodes.BAD_REQUEST).send({
    mesg: "Invalid OTP or User",
  });
};

// when user is logged in
exports.resetPassword = async (req, res) => {
  const user = req.user;
  const { oldPassword, newPassword } = req.body;
  if (oldPassword && newPassword) {
    const password = bcrypt.compareSync(oldPassword, user.password);
    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        mesg: "current(old) Password is Wrong",
      });
    }
    const hashpassword = bcrypt.hashSync(newPassword, 2);
    await user.update({ password: hashpassword });
    return res.status(StatusCodes.OK).send({
      mseg: "Password Updated",
    });
  } else {
    if (!oldPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        mesg: "Old Password is not Provided",
      });
    }
    if (!newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        mesg: "New Password is not Provided",
      });
    }
  }
};

exports.refreshToken = (req, res) => {
  try {
    const user = req.user;
    const accessToken = jwt.sign({ id: user.userId }, config.SECRET, {
      expiresIn: 6000,
    });
    return res.status(StatusCodes.OK).send({ accessToken: accessToken });
  } catch (err) {
    console.log("Error while creating access token", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      mesg: "Internal server error",
    });
  }
};
