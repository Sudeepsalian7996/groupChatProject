const express=require("express")
const groups=require("../controllers/groups")
const auth=require("../middleware/auth")

const routes=express.Router()

routes.post("/addName",auth.decryptToken,groups.groupNames)

routes.get("/getName",auth.decryptToken,groups.getAllGroupNames)

module.exports=routes