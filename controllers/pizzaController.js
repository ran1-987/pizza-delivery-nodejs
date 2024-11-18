import Pizza from '../models/pizza.js';

// Get all pizzas
export const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get pizza by ID
export const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: 'Pizza not found' });
    res.status(200).json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
