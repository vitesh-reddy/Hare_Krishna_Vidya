import mongoose from "mongoose";

const groceryItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, },
  price: { type: Number, required: true, min: 0, },
  image: { type: String, required: true, },
  description: { type: String, trim: true, },
  serves: { type: String, trim: true, },
  active: { type: Boolean, default: true, },
  lastUpdated: {  type: Date,  default: Date.now, },
});

const GroceryItem = mongoose.model("GroceryItem", groceryItemSchema);

export default GroceryItem;
