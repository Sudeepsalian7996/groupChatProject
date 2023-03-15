const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
const sequelize=require("./util/database")
const cron=require("node-cron")

const user=require("./models/user")
const message=require("./models/message")
const groupdb=require("./models/groups")
const usergroupdb=require("./models/usergroup")
const archeivedb=require('./models/archeivechat')

const signup=require("./routes/user")
const chat =require("./routes/chatBe")
const groups=require("./routes/groups")

const app=express()

app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json())

app.use("/user",signup)

app.use("/chat",chat)

app.use("/group",groups)

//associations
user.hasMany(message)
message.belongsTo(user)


groupdb.belongsToMany(user,{through:usergroupdb})
user.belongsToMany(groupdb,{through:usergroupdb})


sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch((err)=>console.log("sync err-->",err))


cron.schedule("0 9 * * *",async()=>{
   const response=await message.findAll()
   for(let i=0;i<response.length;i++){
    const data=await archeivedb.create({
        message:response[i].dataValues.message,
        userId:response[i].dataValues.userId,
        groupId:response[i].dataValues.groupId,
        userName:response[i].dataValues.userName
    })
   await message.destroy({where:{id:response[i].dataValues.id}})
   }
   
},{
    timezone:'Asia/Kolkata'
})

