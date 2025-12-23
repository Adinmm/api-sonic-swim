import { FastifyReply, FastifyRequest } from "fastify";
import { ClassModel, Contact, ContactInformationModel, UserModel } from "../schemas/app.schema";
import * as AppService from "../services/app.service";
import { createdOrUpdated, ok } from "../lib/responseHandling";

export const apiRuning = (request: FastifyRequest, reply: FastifyReply)=>{
return reply.send("Api Is Running");
}
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

export const createUser = async(request : FastifyRequest<{Body: UserModel}>, reply : FastifyReply)=>{
    const input = request.body;
    await AppService.createUser(input);
    return createdOrUpdated(reply, "User created successfully");
}

export const getUserById = async(request : FastifyRequest<{Params: {id: string}}>, reply : FastifyReply)=>{
    const id = request.params.id;
    const data = await AppService.getUserById(id);
    return ok(reply, "User retrived successfully", data);
}

export const createContactInformation = async(request: FastifyRequest<{Body: Contact}>, reply: FastifyReply) =>{
  const input = request.body
  await AppService.createContactInformation(input);
  return createdOrUpdated(reply, "Contact Information created successfully");
}

export const getContactInformation = async(request: FastifyRequest, reply: FastifyReply)=>{
  const result = await AppService.getContactInformation();
  return ok(reply, "Contact Information retrived successfully", result);
}

export const updateContactInformation = async(request: FastifyRequest<{Body: ContactInformationModel, Params: {id: string}}>, reply: FastifyReply)=>{
  const id = request.params.id
  const input = request.body
  await AppService.updateContactInformation(input, id)
  return createdOrUpdated(reply, "Contact Information updated successfully");
}

export const deleteClass = async(request: FastifyRequest<{ Params: {id: string}}>, reply: FastifyReply)=>{
  const id = request.params.id
  await AppService.deleteClass(id)
  return createdOrUpdated(reply, "Class deleted successfully");
}

export const updateUser = async(request: FastifyRequest<{Body: UserModel, Params: {id: string}}>, reply: FastifyReply)=>{
  const id = request.params.id
  const input = request.body
  await AppService.updateUser(id, input)
  return createdOrUpdated(reply, "User updated successfully")
}
