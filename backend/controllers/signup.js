const signupdb=require("../models/user")
const encrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

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

function createToken(id){
   return jwt.sign({userId:id},"thestring")
}

exports.loginUser=async(req,res)=>{
    try{
        const email=req.body.email
        const password= req.body.password
    
        const userInfo=await signupdb.findAll({where:{email:email}})
        if(userInfo.length>0){
            encrypt.compare(password,userInfo[0].password,(err,result)=>{
                if(err){
                    throw new Error("somethig wrong while decrypton of a password")
                }
                if(result===true){
                    res.json({success:true,message:"login successfull",token:createToken(userInfo[0].id)})
                }else{
                    res.json({success:false,message:"password is incorrect"})
                }
            })
        }else{
            return res.json({success:false,message:"user not authorized"})
        }
    }catch(err){
        console.log("error in backend login",err)
        res.json({Error:err})
    }
}