import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/UseCases/createCategory/CreateCategoryController";
import listCategoriesController from "../modules/cars/UseCases/listCategories";
import { importCategoryController } from "../modules/cars/UseCases/importCategory";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handler);

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController().handler(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handler(request, response);
});

export { categoriesRoutes };
