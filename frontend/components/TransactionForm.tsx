// frontend/src/components/TransactionForm.tsx
import { useState } from "react";

//Import the INewTransaction type from App.tsx
import type { INewTransaction } from "../src/App";

//Define the type for the component props received
interface TransactionFormProps {
  onAddTransaction: (newTransaction: INewTransaction) => Promise<void>;
}

//Receive the 'onAddTransaction' function as a prop
const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    type: "expense" as "income" | "expense",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Stop the browser from refreshing the page

    const transactionData: INewTransaction = {
      ...formData,
      amount: parseFloat(formData.amount), //Convert amount to number
    };
    await onAddTransaction(transactionData);

    //Reset the form after submission
    setFormData({
      title: "",
      amount: "",
      date: "",
      type: "income",
      category: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Transaction</h3>

      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Add Transaction</button>
    </form>
  );
};
export default TransactionForm;
