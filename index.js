const mongoose=require("mongoose");
require('dotenv').config()
const express=require("express")
const app=express()
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/User.Route");
const cors=require("cors");
const { productsRouter } = require("./routes/Products.route");
const { cartsRouter } = require("./routes/Cart.Routes");
const { AdminRouter } = require("./routes/Admin.Routes");
app.use(cors({
    origin:"*"
})) 
app.use("/users",UserRouter)
app.use("/products",productsRouter)
app.use("/carts",cartsRouter)
app.use("/admin",AdminRouter)
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("running on port 8080")
    }
    catch(err){
        console.log("Err While connecting to db")
        console.log(err)
    }
})