const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
  title:String,
  description: String,
  price: Number,
  category: String,
  allimages:Array,
  review:Array,
  image: String,
  total_quantity: Number,
  quantity: Number,
  created_at: String,
  updated_at: String,
  ordered_at: String,
  cancelled_at: String,
  rating: Number,
  brand: String
})
const ProductsModel=mongoose.model("Product",productSchema)
module.exports={ProductsModel};
