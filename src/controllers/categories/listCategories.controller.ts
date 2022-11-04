import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listCategoriesService from "../../services/categories/listCategories.service";

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();

  return res.status(200).json(instanceToPlain(categories));
};

export default listCategoriesController;