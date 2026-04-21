import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma.js";
import type { GetTransactionsQuery } from "../../schemas/transaction.schema.js";
import type { TransactionFilter } from "../../types/transaction.type.js";

dayjs.extend(utc);

export const getTransactions = async (
  request: FastifyRequest<{ Querystring: GetTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "FEADTS";

  if (!userId) {
    reply.status(401).send({ error: "Usuário não autenticado" });
    return;
  }

  const { month, year, categoryId, type } = request.query;

  const filters: TransactionFilter = { userId };

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();
    filters.date = { gte: startDate, lte: endDate };
  }

  if (type) {
    filters.type = type;
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: "desc" },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true,
          },
        },
      },
    });

    reply.send(transactions);
  } catch (err) {
    request.log.error(err as Error, "Erro ao trazer transações");
    reply.status(500).send({ error: "Erro interno do servidor" });
  }
};
