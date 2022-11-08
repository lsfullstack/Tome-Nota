import { Request, Response } from "express";
import deleteCategoryService from "../../services/categories/deleteCategory.service";

const deleteCategoryController = async (req: Request, res: Response) => {
  const idTargetCategory: string = req.params.id;
  await deleteCategoryService(idTargetCategory);

  return res.status(204).send();
};

export default deleteCategoryController;