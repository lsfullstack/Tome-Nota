import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICategory, ICategoryUpdate } from "../../interfaces/categories.interfaces";

const updateCategoryService = async (name: ICategoryUpdate, id: string): Promise<ICategory> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const findCategory = await categoryRepository.findOneBy({ id });
  const verifyBlockedFields = Object.keys(name).some((e) => e !== "name");

  if (verifyBlockedFields) {
    throw new AppError("Only the name field can be changed");
  }

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.update(id, name);

  const updatedCategory = await categoryRepository.findOneBy({
    id
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return updatedCategory!;
};

export default updateCategoryService;
