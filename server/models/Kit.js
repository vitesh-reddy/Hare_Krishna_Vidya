import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }
});

const kitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: { type: String, default: 'Food' },
  active: { type: Boolean, default: true },
  items: [itemSchema]
});

const Kit = mongoose.model('Kit', kitSchema);

export default Kit;
