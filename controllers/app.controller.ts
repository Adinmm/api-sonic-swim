import { FastifyReply, FastifyRequest } from "fastify";
import { ClassModel, UserModel } from "../schemas/app.schema";
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
