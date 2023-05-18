const db = require('../models');

function isValidEmail(value,helper) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    value = String(value).search (filter) != -1
    if(!value) {
        return helper.message('Invalid Email Formate')
    }
    return value
}

function isValidPassword(value,helper)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    value = re.test(value);
    if(!value) {
        return helper.message('Password should be have at least a symbol, upper and lower case letters and a number')
    }
    return value
}


module.exports = {
    isValidPassword,
    isValidEmail,
}