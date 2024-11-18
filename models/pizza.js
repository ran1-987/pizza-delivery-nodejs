import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  sizes: { type: [String], enum: ['small', 'medium', 'large'], required: true }
});

export default mongoose.model('Pizza', pizzaSchema);
