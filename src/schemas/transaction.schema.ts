import { TransactionType } from "@prisma/client";
import { ObjectId } from "mongodb";
import { z } from "zod";

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
  description: z.string().min(1, "Descrição obrigatória"),
  amount: z.number().positive("Valor deve ser positivo"),

  date: z.coerce.date({
    required_error: "Data obrigatória",
    invalid_type_error: "Data inválida",
  }),

  categoryId: z.string().refine(isValidObjectId, {
    message: "Categoria inválida",
  }),

  type: z.enum([TransactionType.expense, TransactionType.income], {
    errorMap: () => ({ message: "Tipo inválido" }),
  }),
});

export const getTransactionsSchema = z.object({
  month: z.string().optional(),
  year: z.string().optional(),
  type: z
    .enum([TransactionType.expense, TransactionType.income], {
      errorMap: () => ({ message: "Tipo inválido" }),
    })
    .optional(),
  categoryId: z
    .string()
    .refine(isValidObjectId, {
      message: "Categoria inválida",
    })
    .optional(),
});

export const getTransactionSummarySchema = z.object({
  month: z.string({ message: "o mês é obrigatório" }),
  year: z.string({ message: "o ano é obrigatório" }),
});

export const deleteTransactionSchema = z.object({
  id: z.string().refine(isValidObjectId, {
    message: "ID inválido",
  }),
});

export type CreateTransactionBody = z.infer<typeof createTransactionSchema>;
export type GetTransactionsQuery = z.infer<typeof getTransactionsSchema>;
export type GetTransactionsSummaryQuery = z.infer<typeof getTransactionSummarySchema>;
export type DeleteTransactionParams = z.infer<typeof deleteTransactionSchema>;
