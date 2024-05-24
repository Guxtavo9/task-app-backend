import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const taskSchema = z.object({
  id: z.number({
    required_error: "o ID é obrigatorio",
    invalid_type_error: "o ID esse campo deve ser um Inteiro",
  }),
  IdUser: z.number({
    required_error: "o ID de ususario é obrigatorio",
    invalid_type_error: "o ID de ususario esse campo deve ser um Inteiro",
  }),
  title: z
    .string({
      required_error: "o Titulo é obrigatorio",
      invalid_type_error: "o Titulo deve ser uma String",
    })
    .min(2, {
      message: "o Titulo deve conter no minimo 2 caracteres",
    })
    .max(200, {
      message: "o Titulo deve ter no maximo 200 caracteres",
    }),
  descricao: z
    .string({
      required_error: "o descrição é obrigatorio",
    })
    .email({
      message: "descrição invalido",
    })
    .max(500, {
      message: "o descrição deve ter no maximo 500 caracteres",
    }),
  isChecked: z
    .boolean({
      required_error: "a isChecked é obrigatoria",
      invalid_type_error: "a isChecked deve ser um boolean",
    })
    .min(8, {
      message: "a isChecked deve conter no minimo 8 caracteres",
    })
});

const validadeTaskToCreate = (title, descricao, IdUser) => {
  const partialTaskSchema = taskSchema.partial({ id: true, isChecked: true });
  return partialTaskSchema.safeParse({ title, descricao, IdUser });
};
const validadeTaskToUpdate = (title, descricao, IdUser) => {
  const partialTaskSchema = taskSchema.partial({ pass: true });
  return partialTaskSchema.safeParse({ id, isChecked, title, descricao, IdUser, });
};
// const validadeTaskToLogin = (title, descricao, IdUser) => {
//   const partialTaskSchema = taskSchema.partial({ pass: true });
//   return partialTaskSchema.safeParse({ id, name, email, });
// };

const getAll = () => {
  return prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      IdUser: true,
    },
  });
};

const getById = (id) => {
  return prisma.task.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      IdUser: true,
    },
  });
};

const create = (title, descricao, IdUser) => {
  return prisma.task.create({
    data: { title, descricao, IdUser },
    select: {
      title: true,
      description: true,
      IdUser: true,
    },
  });
};

const update = (id, name, email) => {
  return prisma.task.update({
    where: { id },
    data: { name, email },
    select: {
      id: true,
      title: true,
      description: true,
      IdUser: true,

    },
  });
};

const deletear = (id) => {
  return prisma.delete({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      IdUser: true,

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
  validadeTaskToCreate,
  validadeTaskToUpdate,
  // validadeTaskToLogin,;
};
