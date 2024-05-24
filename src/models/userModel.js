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
    .max(250, {
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
    })
});

const validadeUserToCreate = (name, email, pass) => {
  const partialUserSchema = userSchema.partial({ id: true });
  return partialUserSchema.safeParse({ name, email, pass });
};
const validadeUserToUpdate = (name, email, pass) => {
  const partialUserSchema = userSchema.partial({ pass: true });
  return partialUserSchema.safeParse({ id, name, email, });
};
// const validadeUserToLogin = (name, email, pass) => {
//   const partialUserSchema = userSchema.partial({ pass: true });
//   return partialUserSchema.safeParse({ id, name, email, });
// };

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

// const getByEmail = (email) => {
//   return prisma.user.findUnique({
//     where: {
//       email
//     },
//   });
// };

const create = (name, email, pass) => {
  return prisma.user.create({
    data: { name, email, pass },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const update = (id, name, email) => {
  return prisma.user.update({
    where: { id },
    data: { name, email },
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

export default {
  getAll,
  getById,
  // getByEmail,
  create,
  update,
  deletear,
  validadeUserToCreate,
  validadeUserToUpdate,
  // validadeUserToLogin,;
};
