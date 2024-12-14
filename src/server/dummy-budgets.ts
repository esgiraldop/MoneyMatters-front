import { IBudget } from "../interfaces/budget.interface";

export const budgetData: IBudget[] = [
  {
    id: "1",
    budget_id: null,
    name: "Test #1 parent",
    amount: 10000,
    startDate: new Date("2024-12-02"), // TODO: I have to but it on the second day since i'm still not implementing time zones
    endDate: new Date("2024-12-31"),
    category: {
      id: 1,
      name: "category test",
    },
  },
  {
    id: "2",
    budget_id: "1",
    name: "Test #2",
    amount: 10000,
    startDate: new Date("2024-12-02"),
    endDate: new Date("2024-12-31"),
    category: {
      id: 2,
      name: "category test #2",
    },
  },
  {
    id: "3",
    budget_id: "1",
    name: "Test #3",
    amount: 10000,
    startDate: new Date("2024-12-02"),
    endDate: new Date("2024-12-31"),
    category: {
      id: 3,
      name: "category test #3",
    },
  },
  {
    id: "4",
    budget_id: null,
    name: "Test #4 parent",
    amount: 10000,
    startDate: new Date("2024-11-02"),
    endDate: new Date("2024-11-30"),
    category: {
      id: 4,
      name: "category test #4",
    },
  },
  {
    id: "5",
    budget_id: "4",
    name: "Test #5",
    amount: 10000,
    startDate: new Date("2024-11-02"),
    endDate: new Date("2024-11-30"),
    category: {
      id: 5,
      name: "category test #5",
    },
  },
  {
    id: "6",
    budget_id: "4",
    name: "Test #6",
    amount: 10000,
    startDate: new Date("2024-11-02"),
    endDate: new Date("2024-11-30"),
    category: {
      id: 6,
      name: "category test #6",
    },
  },
];
