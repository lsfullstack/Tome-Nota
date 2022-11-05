import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { ICategoryUpdate } from "../../interfaces/categories.interfaces";
import updateCategoryService from "../../services/categories/updateCategory.service";

const updateCategoryController = async (req: Request, res: Response) => {
  const idTargetCategory: string = req.params.id;
  const name: ICategoryUpdate = req.body;

  const updatedCategory = await updateCategoryService(name, idTargetCategory);

  return res.status(200).json(instanceToPlain(updatedCategory));
};

export default updateCategoryController;
