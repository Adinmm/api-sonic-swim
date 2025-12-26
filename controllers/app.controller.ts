import { FastifyReply, FastifyRequest } from "fastify";
import {
  ClassModel,
  Contact,
  ContactInformationModel,
  ImageModel,
  UserModel,
} from "../schemas/app.schema";
import * as AppService from "../services/app.service";
import { badRequest, createdOrUpdated, ok } from "../lib/responseHandling";

import cloudinary from "../configs/cloudinary";
export const apiRuning = (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send("Api Is Running");
};
export const createClass = async (
  request: FastifyRequest<{ Body: ClassModel }>,
  reply: FastifyReply
) => {
  const input = request.body;
  await AppService.createClass(input);
  return createdOrUpdated(reply, "Class created successfully");
};

export const getClass = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = await AppService.getClasses();
  return ok(reply, "class retrived successfully", data);
};

export const createUser = async (
  request: FastifyRequest<{ Body: UserModel }>,
  reply: FastifyReply
) => {
  const input = request.body;
  await AppService.createUser(input);
  return createdOrUpdated(reply, "User created successfully");
};

export const getUserById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  const data = await AppService.getUserById(id);
  return ok(reply, "User retrived successfully", data);
};

export const createContactInformation = async (
  request: FastifyRequest<{ Body: Contact }>,
  reply: FastifyReply
) => {
  const input = request.body;
  await AppService.createContactInformation(input);
  return createdOrUpdated(reply, "Contact Information created successfully");
};

export const getContactInformation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const result = await AppService.getContactInformation();
  return ok(reply, "Contact Information retrived successfully", result);
};

export const updateContactInformation = async (
  request: FastifyRequest<{
    Body: ContactInformationModel;
    Params: { id: string };
  }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  const input = request.body;
  await AppService.updateContactInformation(input, id);
  return createdOrUpdated(reply, "Contact Information updated successfully");
};

export const deleteClass = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  await AppService.deleteClass(id);
  return createdOrUpdated(reply, "Class deleted successfully");
};

export const updateUser = async (
  request: FastifyRequest<{ Body: UserModel; Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  const input = request.body;
  await AppService.updateUser(id, input);
  return createdOrUpdated(reply, "User updated successfully");
};

export const uploadImage = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const file = await request.file();
  if (!file) return badRequest(reply, "file is required");
  const uploadResult = await new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "gallerys",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    file.file.pipe(uploadStream);
  });

  if (!uploadResult) return badRequest(reply, "Failed to upload image");

  const result = {
    public_id: uploadResult.public_id,
    image_url: uploadResult.secure_url,
  };

  return ok(reply, "Image uploaded successfully", result);
};

export const createImageUrl = async (
  request: FastifyRequest<{ Body: ImageModel }>,
  reply: FastifyReply
) => {
  const input = request.body;
  await AppService.createImageUrl(input);
  return createdOrUpdated(reply, "Image url created successfully");
};

export const deleteImage = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  await AppService.deleteImage(id);
  return createdOrUpdated(reply, "Image deleted successfully");
};

export const getImages = async(request: FastifyRequest, reply: FastifyReply)=>{
  const result = await AppService.getImages();
  return ok(reply, "Images retrived successfully", result);
}
