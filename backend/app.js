const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
const sequelize=require("./util/database")

const user=require("./models/user")
const message=require("./models/message")

const signup=require("./routes/user")
const chat =require("./routes/chatBe")

const app=express()

app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json())

app.use("/user",signup)

app.use("/chat",chat)

//associations
user.hasMany(message)
message.belongsTo(user)

sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch((err)=>console.log("sync err-->",err))