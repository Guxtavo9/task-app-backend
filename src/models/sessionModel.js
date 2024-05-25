import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (session) => {
  console.log(session);
  return await prisma.session.create({
    data: session,
  });
};

const getByToken = async (token) => {
  return await prisma.session.findUnique({
    where: {
      token,
    },
  });
};

const update = async (session) => {
  return await prisma.session.update({
    where: {
      id: session.id,
    },
    data: session,
  });
};

const deletear = async (userId, token) => {
  return await prisma.session.delete({
    where: {
      userId,
      token,
    },
  });
};

export default { create, deletear, update, getByToken };
