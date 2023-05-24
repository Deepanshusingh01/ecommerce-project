const { body } = require('express-validator')

const { isValidEmail, isValidPassword } = require('../middleware/auth.user')

const registerUser = [
    body('name')
    .not()
    .notEmpty()
    .withMessage('Name is required'),
    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is not valid')
    .custom(isValidEmail),
    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min:6})
    .withMessage('Password should be at least 6 characters long')
    .custom(isValidPassword),
    body('phoneNo')
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 10, max: 10})
    .withMessage('Phone number should be of 10 digit')
]


const login = [
    body('email')
    .notEmpty()
    .withMessage('Email is required'),
    body('password')
    .notEmpty()
    .withMessage('Password is required')
]


// -----------------------------------------------Old-------------------------------------------------------
// const Joi = require('joi')
// const registerUser = {
//     // body: Joi.object().keys({
//     //     name: Joi.string().required().messages({
//     //         'any.required': 'Name is required.',
//     //         'string.empty': 'Name cannot be empty.'
//     //     }),
//     //     email: Joi.string().required().email().messages({
//     //         'any.required': 'Email is required.',
//     //         'string.empty': 'Email cannot be empty.',
//     //         'string.email': 'Invalid Email Formate.'
//     //     }),
//     //     password: Joi.string().required().min(8).max(20).messages({
//     //         'any.required': 'Password is required.',
//     //         'string.empty': 'Password cannot be empty.',
//     //         'string.min': 'Password must be at least 8 characters long.',
//     //         'string.max': 'Password must be at most 20 characters long.'
//     //     }).custom(isValidPassword),
//     //     phoneNo: Joi.number().required().integer().positive().min(1000000000).max(9999999999).messages({
//     //         'any.required': 'Number is required.',
//     //         'number.base': 'Phone number must be a valid number.',
//     //         'number.integer': 'Phone number must be an integer.',
//     //         'number.positive': 'Phone number must be a postive value.',
//     //         'number.min': 'Phone number must be at least of 10 digits.',
//     //         'number.max': 'Phone number must be at most of 10 digits.'
//     //     })
//     // })
// }

// const login = {
//     // body: Joi.object().keys({
//     //     email: Joi.string().required().email().messages({
//     //         'any.required': 'Email is required.',
//     //         'string.empty': 'Email connot be empty.',
//     //         'string.email': 'Invalid Email Formate.'
//     //     }).custom(isValidEmail),
//     //     password: Joi.string().required().min(8).messages({
//     //         'any.required': 'Password is required.',
//     //         'string.empty': 'Password cannot be empty.',
//     //         'string.min': 'Password must be at least 8 characters long.'
//     //     }).custom(isValidPassword)
//     // })
// }

module.exports = {
    registerUser,
    login,
}