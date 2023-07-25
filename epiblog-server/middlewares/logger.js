const logger = (req, res, next) =>{
    const {url, ip, method} = req
    
    console.log(`${new Date().toISOString()} Sended request ${method} to the endpoint ${url} from IP ${ip}` )

    next()
}

export default logger
