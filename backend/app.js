const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
const sequelize=require("./util/database")

const user=require("./models/user")
const message=require("./models/message")
const groupdb=require("./models/groups")
const usergroupdb=require("./models/usergroup")

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

// groupdb.hasMany(message)
// message.belongsTo(groupdb)

groupdb.belongsToMany(user,{through:usergroupdb})
user.belongsToMany(groupdb,{through:usergroupdb})


sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch((err)=>console.log("sync err-->",err))