import express from 'express';
import { placeOrder, getOrderById, getOrdersByUserId } from '../controllers/orderController.js';
import { authenticateJWT } from '../controllers/authController.js';

const router = express.Router();

router.post('/',authenticateJWT, placeOrder);
router.get('/:id',authenticateJWT, getOrderById);
router.get('/user/:userId',authenticateJWT, getOrdersByUserId);

export default router;
