import mongoose from 'mongoose';

const kitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: { type: String, default: 'Food' },
  active: { type: Boolean, default: true },
  items: [{ type: String }] 
});

const Kit = mongoose.model('Kit', kitSchema);

export default Kit;
