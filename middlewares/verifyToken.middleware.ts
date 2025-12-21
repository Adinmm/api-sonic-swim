import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify";
import jwt from "jsonwebtoken";
import { badRequest } from "../lib/responseHandling";

const JWT_SECRET = process.env.JWT_KEY as string;

export const verifyToken = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return badRequest(reply, "Authorization header is required");
  }
  const token = authHeader.split(" ")[1];
  if (!token) return badRequest(reply, "token is required");
  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  if (!decoded) return badRequest(reply, "Invalid token");
  (request as any).user = decoded;

  done();
};
