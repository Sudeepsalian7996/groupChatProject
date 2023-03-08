const Sequelize=require("sequelize")
const sequelize=require("../util/database")

const signupdb=sequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING,
    phone:Sequelize.BIGINT,
    email:Sequelize.STRING,
    password:Sequelize.STRING

})
module.exports=signupdb