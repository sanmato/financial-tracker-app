// frontend/src/App.tsx
import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

// (We'll move this to 'src/types.ts' later)
interface ITransaction {
  _id: string;
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category: string;
}

export interface INewTransaction {
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category: string;
}

const API_URL = "http://localhost:3000/api/transactions";

function App() {
  // We'll use this state later to hold our transactions
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    // Fetch transactions from the backend API
    const fetchTransactions = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTransactions(data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = async (newTransaction: INewTransaction) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        //TODO: Handle error properly in the UI
        const errorData = await response.json();
        console.error("Error adding transaction:", errorData.message);
      }
      const createdTransaction = await response.json();

      //Add the new transaction to state in order to update the UI
      // data.data cuz our API response is { success: true, data: {...} }
      setTransactions((prevTransactions) => [
        createdTransaction.data,
        ...prevTransactions,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        // TODO: Handle error properly in the UI
        console.error("Error deleting transaction");
        throw new Error("Error deleting transaction");
      }

      //IF API call was successful, update the state to remove the transaction
      setTransactions((prevTransactions) => {
        return prevTransactions.filter((transaction) => transaction._id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-center text-gray-950 dark:text-white text-balance">
            Financial Tracker
          </h1>
        </header>

        <main>
          {/*Pass the function like a 'prop' to form*/}
          <TransactionForm onAddTransaction={handleAddTransaction} />

          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
