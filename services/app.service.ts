import prisma from "../configs/prisma";
import { passwordHash } from "../lib/passwordHash";
import { ClassModel, UserModel } from "../schemas/app.schema";

export const createClass = async (data: ClassModel) => {
  const result = await prisma.kelas.create({
    data: {
      class_name: data.class_name,
      description: data.description,
      schedule: data.schedule,
      price: data.price,
      class_items: data.class_items,
    },
  });
  if (!result) {
    throw new Error("Class not created");
  }
  return result;
};

export const getClasses = async () => {
  const result = await prisma.kelas.findMany();
  if (!result) {
    throw new Error("Class not found");
  }
  return result;
};

export const createUser = async (data: UserModel) => {
  const password = await passwordHash(data.password);
  const result = await prisma.user.create({
    data: {
      username: data.username,
      password,
      role: "ADMIN",
    },
  });
  if (!result) {
    throw new Error("User not created");
  }
  return result;
};

export const getUserById = async (id: string) => {
  const result = await prisma.user.findUnique({ where: { id: id } });
  if (!result) {
    throw new Error("User not found");
  }
  const { password, ...rest } = result;
  return rest;
};
