const productValidator=(req,res,next)=>{
    if(req.url=="/products/post"){
     if(req.body.title && req.body.price && req.body.quantity && req.body.brand && req.body.category && req.body.rating && req.body.image&&req.body.description){
        if(typeof req.body.title==="string" &&
        typeof req.body.price==="number" &&
        typeof req.body.quantity==="number" &&
        typeof req.body.brand==="string" &&
        typeof req.body.description=="string" &&
        typeof req.body.category=="string" &&
        typeof req.body.image=="string" &&
        typeof req.body.rating=="number"
        )
        {
            next()
        }
        else{
            res.status(404).send({"message":"Wrong data type"})
        }
     }
     else{
        res.status(404).send({"message":"Data doesn't exist"})
     }
    }
    else{
        next()
    }
}

module.exports={productValidator}