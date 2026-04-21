import type { TransactionType } from "@prisma/client";
import type { CategorySummary } from "./category.types.js";

export interface TransactionFilter {
  userId: string;
  date?: {
    gte: Date; // -> maior ou igual
    lte: Date; // -> menor ou igual
  };
  type?: TransactionType;
  categoryId?: string;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expensesByCategory: CategorySummary[];
}
