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

const router = Router();

/*
 * We group routes that share the same path.
 *
 * - GET /api/transactions
 * - POST /api/transactions
 */
router.route("/").get(getTransactions).post(createTransaction);
/*
 * Routes for a specific ID
 *
 * - PUT /api/transactions/:id
 * - DELETE /api/transactions/:id
 */
router.route("/:id").put(updateTransaction).delete(deleteTransaction);

export default router;
