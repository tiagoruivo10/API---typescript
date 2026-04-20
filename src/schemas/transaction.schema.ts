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

  type: z.nativeEnum(TransactionType, {
    required_error: "Tipo obrigatório",
    invalid_type_error: "Tipo inválido",
  }),
});
