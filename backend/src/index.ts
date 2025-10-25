// backend/src/index.ts
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// --- Main Application ---

// Helper function to validate environment variables
const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

// Get required variables
const PORT = getEnvVariable("PORT");
const DB_URI = getEnvVariable("DB_URI");

// Initialize Express app
const app: Express = express();

// --- Database Connection Function ---

const connectToDatabase = async () => {
  try {
    // 'mongoose.connect' returns a Promise
    await mongoose.connect(DB_URI);
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    // If we can't connect to the DB, it's a fatal error.
    // Exit the application.
    process.exit(1);
  }
};

// --- Server Start Function ---

const startServer = async () => {
  // 1. First, connect to the database
  await connectToDatabase();

  // 2. Then, (and only if DB connection is successful),
  // start the Express server to listen for requests.
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log("--- (Etapa 1 - 25% completada) ---");
  });
};

// --- Test Route ---
// Add a simple route to test if the server is working.
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Financial Tracker API!",
    status: "ok",
  });
});

// --- Execute ---
// Call the function that starts the entire application
startServer();
