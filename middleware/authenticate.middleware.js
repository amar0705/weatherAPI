const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err,decoded)=>{
            if(decoded){
                req.body.user = decoded.userId
                next()
            }
            else{
                res.send({message:"Please Login First"})
            }
        })
    }
    else{
        res.send({message:"Please Login first"})
    }
}

module.exports = {authenticate}