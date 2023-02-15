const jwt=require("jsonwebtoken");
const reviewauthenticate=(req,res,next)=>{
const token=req.headers.authorization
if(token){
const decoded=jwt.verify(token,"masai")

if(decoded){
    const userID=decoded.userID
    req.body.userID=userID;
    next()
}
else {
    res.send("please login first")
}
}
}
module.exports={reviewauthenticate}