import { FastifyReply, FastifyRequest } from "fastify";
import { LoginModel } from "../schemas/app.schema";
import * as AuthService from "../services/auth.service";
import {ok} from "../lib/responseHandling"

export const Login = async(request: FastifyRequest<{Body: LoginModel}>, reply: FastifyReply)=>{
    const input = request.body;
    const result = await AuthService.login(input)
    return ok(reply, "Login successful", result);

}