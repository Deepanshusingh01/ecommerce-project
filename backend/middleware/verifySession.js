
const verifySession = (req,res,next) =>{

    if(!req.session || !req.session?.user?.userId){
        return res.status(400).send({ mesg: 'session does not exist' })
    }
    req.user = req.session.user;
    next()
}
module.exports = verifySession