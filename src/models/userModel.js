import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const userSchema = z.object({
  id: z.number({
    required_error: "o ID é obrigatorio",
    invalid_type_error: "o ID esse campo deve ser um Inteiro",
  }),
  name: z
    .string({
      required_error: "o Nome é obrigatorio",
      invalid_type_error: "o Nome deve ser uma String",
    })
    .min(2, {
      message: "o nome deve conter no minimo 2 caracteres",
    })
    .max(200, {
      message: "o nome deve ter no maximo 200 caracteres",
    }),
  email: z
    .string({
      required_error: "o Email é obrigatorio",
    })
    .email({
      message: "email invalido",
    })
    .max(500, {
      message: "o email deve ter no maximo 500 caracteres",
    }),
  pass: z
    .string({
      required_error: "a Senha é obrigatoria",
      invalid_type_error: "a Senha deve ser uma String",
    })
    .min(8, {
      message: "a senha deve conter no minimo 8 caracteres",
    }),
});

const validadeUserToCreate = (user) => {
  const partialUserSchema = userSchema.partial({ id: true });
  return partialUserSchema.safeParse(user);
};

// name:true, email:true
const validadeUserToUpdate = (user) => {
  const partialUserSchema = userSchema.partial({ pass: true });
  return partialUserSchema.safeParse(user);
};
const validadeUserToLogin = (user) => {
  const partialUserSchema = userSchema.partial({
    id: true,
    name: true,
  });
  return partialUserSchema.safeParse(user);
};

const getAll = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const getById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const create = (user) => {
  return prisma.user.create({
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const update = (user) => {
  return prisma.user.update({
    where: { id: user.id },
    data: { user },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const deletear = (id) => {
  return prisma.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const getByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  deletear,
  validadeUserToCreate,
  validadeUserToUpdate,
  validadeUserToLogin,
  getByEmail,
};
