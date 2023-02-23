const mongoose=require("mongoose");
const express=require("express")
const bcrypt=require("bcrypt");
const { UserModel } = require("../model/user.model");
const UserRouter=express.Router()
UserRouter.use(express.json())
const jwt=require("jsonwebtoken");
const { validate, validateInputs } = require("../Middlewere/User.validator");
const { CartsModel } = require("../model/Cart.model");
UserRouter.get("/singleuser", async (req, res) => {
    const token=req.headers.authorization
if(token){
const decoded=jwt.verify(token,"masai")
if(decoded){
    const userID=decoded.userID
    let users=await UserModel.findOne({_id:userID})
      res.send(users);}
      else {
        res.status(400).send([{"msg":"Please Login First"}])
      }
    }
    else {res.status(400).send([{"msg":"Please Login First"}])}
    })
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
        res.status(400).send([{msg:"Please Enter Correct Password"}])
    }
    })
    }else {
        res.status(400).send([{msg:"User Not Found Please Signup First."}])
    }
    }catch(err){
        res.status(400).send({"err":err})
    }
    })
    UserRouter.post("/resistor",validateInputs,validate,async(req,res)=>{
    const {email,firstname,lastname,pass}=req.body;
    const user =await UserModel.findOne({email})
     if(user){
        res.status(400).send([{msg: 'User Already Exits Please login'}])
     }
else {
    try{
    bcrypt.hash(pass,5,async(err,secure_password)=>{
    if(err){
        console.log(err);
    }else {
        const user=new UserModel({firstname,lastname,pass:secure_password,email})
        await user.save()
        res.send([{ msg: 'Resistered Succesfully'}])
    }
    })
    }catch(err){
        res.status(400).send([{ msg: 'Error While Resistroring The User'}])
        console.log(err)
    }
}
    })
    UserRouter.post("/checkout/:id", async (req, res) => {
      const id = req.params.id;
    // all cart item came through the body and push the item;
      const payload=req.body;
      try{
        await CartsModel.deleteMany({_userId:id})
        await UserModel.updateMany({_id:id}, { $push: { allorders: { $each: payload } } }),
            res.status(200).send([{"msg":"Order Placed Succesfully"}])
      }
      catch(err){
        res.status(500).send([{"err":"something went wrong","err":err}])
      }
    });
    UserRouter.patch("/changestatus/:userId/:orderId", async (req, res) => {
        const userId = req.params.userId;
        const orderId=req.params.orderId;
        // it will take user id and order id then it find and set perticular data to that(updated value) // 
        const payload=req.body;
        try{
          await UserModel.updateMany( { "users._id":userId, "allorders._id": orderId},{ $set: { 'allorders.$': payload } })
              res.status(200).send([{"msg":"Toggle Placed Succesfully"}])
        }
        catch(err){
          res.status(500).send([{"msg":"something went wrong","err":err}])
        }
      });
  

    module.exports={UserRouter}
    // 63c0328b1cf87dc5efcc7d5e