const validateUser = (req, res, next) => {
    const errors = []
    const {username, email, password} = req.body

    if (typeof username !== "string"){
        errors.push("Please provide a valid string")
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Please provide a valid email")
    }

    if (typeof password !== "string" || password.length < 8){
        errors.push("Please provide a valid password, at least 8 characters")
    }

    if (errors.length > 0){
        res.status(400).send({errors})
    } else {
        next()
    }
}

export default validateUser