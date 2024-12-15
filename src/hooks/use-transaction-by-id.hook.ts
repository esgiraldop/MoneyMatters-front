import { useCallback, useState } from "react";
import { ISingleTransactionSucessfullResponse } from "../interfaces/transaction.interface";
import { TransactionsService } from "../services/transactions.service";
import { useFocusEffect } from "@react-navigation/native";

export function useTransactionById(transactionId: number) {
  const [transactionInfo, setTransactionInfo] =
    useState<ISingleTransactionSucessfullResponse | null>(null);
  const [isTransactionLoading, setIsTransactionLoading] = useState<
    boolean | null
  >(false);
  const [errorLoadingTransaction, setErrorLoadingTransaction] = useState<
    boolean | null
  >(null);

  useFocusEffect(
    useCallback(() => {
      async function getTransactionInfo(id: number) {
        setIsTransactionLoading(true);
        const transactionInfoResponse = await TransactionsService.getById(id);
        if (transactionInfoResponse) {
          setTransactionInfo(transactionInfoResponse);
          setIsTransactionLoading(false);
          setErrorLoadingTransaction(false);
        } else {
          setIsTransactionLoading(false);
          setErrorLoadingTransaction(true);
        }
      }

      getTransactionInfo(transactionId);
      return () => getTransactionInfo(transactionId);
    }, [transactionId])
  );

  return {
    transactionInfo,
    setTransactionInfo,
    isTransactionLoading,
    setIsTransactionLoading,
    errorLoadingTransaction,
    setErrorLoadingTransaction,
  };
}
