import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { ICategory } from "../../interfaces/categories.interfaces";

const listCategoriesService = async (): Promise<ICategory[]> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categories = categoryRepository.find();

  return categories;
};

export default listCategoriesService;
