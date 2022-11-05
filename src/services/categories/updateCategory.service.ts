import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const updateCategoryService = async (name: string, id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const findCategory = await categoryRepository.findOneBy({ id });

  const verifyBlockedFields = Object.keys(name).some(e =>  e === "id" );

  if (verifyBlockedFields) {
    throw new AppError("Only the name fields can be changed", 401);
  }

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.update(
    id,
    {
      name: name,
    }
  );

  const updatedCategory = await categoryRepository.findOneBy({
    id
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return updatedCategory!;
};

export default updateCategoryService;