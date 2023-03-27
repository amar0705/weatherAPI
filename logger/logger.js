const {createLogger, format, transports} = require("winston")
const {combine, timestamp, label, printf} = format
const myFormat = printf(({level, message, label, timestamp})=>{
    return `${timestamp} [${label}] ${level}:${message}`
}) 

const logger = createLogger({
    format: combine(label({label:"logger"}), timestamp(), myFormat),
    transports:[
        new transports.File({
            filename:"logger.log",
            level:"error"
        })
    ]
})

function logRequest(req,res,next){
    const IP = req.socket.remoteAddress
    const Method = req.method
    const url = req.url
    logger.log({
        level:"error",
        message:`${Method} request was made on ${url} from the IP address: ${IP}`
    })
    next()
}

module.exports = {logRequest, logger}