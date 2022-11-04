import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const deleteCategoryService = async (id: string): Promise<void> => {

  const categoryRepository = AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOneBy({id});

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.delete(
    id,
  );
};

export default deleteCategoryService;
