import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'items.itemType'
  },
  itemType: {
    type: String,
    required: true,
    enum: ['Kit', 'GroceryItem']
  },
  itemName: String,
  quantity: Number,
  price: Number
}, { _id: false });

export default itemSchema;