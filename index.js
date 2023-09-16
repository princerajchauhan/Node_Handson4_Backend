const express = require("express")
const cors = require("cors")
const route = require("./Routing/userRoute")
const dotenv = require("dotenv")

dotenv.config()

const port = process.env.PORT

const server = express()
server.use(cors())

server.use(express.json())

server.use("/", route)

server.listen(port, () =>{
    try{
        console.log(`Server is running on port: ${port}`)
    } catch(err){
        console.Console.log(`On running server we get ${err}`)
    }
})