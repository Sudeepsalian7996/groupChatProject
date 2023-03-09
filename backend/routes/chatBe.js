const express=require("express")
const userMsg=require("../controllers/messages")
const middleware=require("../middleware/auth")

const routes=express.Router()

routes.post("/message",middleware.decryptToken,userMsg.userMessage)

routes.get("/showMessage",userMsg.showMessage)

module.exports=routes