export interface IBudget {
  id: string;
  budget_id: string;
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  isGeneral: boolean;
  isDeleted: boolean;
}
