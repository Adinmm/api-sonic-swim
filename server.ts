import cors from "@fastify/cors";
import Fastify from "fastify";
import dotenv from "dotenv";

import {appRuning} from "./routes/app.route"


dotenv.config();

const app = Fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

// app.register(multipart);

// app.register(appRoute, { prefix: "/api" });
app.register(appRuning);

// errorHandling(app);

const PORT = Number(process.env.PORT) || 3000;

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
