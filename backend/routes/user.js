const express=require("express")
const signup=require("../controllers/signup")

const routes=express.Router()

routes.post("/signup",signup.signupUser)

module.exports=routes