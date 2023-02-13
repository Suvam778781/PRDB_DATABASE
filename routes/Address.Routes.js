const express = require("express");
const jwt=require("jsonwebtoken");
const { authenticate } = require("../Middlewere/Authenticator.middlewere");
const AddressModel = require("../model/Address.model");
const AddressRouter = express.Router();
AddressRouter.use(express.json());
// AddressRouter.use("/", authenticate);
AddressRouter.get("/", async (req, res) => {
  // i will pass it from local storage and then it will convert to id then i will get allcartdata  of that perticular person only
  const userID = req.body.userID;

 try{
      let carts = await AddressModel.find({ userID: userID });
      res.send(carts);
}catch(err){
  res.send({"err":err})
}
});
AddressRouter.patch("/update/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    await AddressModel.findByIdAndUpdate({ _id: id }, data);
    res.end("Address Update Succesfully");
  } catch (err) {
    res.send("err:something went wrong");
  }
});
AddressRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await AddressModel.deleteOne({ _id: id });
    res.end("Address Delete Succesfully");
  } catch (err) {
    res.send("err:something went wrong");
  }
});
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2RlMDVmMTI2YjdmNzUyNGQ5MjE0MDUiLCJpYXQiOjE2NzU0OTQ5MjYsImV4cCI6MTY3NTY2NzcyNn0.7kUoCYr2TUI01iYzFAJ0Geb1GHsxOc_JZoFmvsbwZ34
module.exports = { AddressRouter };
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2RlMDVmMTI2YjdmNzUyNGQ5MjE0MDUiLCJpYXQiOjE2NzU0OTQ5MjYsImV4cCI6MTY3NTY2NzcyNn0.7kUoCYr2TUI01iYzFAJ0Geb1GHsxOc_JZoFmvsbwZ34

AddressRouter.post("/addaddress", async (req, res) => {

  const token=req.headers.authorization
if(token){
const decoded=jwt.verify(token,"masai")
if(decoded){

  const payload = req.body;
  try {
    const address = AddressModel(payload);
    await address.save();
    res.status(200).send([{"msg":"Address added succesfully"}]);
  } catch (err) {
    res.status(500).send([{"msg":err}]);
  }
}
else {
  res.status(500).send([{"msg":"something went wrong"}]);
}
}else {
  res.status(500).send([{"msg":"something went wrong"}]);
}
});

module.exports = { AddressRouter };
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2RlMDVmMTI2YjdmNzUyNGQ5MjE0MDUiLCJpYXQiOjE2NzU0OTQ5MjYsImV4cCI6MTY3NTY2NzcyNn0.7kUoCYr2TUI01iYzFAJ0Geb1GHsxOc_JZoFmvsbwZ34