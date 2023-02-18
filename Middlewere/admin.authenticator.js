const jwt=require("jsonwebtoken");
const Adminauthenticate=(req,res,next)=>{
    //  i will pass token of admin here and then admin will able to do the crud operation 
const admintoken=req.headers.authorization
    jwt.verify(admintoken,"admin",function(err,decoded){
    if(!err){

        req.body.userID=decoded.userID
        next()
    }
    else {
        res.status(500).send({"err":"Please Admin Login First "})
    }
})
}
module.exports={Adminauthenticate}