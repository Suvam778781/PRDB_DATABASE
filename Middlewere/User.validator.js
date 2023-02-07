const userValidator=(req,res,next)=>{
    if(req.url=="/users/resistor"){
     if(req.body.firstname && req.body.lastname && req.body.email && req.body.pass){
        if(typeof req.body.firstname==="string" &&
        typeof req.body.pass==="string" &&
        typeof req.body.firstname=="string" &&
        typeof req.body.email=="string"
        )
        {
            next()
        }
        else{
            res.status(400).send("Enter All Details")
        }
     }
     else{
        res.status(400).send("Enter All Details")
     }
    }
    else{
        next()
    }
}

module.exports={userValidator}