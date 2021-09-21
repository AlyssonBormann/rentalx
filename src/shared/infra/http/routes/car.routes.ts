import { Router } from "express";
import { CreateCarController } from "@modules/cars/UseCases/createCar/CreateCarController";

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post("/", createCarController.handler);

export { carRoutes };
