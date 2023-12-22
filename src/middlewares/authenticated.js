//Session Cookies yerine jwt ile kontrol
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
    const auth= req.headers?.authorization || null
    const accessToken= auth ? auth.split(' ')[1] : null // jwt tokeni aldik

    jwt.verify(accessToken, process.env.ACCESS_KEY, function(err, user){
        if(err){
            req.user =null
            console.log('JWT Login: NO');
        }else{
            req.user = user
            console.log('JWT Login: YES');
        }
    })

    next()
}
