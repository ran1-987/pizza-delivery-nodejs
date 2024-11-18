import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors  from 'cors'

// Load environment variables
dotenv.config();

// Create an instance of express
const app = express();
app.use(cors());
// Body parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Import routes
import authRoutes from './routes/authRoutes.js';
import pizzaRoutes from './routes/pizzaRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
