import prisma from "../configs/prisma";
import { passwordHash } from "../lib/passwordHash";
import {
  ClassModel,
  Contact,
  ContactInformationModel,
  UserModel,
} from "../schemas/app.schema";

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
  const data = await prisma.kelas.count();
  if (data === 0) {
    throw new Error("Class not found");
  }
  const result = await prisma.kelas.findMany();
  if (!result) {
    throw new Error("Class not found");
  }
  return result;
};

export const createUser = async (data: UserModel) => {
  const user = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });
  if (user) {
    throw new Error("User already created");
  }
  const password = await passwordHash(data.password || "");
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

export const createContactInformation = async (data: Contact) => {
  const isEmpty = await prisma.contact_information.count();
  if (isEmpty > 0) {
    throw new Error("Contact Information already created");
  }
  const result = await prisma.contact_information.create({
    data,
  });
  if (!result) {
    throw new Error("Contact Information not created");
  }
  return result;
};

export const getContactInformation = async () => {
  const isEmty = await prisma.contact_information.count();
  if (isEmty === 0) {
    throw new Error("Contact Information not found");
  }
  const result = await prisma.contact_information.findFirst();
  if (!result) {
    throw new Error("Contact Information not found");
  }
  return result;
};

export const updateContactInformation = async (
  data: ContactInformationModel,
  id: string
) => {
  const isEmty = await prisma.contact_information.count();
  if (isEmty === 0) {
    throw new Error("Contact Information not found");
  }
  const result = await prisma.contact_information.update({
    where: {
      id: id,
    },
    data,
  });
  if (!result) {
    throw new Error("Contact Information not found");
  }
  return result;
};

export const updateUser = async (id: string, data: UserModel) => {
  const updatePassword = await passwordHash(data.password || "");
  const isEmpty = await prisma.user.count();
  if (isEmpty === 0) {
    throw new Error("User Not Found");
  }
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: data.username,
      password: updatePassword,
    },
  });
  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

export const deleteClass = async (id: string) => {
  const result = await prisma.kelas.delete({
    where: {
      id,
    },
  });
  if (!result) {
    throw new Error("Class not found");
  }
  return result;
};
