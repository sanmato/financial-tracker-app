// frontend/src/components/TransactionList.tsx
import React from "react";

// (We'll move this to a shared file later)
interface ITransaction {
  _id: string;
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category: string;
}

// Define the props shape
interface TransactionListProps {
  transactions: ITransaction[];
  onDeleteTransaction: (id: string) => Promise<void>;
}

// THE MODERN WAY:
// Type the 'props' argument directly instead of using React.FC
const TransactionList = ({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) => {
  // Contenedor principal de la lista
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-8">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        History
      </h3>

      {/* Mensaje de "No transactions" estilizado */}
      {transactions.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No transactions yet.</p>
      )}

      {/* Lista de transacciones */}
      <ul className="space-y-4">
        {transactions.map((transaction) => (
          // Cada item de la lista (flexbox)
          <li
            key={transaction._id}
            className="flex items-center justify-between p-4 border rounded-md dark:border-gray-700"
          >
            {/* Contenedor para la información (izquierda) */}
            <div>
              <strong className="font-semibold text-gray-800 dark:text-white">
                {transaction.title}
              </strong>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {" "}
                ({transaction.category})
              </span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
            </div>

            {/* Contenedor para el monto y botón (derecha) */}
            <div className="flex items-center space-x-4">
              <span
                className={`font-bold ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {Math.abs(transaction.amount)}
              </span>

              <button
                onClick={() => onDeleteTransaction(transaction._id)}
                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
