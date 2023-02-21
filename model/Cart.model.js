const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  description: String,
  title:String,
  price: Number,
  category: String,
  image: String,
  total_quantity: Number,
  quantity: Number,
  created_at: String,
  updated_at: String,
  ordered_at: String,
  cancelled_at:String,
  rating: Number,
  brand: String,
  userID: String,
});
const CartsModel = mongoose.model("Cart", cartSchema);
module.exports = { CartsModel };