import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password, address } = req.body;
  

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ username, email, password, address });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered', token ,user:newUser.username,address:newUser.address,userId:newUser.user._id});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token,user:user.username,address:user.address,userId:user._id});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Bearer header
  
    if (!token) {
      return res.status(403).json({ message: 'Access Denied. No token provided.' });
    }
  
    // Verify the token using JWT secret
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      
      req.user = user; // Attach user info to the request object

      next(); // Proceed to the next middleware or route handler
    });
  };