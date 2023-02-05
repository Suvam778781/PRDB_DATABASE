const mongoose=require("mongoose")

const adminSchema=mongoose.Schema({
name:String,
email:String,
secKey:Number,
type:String,
pass:String,
})
const AdminModel=mongoose.model("Admin",adminSchema)
module.exports={AdminModel};

