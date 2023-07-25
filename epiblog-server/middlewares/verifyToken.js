

const verifyToken = (req, res, next) => {

    const token = req.header("auth")
    if(!token){
        return res.status(401).send({
            errorType: "Token error",
            statusCode: 401,
            message: "Please provide a valid access token"
        })
    }

    try {
        const verify = jwt.verify(token, process.env.SECRET_JWT_KEY)
        req.user = verify
        next()
    } catch (err) {
        res.status(403).send({
            errorType: "Token error",
            statusCode: 403,
            message: `Invalid token or expired ${err.message}`
        })
    }
}


export default verifyToken