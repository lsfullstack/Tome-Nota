import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICategory } from "../../interfaces/categories.interfaces";

const retrieveCategoryService = async (id: string): Promise<ICategory> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const findCategory = await categoryRepository.findOneBy({ id });

  if(!findCategory) {
    throw new AppError("Category not found", 404);
  }

  return findCategory;
};

export default retrieveCategoryService;