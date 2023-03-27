const redis = require("redis")

const client = redis.createClient({
    legacyMode:true
})

client
    .connect()
    .then(async(res)=>{
        const value = await client.lRange("data", 0, -1)
        client.quit()
    })
    .catch((err)=>{
        console.log("Error occured", err)
    })

module.exports = client