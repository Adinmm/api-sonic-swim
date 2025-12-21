import { FastifyInstance } from "fastify";
import * as AppController from "../controllers/app.controller";
export const appRuning = async (route: FastifyInstance) => {
  route.get("/", AppController.apiRuning);
};
