import AppDataSource from "../../data-source";
import { ICategory, ICategoryRequest } from "../../interfaces/categories.interfaces";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const createCategoryService = async (category: ICategoryRequest): Promise<ICategory> => {
  const { name } = category;
  const categoryRepository = AppDataSource.getRepository(Category);
  const findCategory = await categoryRepository.findOne({
    where: {
      name 
    }
  });

  const verifyBlockedFields = Object.keys(category).some((e) => e !== "name");

  if (verifyBlockedFields) {
    throw new AppError("Only the name field can be send", 401);
  }

  if(findCategory !== null) {
    throw new AppError("Category already exists", 401);
  }
  
  const newCategory: ICategory = categoryRepository.create({
    name
  });

  await categoryRepository.save(newCategory);

  return newCategory;
};

export default createCategoryService;
