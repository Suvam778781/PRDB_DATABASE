const express = require("express");
const { authenticate } = require("../Middlewere/Authenticator.middlewere");
const { CartsModel } = require("../model/Cart.model");
const { ProductsModel } = require("../model/Products.model");
const cartsRouter = express.Router();
cartsRouter.use(express.json());
cartsRouter.use("/", authenticate);
cartsRouter.get("/", async (req, res) => {
  // i will pass it from local storage and then it will convert to id then i will get allcartdata  of that perticular person only
  const userID = req.body.userID;
 try{
      let carts = await CartsModel.find({ userID: userID });
      res.send(carts);
}catch(err){
  res.send({"err":err})
}
});
cartsRouter.post("/addtocart", async (req, res) => {
  const payload = req.body;
  // const userID = req.body._id;
  // req.body.userID = userID;
  console.log(payload)
  try {
    const new_cart = CartsModel(payload);
    await new_cart.save();
    res.send("Products added to cart succesfully");
  } catch (err) {
    res.send("something went wrong while adding data to cart");
  }
});
cartsRouter.patch("/update/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    await CartsModel.findByIdAndUpdate({ _id: id }, data);
    res.end("Cart Update Succesfully");
  } catch (err) {
    res.send("err:something went wrong");
  }
});
cartsRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await CartsModel.deleteOne({ _id: id });
    res.end("Products Delete Succesfully");
  } catch (err) {
    res.send("err:something went wrong");
  }
});
module.exports = { cartsRouter };
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2RlMDVmMTI2YjdmNzUyNGQ5MjE0MDUiLCJpYXQiOjE2NzU0OTQ5MjYsImV4cCI6MTY3NTY2NzcyNn0.7kUoCYr2TUI01iYzFAJ0Geb1GHsxOc_JZoFmvsbwZ34