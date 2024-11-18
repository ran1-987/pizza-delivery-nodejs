import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export const config = {
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
};
