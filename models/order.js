import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pizzaItems: [{
    pizzaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: { type: String, enum: ['pending', 'delivered'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
