// frontend/src/components/TransactionList.tsx

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
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <div>
      <h3>History</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            <strong>{transaction.title}</strong>
            <span> ({transaction.category})</span>:
            <span> ${transaction.amount}</span>
            <span> on {new Date(transaction.date).toLocaleDateString()}</span>
            <button onClick={() => onDeleteTransaction(transaction._id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
