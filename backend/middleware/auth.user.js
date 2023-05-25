
function isValidEmail(value) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    value = String(value).search (filter) != -1
    if(!value) {
        throw new Error('Invalid Email Formate')
    }
    return value
}

function isValidPassword(value)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    value = re.test(value);
    if(!value) {
        throw new Error('Password should be have at least a symbol, upper and lower case letters and a number');
    }
    return value
}


module.exports = {
    isValidPassword,
    isValidEmail,
}