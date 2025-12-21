import { FastifyInstance } from "fastify";
import * as AppMiddleware from "../middlewares/validation.middleware";
import * as AppController from "../controllers/app.controller";
import { ClassSchema, UserSchema } from "../schemas/app.schema";

export const appRoute = async (route: FastifyInstance) => {
  route.post("/class", {
    preHandler: AppMiddleware.validation(ClassSchema),
    handler: AppController.createClass,
  });

  route.post("/user", {
    preHandler: AppMiddleware.validation(UserSchema),
    handler: AppController.createUser,
  });

  route.get("/user/:id", AppController.getUserById);
  route.get("/classes", AppController.getClass);
};

export const appRuning = async(route: FastifyInstance) => {
  route.get("/", AppController.apiRuning);
}
