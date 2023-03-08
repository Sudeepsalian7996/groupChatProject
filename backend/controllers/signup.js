const signupdb=require("../models/user")

exports.signupUser=async(req,res)=>{
    try{
        const userName=req.body.userName
        const phone=req.body.phone
        const email=req.body.email
        const password=req.body.password
       
        const data=await signupdb.create({
            name:userName,
            phone:phone,
            email:email,
            password:password
        })
        res.json({success:true,data:data})
    }catch(err){
        console.log("signup database error-->",err)
        res.json({success:false,Error:err})
    }
  
}