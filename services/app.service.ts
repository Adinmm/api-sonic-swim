import { error } from "console";
import cloudinary from "../configs/cloudinary";
import prisma from "../configs/prisma";
import { passwordHash } from "../lib/passwordHash";
import {
  ClassModel,
  CoachModel,
  Contact,
  ContactInformationModel,
  FaqQuestionModel,
  ImageModel,
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

export const deleteImage = async (id: string) => {
  const image = await prisma.image.findUnique({
    where: {
      id,
    },
  });
  if (!image) {
    throw new Error("Image not found");
  }
  const removeImage = await cloudinary.uploader.destroy(image.image_public_id);

  if (!removeImage) {
    throw new Error("Failed destroy image");
  }

  const removeImageDB = await prisma.image.delete({
    where: {
      id,
    },
  });
  if (!removeImageDB) {
    throw new Error("Failed delete image from database");
  }
  return removeImageDB;
};

export const createImageUrl = async (data: ImageModel) => {
  const result = await prisma.image.create({
    data,
  });
  if (!result) {
    throw new Error("failed to create image url");
  }
  return result;
};

export const getImages = async () => {
  const result = await prisma.image.findMany();
  if (!result) {
    throw new Error("failed to get image");
  }
  return result;
};

export const uploadImage = async (file: any, folderName: string) => {
  const result = await new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    file.file.pipe(uploadStream);
  });
  if (!result) {
    throw new Error("failed to upload image");
  }
  const data = {
    public_id: result.public_id,
    image_url: result.secure_url,
  };
  return data;
};

export const createCoach = async (data: CoachModel) => {
  const result = await prisma.coach.create({
    data,
  });
  if (!result) {
    throw new Error("failed to create coach");
  }
  return result;
};

export const getCoaches = async () => {
  const result = await prisma.coach.findMany();
  if (!result) {
    throw new Error("failed to get coaches");
  }
  return result;
};
export const createFaqCategory = async (data: { category: string }) => {
  const result = await prisma.faq_category.create({
    data,
  });
  if (!result) {
    throw new Error("failed to create faq category");
  }
  return result;
};

export const getFaqCategories = async () => {
  const result = await prisma.faq_category.findMany({
    select: {
      id: true,
      category: true,
      createdAt: true,
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
          createdAt: true,
        },
      },
    },
  });
  if (!result) {
    throw new Error("failed to get faq categories");
  }
  return result;
};

export const createFaqQuestion = async (data: FaqQuestionModel) => {
  const result = await prisma.faq_question.create({
    data,
  });
  if (!result) {
    throw new Error("failed to create faq question");
  }
  return result;
};

export const deleteCoach = async (id: string) => {
  const coach = await prisma.coach.findUnique({
    where: {
      id,
    },
  });
  if (!coach) {
    throw new Error("Coach not found");
  }

  const deleteImage = await cloudinary.uploader.destroy(coach.image_public_id);
  if (!deleteImage) {
    throw new Error("Failed destroy image");
  }
  const removeImageDB = await prisma.coach.delete({
    where: {
      id,
    },
  });
  if (!removeImageDB) {
    throw new Error("Failed delete image from database");
  }
  return removeImageDB;
};

export const deleteFaq = async (id: string) => {
  const result = await prisma.faq_question.delete({
    where: {
      id,
    },
  });
  if (!result) {
    throw new Error("failed to delete faq");
  }
  return result;
};

export const deleteFaqCategory = async (id: string) => {
  const result = await prisma.faq_category.delete({
    where: {
      id,
    },
  });
  if (!result) {
    throw new Error("failed to delete faq category");
  }
  return result;
};

export const updateClass = async (id: string, data: ClassModel) => {
  const response = await prisma.kelas.update({
    where: {
      id,
    },
    data,
  });
  if (!response) {
    throw new Error("failed to update class");
  }
  return response;
};
