import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// Comum way to do an type
// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

// "Pick" way to do an type, you pick each type you want from some interface
// type TransactionInput = Pick<
//   Transaction,
//   'title' | 'amount' | 'type' | 'category'
// >;

// "Omit" way to do an type, you get all the types and omit what you don't want from some interface
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
