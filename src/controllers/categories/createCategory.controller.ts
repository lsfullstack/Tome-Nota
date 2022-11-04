import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { ICategoryRequest } from "../../interfaces/categories.interfaces";
import createCategoryService from "../../services/categories/createCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
  const category: ICategoryRequest = req.body;
  const createdCategory = await createCategoryService(category);

  return res.status(201).json(instanceToPlain(createdCategory));
};

export default createCategoryController;
