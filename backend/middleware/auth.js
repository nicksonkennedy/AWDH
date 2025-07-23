const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        const token = req.cookies.token
        if(!token) return res.status(401).json({error: "Unauthorized"})

            const verified = jwt.verify(token, process.env.jwt_secret)
            req.user = verified.user
            console.log(verified)
            next()
    } catch (error) {
        console.error(error)
        res.status(401).json({error: "Unauthorized"})
    }
}

module.exports = auth