const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {UserModel} = require("../models/user.model")
// const client = require("../redis")
require("dotenv").config()

const userRouter = express.Router()

userRouter.post("/register", async(req,res)=>{
    const {username, city, password} = req.body
    try{
        bcrypt.hash(password, 5,async(err, hash)=>{
            if(err){
                res.send({message:"Something went wrong", error:err.message})
            }
            else{
                const user = new UserModel({username, city, password: hash})
                await user.save()
                res.send({message:"User registered"})
            }
        }) 
    }
    catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {username, password} = req.body
    try{
        const user = await UserModel.find({username})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err,result)=>{
                if(result){
                    let token = jwt.sign({userId: user[0]._id}, process.env.SECRET_KEY)
                    res.send({message:"Log in successful", token:token})
                }
                else{
                    res.send({message:"Something went wrong"})
                }
            })
        }
        else{
            res.send({message:"Wrong Credentials"})
        }
    }
    catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

// userRouter.get("/logout", (req,res)=>{
//     const token = req.headers.authorization
//     client.get(token, async(err,cachedData)=>{
//         if(err){
//             console.log(err)
//             return res.status(500).send("Internal error occured")
//         }
//         if(cachedData){
//             console.log("Request Recieved")
//             return res.json(JSON.parse(cachedData))
//         }
//         client.set(token, JSON.stringify(data), (err)=>{
//             if(err){
//                 console.log(err)
//                 return res.json(500).send("Internal error occured")
//             }
//             return res.send({message:"Logout successful"})
//         })
//     })
//     // let blacklisted = JSON.parse(fs.readFileSync("../blacklisten.json", "utf-8"))
//     // blacklisted.push(token)
//     // fs.writeFileSync("../blacklisted.json", JSON.stringify(blacklisted)
// })

module.exports = {userRouter}