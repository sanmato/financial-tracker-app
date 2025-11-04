// frontend/src/components/TransactionForm.tsx
import { useState } from "react";

//Import the INewTransaction type from App.tsx
import type { INewTransaction } from "../src/App";

//Define the type for the component props received
interface TransactionFormProps {
  onAddTransaction: (newTransaction: INewTransaction) => Promise<void>;
}

const inputBaseStyle =
  "w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
const labelBaseStyle =
  "block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1";

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
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-8"
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Add New Transaction
      </h3>

      {/* Grid para el layout del formulario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo Title (ocupa 2 columnas) */}
        <div className="md:col-span-2">
          <label htmlFor="title" className={labelBaseStyle}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputBaseStyle}
            required
          />
        </div>

        {/* Campo Amount */}
        <div>
          <label htmlFor="amount" className={labelBaseStyle}>
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={inputBaseStyle}
            placeholder="0.00"
            required
          />
        </div>

        {/* Campo Type */}
        <div>
          <label htmlFor="type" className={labelBaseStyle}>
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputBaseStyle}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Campo Category */}
        <div>
          <label htmlFor="category" className={labelBaseStyle}>
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputBaseStyle}
            required
          />
        </div>

        {/* Campo Date */}
        <div>
          <label htmlFor="date" className={labelBaseStyle}>
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputBaseStyle}
            required
          />
        </div>
      </div>

      {/* Botón de Submit */}
      <button
        type="submit"
        className={
          "w-full mt-6 font-bold py-2 px-4 rounded-md " +
          "bg-blue-600 text-white hover:bg-blue-700 " +
          "dark:bg-blue-500 dark:hover:bg-blue-600 " +
          "focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 " +
          "active:bg-blue-800 dark:active:bg-blue-700 " +
          "transition duration-300 ease-in-out"
        }
      >
        Add Transaction
      </button>
    </form>
  );
};
export default TransactionForm;
