const jwt=require("jsonwebtoken");
const Adminauthenticate=(req,res,next)=>{
    //  i will pass token of admin here and then admin will able to do the crud operation 
const admintoken=req.headers.authorization
if(admintoken){
const decoded=jwt.verify(admintoken,"admin")
if(decoded){
    next()
}
else {
    res.send("please admin login first")
}
}
else {
    res.send("please admin login first")
}
}
module.exports={Adminauthenticate}