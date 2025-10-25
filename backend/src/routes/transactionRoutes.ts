import { Router } from "express";
import transaction from "../models/Transaction.model";

const router = Router();

// Obtener todas las transacciones
router.get("/", async (_, res) => {
  const transactions = await transaction.find().sort({ date: -1 });
  res.json(transactions);
});

// Crear una nueva transacción
router.post("/", async (req, res) => {
  try {
    const newTransaction = new transaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la transacción", error });
  }
});
