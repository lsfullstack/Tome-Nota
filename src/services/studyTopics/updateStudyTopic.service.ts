import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { StudyTopicCategory } from "../../entities/studyTopicCategory.entity";
import { AppError } from "../../errors/AppError";
import { ICategory } from "../../interfaces/categories.interfaces";
import { IStudyTopic, IStudyTopicUpdate } from "../../interfaces/studyTopics.interfaces";

const updateStudyTopicService = async (id: string, studyTopicBody: IStudyTopicUpdate
): Promise<IStudyTopic> => {
  const { title, description, categories } = studyTopicBody;
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const categoriesRepository = AppDataSource.getRepository(Category);
  const studyTopicCategoryRepository = AppDataSource.getRepository(StudyTopicCategory);
  const studyTopic = await studyTopicRepository.findOne({ 
    where: {
      id 
    },
    relations: {
      studyTopicCategories: true
    }
  });

  const verifyBlockedFields = Object.keys(studyTopicBody).some(e => e !== "title" && e !== "categories");

  if (verifyBlockedFields) {
    throw new AppError("Only the title and categories fields can be changed");
  }

  if (!studyTopic) {
    throw new AppError("Study topic not found", 404);
  }

  const categoriesList: ICategory[] = [];
  const oldCategoriesList = [];

  if (categories) {
    for (const category of categories) {
      const currentCategory = await categoriesRepository.findOneBy({
        name: category
      });

      if (!currentCategory) {
        throw new AppError("Category not found", 404);
      }
      
      categoriesList.push(currentCategory);
    }

    const oldCategories = studyTopic.studyTopicCategories;
    
    for (const category of oldCategories) {
      const currentCategory = await studyTopicCategoryRepository.findOneBy({
        category: category.category
      });
    
      if (!currentCategory) {
        throw new AppError("Category not found", 404);
      }
  
      oldCategoriesList.push(currentCategory);
    }

    oldCategories.forEach(async (category) => {
      await studyTopicCategoryRepository.delete({
        id: category.id
      });
    });

    categoriesList.forEach(async (category) => {
      await studyTopicCategoryRepository.save({
        studyTopic,
        category
      });
    });
  }
  
  await studyTopicRepository.update(id, {
    title
  });

  const findStudyTopic = await studyTopicRepository.findOne({
    where: {
      id
    },
    relations: {
      studyTopicCategories: true,
      lessons: true,
      user: true
    },
  });

  const updatedStudyTopic = {
    id,
    title: title as string,
    description,
    categories: categoriesList,
    lessons: findStudyTopic!.lessons,
    user: findStudyTopic!.user,
    createdAt: findStudyTopic!.createdAt,
    updatedAt: findStudyTopic!.updatedAt
  };

  return updatedStudyTopic;
};

export default updateStudyTopicService;
