import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { StudyTopicCategory } from "../../entities/studyTopicCategory.entity";
import { AppError } from "../../errors/AppError";

const deleteCategoryService = async (id: string): Promise<void> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const studyTopicCategoryRepository = AppDataSource.getRepository(StudyTopicCategory);
  const findCategory = await categoryRepository.findOneBy({ id });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const findStudyTopicCategory = await studyTopicCategoryRepository.find({
    where:{
      category: findCategory
    },
    relations: {
      studyTopic: true
    }
  });

  for (const { id } of findStudyTopicCategory) {
    await studyTopicCategoryRepository.delete(
      id
    );
  }

  await categoryRepository.delete({
    id: findCategory.id
  });
};

export default deleteCategoryService;
