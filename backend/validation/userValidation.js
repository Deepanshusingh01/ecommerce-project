
const Joi = require('joi')
const { isValidPassword, isValidEmail } = require('../middleware/auth.user')

const registerUser = {
    body: Joi.object().keys({
        name: Joi.string().required().messages({
            'any.required': 'Name is required.',
            'string.empty': 'Name cannot be empty.'
        }),
        email: Joi.string().required().email().messages({
            'any.required': 'Email is required.',
            'string.empty': 'Email cannot be empty.',
            'string.email': 'Invalid Email Formate.'
        }),
        password: Joi.string().required().min(8).max(20).messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password cannot be empty.',
            'string.min': 'Password must be at least 8 characters long.',
            'string.max': 'Password must be at most 20 characters long.'
        }).custom(isValidPassword),
        phoneNo: Joi.number().required().integer().positive().min(1000000000).max(9999999999).messages({
            'any.required': 'Number is required.',
            'number.base': 'Phone number must be a valid number.',
            'number.integer': 'Phone number must be an integer.',
            'number.positive': 'Phone number must be a postive value.',
            'number.min': 'Phone number must be at least of 10 digits.',
            'number.max': 'Phone number must be at most of 10 digits.'
        })
    })
}

const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email().messages({
            'any.required': 'Email is required.',
            'string.empty': 'Email connot be empty.',
            'string.email': 'Invalid Email Formate.'
        }).custom(isValidEmail),
        password: Joi.string().required().min(8).messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password cannot be empty.',
            'string.min': 'Password must be at least 8 characters long.'
        }).custom(isValidPassword)
    })
}

module.exports = {
    registerUser,
    login,
}