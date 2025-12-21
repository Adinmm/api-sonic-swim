import { FastifyReply, FastifyRequest } from "fastify";

export const apiRuning = (request: FastifyRequest, reply: FastifyReply)=>{
return reply.send("Api is running");
}