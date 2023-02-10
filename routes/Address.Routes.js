const express = require("express");
const { authenticate } = require("../Middlewere/Authenticator.middlewere");
const AddressModel = require("../model/Address.model");
const AddressRouter = express.Router();
AddressRouter.use(express.json());
// AddressRouter.use("/", authenticate);
AddressRouter.post("/addaddress", async (req, res) => {
  const payload = req.body;
  try {
    const address = AddressModel(payload);
    await address.save();
    res.status(200).send([{"msg":"Address added succesfully"}]);
  } catch (err) {
    res.status(400).send([{"msg":err}]);
  }
});

module.exports = { AddressRouter };
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2RlMDVmMTI2YjdmNzUyNGQ5MjE0MDUiLCJpYXQiOjE2NzU0OTQ5MjYsImV4cCI6MTY3NTY2NzcyNn0.7kUoCYr2TUI01iYzFAJ0Geb1GHsxOc_JZoFmvsbwZ34