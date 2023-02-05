const jwt=require("jsonwebtoken");
const authenticate=(req,res,next)=>{
const token=req.headers.authorization
if(token){
const decoded=jwt.verify(token,"masai")
console.log(req.body)
if(decoded){
    const userID=decoded.userID
    req.body.userID=userID;
    if(req.body.name){
        next()
    }
    next()
}
else {
    res.send("please login first")
}
}
else {
    res.send("please login first")
}
}
module.exports={authenticate}