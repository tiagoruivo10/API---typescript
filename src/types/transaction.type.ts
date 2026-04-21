import type { TransactionType } from "@prisma/client";

export interface TransactionFilter {
  userId: string;
  date?: {
    gte: Date; // -> maior ou igual
    lte: Date; // -> menor ou igual
  };
  type?: TransactionType;
  categoryId?: string;
}
