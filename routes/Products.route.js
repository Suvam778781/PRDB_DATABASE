const express = require("express");
const { Adminauthenticate } = require("../Middlewere/admin.authenticator");
const { authenticate } = require("../Middlewere/Authenticator.middlewere");
const { ProductsModel } = require("../model/Products.model");
const productsRouter = express.Router();
productsRouter.use(express.json());
productsRouter.use("/create", Adminauthenticate);
productsRouter.use("/delete/:id", Adminauthenticate);
productsRouter.use("/update/:id", Adminauthenticate);
productsRouter.get("/", async (req, res) => {
  try{
    let {power,limit,page,sortBy,rating,q}=req.query
  // const data=await HeroModel.find({language,power})
  if(q){
  var data =await ProductsModel.find({ category: { $regex:`${q}`,$options:"$i" }}).skip(page||1).limit(limit||10)
  res.send(data)
  }
  else {
    var data =await ProductsModel.find().skip(page||1).limit(limit||10)
        res.send(data)
  }}
  catch(err){
    console.log(err)
    res.send("err:something went wrong")
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
    res.send("err:something went wrong");
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
