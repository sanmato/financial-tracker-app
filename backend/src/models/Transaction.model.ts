// backend/src/models/Transaction.model.ts
import { Schema, model, Document, Types } from "mongoose";

// 1. TypeScript Interface
export interface ITransaction extends Document {
  title: string;
  amount: number;
  date: Date;
  type: "income" | "expense";
  category: string;
  user: Types.ObjectId;
}

// 2. Mongoose Schema
const transactionSchema = new Schema<ITransaction>(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters."],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
      default: Date.now,
    },
    type: {
      type: String,
      required: [true, "Type is required (income or expense)."],
      enum: ["income", "expense"],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
      maxlength: [50, "Category cannot be more than 50 characters."],
    },
    user: {
      type: Schema.Types.ObjectId, //Reference to User model, special Mongoose type
      ref: "User", //Tells Mongoose that this is refered to 'User' model
      required: [true, "User reference is required."],
    },
  },
  {
    // 3. Schema Options: Best Practice
    timestamps: true,
  }
);

// 4. The Model
const Transaction = model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
