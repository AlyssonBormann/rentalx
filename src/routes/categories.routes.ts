import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/UseCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../modules/cars/UseCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "../modules/cars/UseCases/importCategory/ImportCategoryController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", createCategoryController.handler);

categoriesRoutes.get("/", listCategoriesController.handler);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handler
);

export { categoriesRoutes };
