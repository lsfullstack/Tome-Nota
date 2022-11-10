import { Request, Response } from "express";
import retrieveCategoryService from "../../services/categories/retrieveCategory.service";

const retrieveCategoryController = async (req: Request, res: Response) => {
  const idTargetCategory: string = req.params.id;
  const category = await retrieveCategoryService(idTargetCategory);

  return res.status(200).json(category);
};

export default retrieveCategoryController;