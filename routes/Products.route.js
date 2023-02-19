const express = require("express");
const { Adminauthenticate } = require("../Middlewere/admin.authenticator");
const { reviewauthenticate } = require("../Middlewere/Productreview.authenticator");
const { ProductsModel } = require("../model/Products.model");
const productsRouter = express.Router();
productsRouter.use(express.json());
productsRouter.use("/create", Adminauthenticate);
productsRouter.use("/delete/:id", Adminauthenticate);
productsRouter.use("/update/:id", Adminauthenticate);
productsRouter.use("/addreview/:id",reviewauthenticate);
productsRouter.get("/", async (req, res) => {
let {brand,category,price,limit,page,q}=req.query
if(category&&brand){
  brand=brand.split(",")
category=category.split(",")
  try{
    var data =await ProductsModel.find({brand:{$in:brand},category:{$in:category}})
    res.send(data)
    }
    catch(err){
      console.log(err)
      res.status(500).send("err:something went wrong")
    }
}
  else if(brand){
    brand=brand.split(",")
    try{
      var data =await ProductsModel.find({brand:{$in:brand}})
      res.send(data)
      }
      catch(err){
        console.log(err)
        res.send("err:something went wrong")
      }
  }
  else if(category){
    category=category.split(",")
    try{
      var data =await ProductsModel.find({category:{$in:category}})
      res.send(data)
      }
      catch(err){
        console.log(err)
        res.status(500).send("err:something went wrong")
      }
  }
  else {
    try{
    if(q){
    var data =await ProductsModel.find({ category: { $regex:`${q}`,$options:"$i" }})
    res.send(data)
    }
    else {
      var data =await ProductsModel.find()
          res.status(200).send(data)
    }}
    catch(err){
      console.log(err)
      res.status(500).send("err:something went wrong")
    }
  }
});
productsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try{
    var data =await ProductsModel.findOne({_id:id})
        res.send(data)
  }
  catch(err){
    res.send({"err":"something went wrong","err":err})
  }
});
productsRouter.post("/addreview/:id", async (req, res) => {
  const id = req.params.id;
  const payload=req.body;
  
  try{
    await ProductsModel.updateOne({_id:id},{$push :{review:payload}})
        res.status(200).send([{"msg":"Review Added Succesfully"}])
  }
  catch(err){
    res.status(500).send([{"err":"something went wrong","err":err}])
  }
});
productsRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = ProductsModel(payload);
    await new_note.save();
    res.send("Create Succesfully");
  } catch (err) {
    res.send("something went wrong");
  }
});
productsRouter.patch("/update/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    await ProductsModel.findByIdAndUpdate({ _id: id }, data);
    res.end("Product Update Succesfully");
  } catch (err) {
    res.status(400).send("err:something went wrong");
  }
});
productsRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await ProductsModel.deleteOne({ _id: id });
    res.end("Product Delete Succesfully");
  } catch (err) {
    res.send("err:something went wrong");
  }
});
productsRouter.get("/up",async(req,res)=>{
  const data=await ProductsModel.find()
res.send (data)

})
module.exports = {productsRouter };

