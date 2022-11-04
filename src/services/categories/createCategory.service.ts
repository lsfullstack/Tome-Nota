import AppDataSource from "../../data-source";
import { ICategory, ICategoryRequest } from "../../interfaces/categories.interfaces";
import { Category } from "../../entities/category.entity";

const createCategoryService = async ({ name }: ICategoryRequest): Promise<ICategory> => {

  const categoryRepository = AppDataSource.getRepository(Category);

  const newCategory: ICategory = categoryRepository.create({
    name,
  });

  await categoryRepository.save(newCategory);

  return newCategory;
};

export default createCategoryService;
