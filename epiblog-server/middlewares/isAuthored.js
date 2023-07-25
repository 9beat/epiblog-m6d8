const isAuthored= (req, res, next) => {
    
    const role = req.body

    if(role !== 'admin') {
        return res.status(400).send({
            message: "User is not authorized"
        })
    }
    next()
}

export default isAuthored