const jwt=require("jsonwebtoken")
const userdb=require("../models/user")

exports.decryptToken=async(req,res,next)=>{
    try{
        const token=req.header("Authorization")
        const user=jwt.verify(token,"thestring")
        const curUser=await userdb.findByPk(user.userId) 
        req.user=curUser
        next()
    }catch(err){
        console.log("error in authorization",err)
        res.json({Error:err})
    }
}
