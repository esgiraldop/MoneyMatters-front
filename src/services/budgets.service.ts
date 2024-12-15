import { privateAxiosInstance } from "../config/axios.config";
import {
  ISingleBudgetSucessfullResponse,
  IBudgetsSucessfullResponse,
  IUpdateBudget,
} from "../interfaces/budget.interface";
import { handleAxiosResponse } from "../utilities/handle-axios-response.utility";

export type IHandleError = (
  isErrorModalOpen: boolean,
  errorLoading: boolean
) => void;

export class BudgetsService {
  static resource = "budgets";

  static async getAll(
    params: Record<string, string>
  ): Promise<IBudgetsSucessfullResponse | null> {
    return handleAxiosResponse<IBudgetsSucessfullResponse>(async () => {
      return await privateAxiosInstance.get<IBudgetsSucessfullResponse>(
        `${this.resource}`,
        { params }
      );
    });
  }

  static async getById(
    id: number
  ): Promise<ISingleBudgetSucessfullResponse | null> {
    return handleAxiosResponse<ISingleBudgetSucessfullResponse>(
      async () =>
        await privateAxiosInstance.get<ISingleBudgetSucessfullResponse>(
          `${this.resource}/${id}`
        )
    );
  }

  static async create(
    budgetData: IUpdateBudget
  ): Promise<ISingleBudgetSucessfullResponse | null> {
    return handleAxiosResponse<ISingleBudgetSucessfullResponse>(
      async () =>
        await privateAxiosInstance.post<ISingleBudgetSucessfullResponse>(
          `${this.resource}`,
          budgetData
        )
    );
  }

  static async update(
    id: number,
    budgetData: IUpdateBudget
  ): Promise<IBudgetsSucessfullResponse | null> {
    return handleAxiosResponse<IBudgetsSucessfullResponse>(
      async () =>
        await privateAxiosInstance.patch<IBudgetsSucessfullResponse>(
          `${this.resource}/${id}`,
          budgetData
        )
    );
  }

  static async delete(id: number): Promise<IBudgetsSucessfullResponse | null> {
    return handleAxiosResponse<IBudgetsSucessfullResponse>(
      async () =>
        await privateAxiosInstance.delete<IBudgetsSucessfullResponse>(
          `${this.resource}/${id}`
        )
    );
  }
}
