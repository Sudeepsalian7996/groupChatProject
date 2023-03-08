const signupdb=require("../models/user")
const encrypt=require("bcrypt")

exports.signupUser=async(req,res)=>{
    try{
        const userName=req.body.userName
        const phone=req.body.phone
        const email=req.body.email
        const password=req.body.password
       
        if(email==="" || password==="" || userName==="" || phone===""){
            return res.json({success:false,message:"Fill all the fields"})
         }
         if(password.length<8){
           return res.json({success:false,message:"password must contains atleast 8 characters"})
         }

        const userInfo=await signupdb.findAll({where:{email:email}})

        if(userInfo.length!==0){
            return res.json({success:false,message:"User already exist"})
        }
        encrypt.hash(password,10,async(err,hash)=>{
            if(err){
                console.log(err)
                return res.json({success:false})
            }
            const data=await signupdb.create({
                name:userName,
                phone:phone,
                email:email,
                password:hash
            })
            res.json({success:true,data:data,message:"signup successfull"})
        })
      
    }catch(err){
        console.log("signup  error-->",err)
        res.json({success:false,Error:err})
    }
}

exports.loginUser=async(req,res)=>{
    console.log(req.body.password)
}