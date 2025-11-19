// backend/src/routes/transaction.routes.ts
import { Router } from "express";

// We will create these controller functions in the next step.
// It's normal for your editor to show an error here for now.
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Protect all routes after this middleware

/*
 * We group routes that share the same path.
 *
 * - GET /api/transactions
 * - POST /api/transactions
 */
router
  .route("/")
  .get(protect, getTransactions)
  .post(protect, createTransaction);
/*
 * Routes for a specific ID
 *
 * - PUT /api/transactions/:id
 * - DELETE /api/transactions/:id
 */
router
  .route("/:id")
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

export default router;
