import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { StudyTopicCategory } from "../../entities/studyTopicCategory.entity";
import { AppError } from "../../errors/AppError";
import { ICategory } from "../../interfaces/categories.interfaces";
import { IStudyTopic } from "../../interfaces/studyTopics.interfaces";

const retrieveStudyTopicService = async (studyTopicId: string): Promise<IStudyTopic> => {
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const studyCategoryRepository = AppDataSource.getRepository(StudyTopicCategory);
  const categoryRepository = AppDataSource.getRepository(Category);
  const findStudyTopic = await studyTopicRepository.findOne({
    where: {
      id: studyTopicId,
    },
    relations: {
      user: true,
      lessons: true
    }
  });

  if (!findStudyTopic) {
    throw new AppError("Study topic not found", 404);
  }

  const { id, title, description, lessons, user, createdAt, updatedAt } = findStudyTopic;

  const categories = await studyCategoryRepository.find({
    where: {
      studyTopic: {
        id: studyTopicId
      }
    },
    relations: {
      category: true
    }
  });

  const categoriesList: ICategory[] = [];

  for (const category of categories) {
    const currentCategory = await categoryRepository.findOneBy({
      name: category.category.name
    });

    if (!currentCategory) {
      throw new AppError("Category not found", 404);
    }

    categoriesList.push(currentCategory);
  }

  const studyTopic = {
    id,
    title,
    description,
    categories: categoriesList,
    lessons,
    user,
    createdAt,
    updatedAt
  };

  return studyTopic;
};

export default retrieveStudyTopicService;
