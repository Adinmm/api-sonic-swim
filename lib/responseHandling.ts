import { FastifyReply } from "fastify";

export const createdOrUpdated = (reply: FastifyReply, message: string) => {
  return reply.status(200).send({
    status_code: 200,
    message,
  });
};

export const ok = <T>(reply: FastifyReply, message: string, data: T) => {
  return reply.status(200).send({
    status_code: 200,
    message,
    data,
  });
};

export const badRequest = (reply: FastifyReply, message: string) => {
  return reply.status(400).send({
    status_code: 400,
    message,
  });
};
