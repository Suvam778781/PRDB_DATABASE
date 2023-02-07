const mongoose=require("mongoose");
const express=require("express")
const bcrypt=require("bcrypt");
const { UserModel } = require("../model/user.model");
const UserRouter=express.Router()
UserRouter.use(express.json())
const jwt=require("jsonwebtoken");
const { validate, validateInputs } = require("../Middlewere/User.validator");
UserRouter.get("/", async (req, res) => {
    let users=await UserModel.find()
      res.send(users);
    });
UserRouter.post("/login",async(req,res)=>{
    let {email,pass}=req.body;
    try{
    const user =await UserModel.findOne({email})
    if(user){
    bcrypt.compare(pass,user.pass,(err,result)=>{
    if(result){
        const token =jwt.sign({userID:user._id},"masai",)
        // ?{expiresIn:"24h"}
        res.status(200).send({"msg":"Login Succesfully","token":token})
    }
    else if(!result){
        res.status(400).send("Please Enter Correct Password")
    }
    })
    }else {
        res.status(400).send("User Not Found Please Signup First.")
    }
    }catch(err){
        res.status(400).send({"err":err})
    }
    })
    UserRouter.post("/resistor",validateInputs,validate,async(req,res)=>{
    const {email,firstname,lastname,pass}=req.body;
    const user =await UserModel.findOne({email})
     if(user){
        res.status(400).send("User Already Exits Please login.")
     }
else {
    try{
    bcrypt.hash(pass,5,async(err,secure_password)=>{
    if(err){
        console.log(err);
    }else {
        const user=new UserModel({firstname,lastname,pass:secure_password,email})
        await user.save()
        res.send("Resistered Succesfully")
    }
    })
    }catch(err){
        res.status(400).send("Error While Resistroring The User")
        console.log(err)
    }
}

    })
    module.exports={UserRouter}
    // 63c0328b1cf87dc5efcc7d5e