import { ICategory } from "./category.interface";

export interface IBudget {
  id: string;
  budget_id: string | null;
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  category: ICategory;
}
