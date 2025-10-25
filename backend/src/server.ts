import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";
import { connectDB } from "./config/db";

dotenv.config();

export const startServer = async () => {
  const app: Application = express();

  // // Middlewares
  app.use(cors());
  app.use(express.json());

  // // Rutas
  app.use("/api", routes);

  // // Conexión a MongoDB
  connectDB();

  // Levantar servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};
