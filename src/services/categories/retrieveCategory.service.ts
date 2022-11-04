import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

const retrieveCategoryService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const findCategory = await categoryRepository.findOneBy({ id });

  return findCategory;
};

export default retrieveCategoryService;