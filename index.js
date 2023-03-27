const express = require("express")
const {connection} = require("./configs/db")
const {userRouter} = require("./routes/user.route")
const {logRequest} = require("./logger/logger")
const {weatherRouter} = require("./routes/weather.route")
const {authenticate} = require("./middleware/authenticate.middleware")

const app = express()
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Homepage")
})

app.use(logRequest)
app.use("/users", userRouter)
app.use(authenticate)
app.use("/weather", weatherRouter)

app.listen(7000, async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }
    catch(err){
        console.log(err)
    }
    console.log("Listening to port 7000")
})