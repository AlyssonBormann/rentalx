import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/UseCases/createRental/CreateRentalControll";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
