import { IBudget } from "./budget.interface";
import { ICategory } from "./category.interface";

export interface ITransaction {
  id: string;
  name: string;
  amount: number;
  description: string;
  transactionDate: Date;
  isActive: boolean;
  budget: IBudget;
  category: ICategory;
}

export interface IUpdateTransaction extends Partial<ITransaction> {}

export interface ITransactionsSucessfullResponse {
  code: 200;
  data: ITransaction[];
  message: "Success";
}

export interface ISingleTransactionSucessfullResponse {
  code: 200;
  data: ITransaction;
  message: "Success";
}
