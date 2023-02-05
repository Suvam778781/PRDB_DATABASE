const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  description: String,
  title:String,
  price: Number,
  category: String,
  image: String,
  total_quantity: Number,
  quantity: Number,
  created_at: Date,
  updated_at: Date,
  ordered_at: Date,
  cancelled_at: Date,
  rating: Number,
  brand: String,
  userID: String,
});
const CartsModel = mongoose.model("Cart", cartSchema);
module.exports = { CartsModel };