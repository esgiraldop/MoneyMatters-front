import { ITransaction } from "../interfaces/transaction.interface";

export const transactionData: ITransaction[] = [
  {
    id: "1",
    name: "Test #1",
    amount: 10000,
    transactionDate: new Date("2024-12-12"),
    category: {
      id: 1,
      name: "category test",
    },
  },
  {
    id: "2",
    name: "Test #2",
    amount: 11500,
    transactionDate: new Date("2024-12-12"),
    category: {
      id: 1,
      name: "category test",
    },
  },
  {
    id: "3",
    name: "Test # 3",
    amount: 150000,
    transactionDate: new Date("2024-12-10"),
    category: {
      id: 2,
      name: "cat test #2",
    },
  },
  {
    id: "4",
    name: "Test # 4",
    amount: 6700,
    transactionDate: new Date("2024-12-10"),
    category: {
      id: 2,
      name: "cat test #5",
    },
  },
  {
    id: "5",
    name: "Test # 5",
    amount: 6700,
    transactionDate: new Date("2024-12-10"),
    category: {
      id: 2,
      name: "cat test #5",
    },
  },
];
