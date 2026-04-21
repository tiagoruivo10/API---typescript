import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller.js";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller.js";
import { getTransactionSummary } from "../controllers/transactions/getTransactionSummary.controller.js";
import { getTransactions } from "../controllers/transactions/getTransactions.controller.js";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionSummarySchema,
  getTransactionsSchema,
} from "../schemas/transaction.schema.js";

const transactionRoutes = async (fastify: FastifyInstance) => {
  // Criação
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  // Buscar com Filtros
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });

  // Buscar o Resumo
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: zodToJsonSchema(getTransactionSummarySchema),
    },
    handler: getTransactionSummary,
  });

  // Deletar
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });
};

export default transactionRoutes;
