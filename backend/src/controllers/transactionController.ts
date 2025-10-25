import { Request, Response } from "express";
import Transaction, { ITransaction } from "../models/transaction";

// Controlador para obtener todas las transacciones
export const getTransactions = async (_: Request, res: Response) => {
  try {
    const transactions: ITransaction[] = await Transaction.find().sort({
      date: -1,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener transacciones", error });
  }
};
