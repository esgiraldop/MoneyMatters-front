import { useState } from "react";
import { ITransaction } from "../interfaces/transaction.interface";

export function useTransactions() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);
  const [errorLoadingTransactions, setErrorLoadingTransactions] = useState<
    boolean | null
  >(null);
  const [isLoadingTransaction, setIsLoadingTransaction] = useState<
    boolean | null
  >(null);

  return {
    transactions,
    setTransactions,
    filteredTransactions,
    setFilteredTransactions,
    errorLoadingTransactions,
    setErrorLoadingTransactions,
    isLoadingTransaction,
    setIsLoadingTransaction,
  };
}
