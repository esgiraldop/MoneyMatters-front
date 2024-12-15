import { ICategory } from "./category.interface";
import { ITransaction } from "./transaction.interface";

export interface IBudget {
  id: string;
  budget_id: string | null;
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  category: ICategory;
  transactions: ITransaction[];
  transactionsSum: number;
}

export interface IUpdateBudget extends Partial<IBudget> {}

export interface IBudgetsSucessfullResponse {
  code: 200;
  data: IBudget[];
  message: "Success";
}

export interface ISingleBudgetSucessfullResponse {
  code: 200;
  data: IBudget;
  message: "Success";
}
