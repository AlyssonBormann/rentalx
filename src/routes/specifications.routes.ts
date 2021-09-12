import { Router } from "express";

import { createSpecificationController } from "../modules/cars/UseCases/createSpecification";
const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handler(request, response);
});

export { specificationsRoutes };
