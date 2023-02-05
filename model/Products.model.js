const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
  title:String,
  description: String,
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
  brand: String
})
const ProductsModel=mongoose.model("Product",productSchema)
module.exports={ProductsModel};
