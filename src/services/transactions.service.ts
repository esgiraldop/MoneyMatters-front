import { privateAxiosInstance } from "../config/axios.config";
import {
  ITransactionsSucessfullResponse,
  ISingleTransactionSucessfullResponse,
  IUpdateTransaction,
} from "../interfaces/transaction.interface";
import { handleAxiosResponse } from "../utilities/handle-axios-response.utility";

export type IHandleError = (
  isErrorModalOpen: boolean,
  errorLoading: boolean
) => void;

export class TransactionsService {
  static resource = "transactions";

  static async getAll(
    params: Record<string, string>
  ): Promise<ITransactionsSucessfullResponse | null> {
    return handleAxiosResponse<ITransactionsSucessfullResponse>(async () => {
      return await privateAxiosInstance.get<ITransactionsSucessfullResponse>(
        `${this.resource}`,
        { params }
      );
    });
  }

  static async getById(
    id: number
  ): Promise<ISingleTransactionSucessfullResponse | null> {
    return handleAxiosResponse<ISingleTransactionSucessfullResponse>(
      async () =>
        await privateAxiosInstance.get<ISingleTransactionSucessfullResponse>(
          `${this.resource}/${id}`
        )
    );
  }

  static async create(
    transactionData: IUpdateTransaction
  ): Promise<ISingleTransactionSucessfullResponse | null> {
    return handleAxiosResponse<ISingleTransactionSucessfullResponse>(
      async () =>
        await privateAxiosInstance.post<ISingleTransactionSucessfullResponse>(
          `${this.resource}`,
          transactionData
        )
    );
  }

  static async update(
    id: number,
    transactionData: IUpdateTransaction
  ): Promise<ITransactionsSucessfullResponse | null> {
    return handleAxiosResponse<ITransactionsSucessfullResponse>(
      async () =>
        await privateAxiosInstance.patch<ITransactionsSucessfullResponse>(
          `${this.resource}/${id}`,
          transactionData
        )
    );
  }

  static async delete(
    id: number
  ): Promise<ITransactionsSucessfullResponse | null> {
    return handleAxiosResponse<ITransactionsSucessfullResponse>(
      async () =>
        await privateAxiosInstance.delete<ITransactionsSucessfullResponse>(
          `${this.resource}/${id}`
        )
    );
  }
}
