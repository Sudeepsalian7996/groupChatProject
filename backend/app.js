const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
const sequelize=require("./util/database")

const signup=require("./routes/user")

const app=express()

app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json())

app.use("/user",signup)

sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch((err)=>console.log("sync err-->",err))