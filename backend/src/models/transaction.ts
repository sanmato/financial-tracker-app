import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  title: string;
  amount: number;
  date: Date;
  type: "income" | "expense"; //Esto sería el ingreso o gasto
  category: string;
}

const TransactionSchema: Schema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true }, //El monto de la transacción
  date: { type: Date, required: true, default: Date.now }, //La fecha de la transacción
  type: { type: String, enum: ["income", "expense"], required: true }, //El tipo de transacción
  category: { type: String, required: true }, //La categoría de la transacción
});

export default mongoose.model<ITransaction>(
  "Transaction", // Nombre de la colección -> MongoDB lo pluraliza: "transactions"
  TransactionSchema
);
