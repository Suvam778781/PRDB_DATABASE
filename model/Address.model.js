const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
  pincode: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
    match: /^[0-9]+$/
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    match: /^[0-9]+$/
  },
  alternateMobile: {
    type: String,
    minlength: 10,
    maxlength: 10,
    match: /^[0-9]+$/
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  landmark: {
    type: String,
    minlength: 2,
    maxlength: 100
  },
  area: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  flatNo: {
    type: String,
    minlength: 1,
    maxlength: 10
  },
  isPrimary: {
    type: Boolean,
    required: true
  },
  userID:{
   type:String
  }
});
const AddressModel = mongoose.model('Address', addressSchema);
module.exports = AddressModel;