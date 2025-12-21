import { FastifyReply, FastifyRequest, DoneFuncWithErrOrRes } from "fastify";
import { ZodType } from "zod";

export const validation =
  (models: ZodType<any>) =>
  (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    const result = models.safeParse(request.body);

    if (!result.success) {
      const issues = result.error.issues.map((item) => item.message);

      reply.status(400).send({
        status_code: 400,
        message: "Invalid request payload.",
        errors: issues,
      });
      return;
    }

    request.body = result.data;
    done();
  };

