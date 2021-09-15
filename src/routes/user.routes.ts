import { Router } from "express";

import { CreateUserController } from "../modules/accounts/UseCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handler);

export { usersRoutes };
