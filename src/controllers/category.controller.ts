import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../config/prisma.js";

export const getCategories = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    reply.send(categories);
  } catch (err) {
    request.log.error(err as Error, "Erro ao buscar categories");
    reply.status(500).send({ error: "erro ao buscar categorias" });
  }
};
