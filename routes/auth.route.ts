import { FastifyInstance } from "fastify";

import * as middleware from "../middlewares/validation.middleware";
import * as AuthController from "../controllers/auth.controller";
import { LoginSchema } from "../schemas/app.schema";

export const authRoute = async(route: FastifyInstance)=>{
    route.post("/login",{
        preHandler: middleware.validation(LoginSchema),
        handler: AuthController.Login
    });
}