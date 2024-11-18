import mongoose from 'mongoose';
import Order from '../models/order.js';
import Pizza from '../models/pizza.js';

// Place a new order
export const placeOrder = async (req, res) => {
    console.log(":::: REQ USER :::::",req.user)
  const { userId, pizzaItems, deliveryAddress } = req.body;
  console.log(req.body);
  
  try {
    let totalPrice = 0;

    // Map pizzaItems to ObjectIds to ensure they are valid MongoDB ObjectIds
    const pizzaIds = pizzaItems.map(item => {
      if (!mongoose.Types.ObjectId.isValid(item.pizzaId)) {
        throw new Error(`Invalid pizzaId: ${item.pizzaId}`);
      }
      return new mongoose.Types.ObjectId(item.pizzaId); // Use 'new' here for valid ObjectId
    });

    // Find pizzas by their valid ObjectIds
    const pizzas = await Pizza.find({ '_id': { $in: pizzaIds } });

    pizzaItems.forEach(item => {
      const pizza = pizzas.find(pizza => pizza._id.toString() === item.pizzaId);
      if (pizza) {
        totalPrice += pizza.price * item.quantity;
      } else {
        console.error(`Pizza with id ${item.pizzaId} not found`);
      }
    });

    // Create a new order (ensure userId is a valid ObjectId)
    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(userId),  
      pizzaItems,
      totalPrice,
      deliveryAddress,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get order by ID
export const getOrderById = async (req, res) => {
  console.log(req)
  try {
    const order = await Order.findById(req.params.id).populate('pizzaItems.pizzaId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders for a user
export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('pizzaItems.pizzaId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
