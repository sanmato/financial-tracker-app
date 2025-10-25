import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "./models/Transaction.model";

dotenv.config();

const run = async () => {
  try {
    console.log("🔌 Intentando conectar a MongoDB:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Conectado a MongoDB");

    const newTransaction = new Transaction({
      title: "Supermercado",
      amount: 5000,
      type: "expense",
      category: "food",
    });

    console.log("💾 Guardando transacción...");
    const saved = await newTransaction.save();
    console.log("✅ Transacción guardada:", saved);

    await mongoose.disconnect();
    console.log("🔌 Desconectado de MongoDB");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

run();
