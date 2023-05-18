const auth = require('./auth.jwt');
const verifyUser = require('./auth.user')
const verifySession = require('./verifySession')
const routeNotFound = require('./notFoundError')
const {validate} = require('./validate')
module.exports = {
    auth,
    verifyUser,
    verifySession,
    routeNotFound,
    validate,
    // validateParam
}