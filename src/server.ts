import express from "express";
import "./database";
import "./shared/container";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running port 3333!"));
