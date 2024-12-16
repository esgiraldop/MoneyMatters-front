import { useCallback, useState } from "react";
import { ITransaction } from "../interfaces/transaction.interface";
import { useFocusEffect } from "@react-navigation/native";
import { TransactionsService } from "../services/transactions.service";

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

  useFocusEffect(
    useCallback(() => {
      async function getTransactionsInfo() {
        setIsLoadingTransaction(true);
        const params: Record<string, string> = {};
        const TransactionsResponse = await TransactionsService.getAll(params);
        if (TransactionsResponse?.data) {
          setTransactions(TransactionsResponse?.data);
          setFilteredTransactions(TransactionsResponse?.data); //TODO: This should change when Im implementing the filtering
          setIsLoadingTransaction(false);
          setErrorLoadingTransactions(false);
        } else {
          setIsLoadingTransaction(false);
          setErrorLoadingTransactions(true);
        }
      }

      getTransactionsInfo();
      return () => getTransactionsInfo();
    }, [])
  );

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
