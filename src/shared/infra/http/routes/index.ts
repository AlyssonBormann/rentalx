import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./user.routes";
import { carRoutes } from "./car.routes";
import { rentalRoutes } from "./rental.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carRoutes);
router.use("/rentals", rentalRoutes);

export { router };
