import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "../generated/prisma/client";

export const errorHandling = (app: FastifyInstance) => {
  return app.setErrorHandler(
    (error: unknown, request: FastifyRequest, reply: FastifyReply) => {
      app.log.error(error);

      let statusCode = 500;
      let message = "Something went wrong";

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        statusCode = 400;
        switch (error.code) {
          case "P2002":
            message = `Duplicate field value: ${(error.meta as any)?.target}`;
            break;
          case "P2003":
            message = `Foreign key constraint failed`;
            break;
          default:
            message = "Database error occurred";
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid data sent to the database";
      } else if (error instanceof Error) {
        message = error.message;
        statusCode = (error as any).statusCode ?? 400;
      }

      reply.code(statusCode).send({
        status_code: statusCode,
        message,
      });
    }
  );
};
