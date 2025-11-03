// backend/src/index.ts
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import our new routes
import transactionRoutes from "./routes/transaction.routes";

// Load environment variables
dotenv.config();

// --- Main Application ---

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const PORT = getEnvVariable("PORT");
const DB_URI = getEnvVariable("DB_URI");

const app: Express = express();

// --- Middleware ---
// Add the express.json() middleware
// This is crucial. It tells Express to automatically parse
// incoming JSON request bodies (like the data from our form).
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// --- Routes ---

// Test route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Financial Tracker API!",
    status: "ok",
  });
});

// Use the transaction routes
// Tell the app to use our router for any request
// that starts with '/api/transactions'
app.use("/api/transactions", transactionRoutes);

// --- Database Connection Function ---

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// --- Server Start Function ---

const startServer = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    // Updated progress!
    console.log("--- (Etapa 2 - 35% completada: CRUD Básico) ---");
  });
};

// --- Execute ---
startServer();
