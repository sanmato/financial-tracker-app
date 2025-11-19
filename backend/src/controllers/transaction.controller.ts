// backend/src/controllers/transaction.controller.ts
import { Request, Response } from "express";
import Transaction from "../models/Transaction.model"; // Import the model
import { AuthenticatedRequest } from "../middleware/auth.middleware";

// @desc    Get all transactions
// @route   GET /api/transactions
export const getTransactions = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // This is the logic: find all transactions, sort by newest first
    const transactions = await Transaction.find({ user: req.user?._id }).sort({
      date: -1,
    });

    // Send the response
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Create a new transaction (FOR AUTHENTICATED USERS)
// @route   POST /api/transactions
export const createTransaction = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Get the data from the request body (the form)
    const { title, amount, date, type, category } = req.body;

    // Create the new transaction in the database
    const newTransaction = await Transaction.create({
      title,
      amount,
      date,
      type,
      category,
      user: req.user?._id, // Associate transaction with the authenticated user
    });

    // Send the successful response (201 Created)
    res.status(201).json({
      success: true,
      data: newTransaction,
    });
  } catch (error: any) {
    // Handle validation errors (e.g., missing 'title' or 'amount')
    if (error.name === "ValidationError") {
      // Get the error messages we defined in the model
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      );
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }

    // Handle general server errors
    console.error(error); // Log the error for the developer
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id

export const updateTransaction = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    //Verify transaction exists
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    //Compare user ownership of transaction with logged in user
    if (transaction.user.toString() !== req.user?.id) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Not authorized to update this transaction",
        });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body, // Pass the request body directly
      {
        new: true, // Return the updated document
        runValidators: true, // Re-run schema validators on update
      }
    );
    res.status(200).json({ success: true, data: updatedTransaction });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      );
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Delete a transaction
// @route DELETE /api/transactions/:id
export const deleteTransaction = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    //Verify transaction exists
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    //Compare user ownership of transaction with logged in user
    if (transaction.user.toString() !== req.user?.id) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Not authorized to delete this transaction",
        });
    }
    await transaction.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
