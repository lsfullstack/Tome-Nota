import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { StudyTopicCategory } from "../../entities/studyTopicCategory.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { ICategories, IStudyTopic, IStudyTopicRequest } from "../../interfaces/studyTopics.interfaces";

const createStudyTopicService = async (userId: string, { name, categories }: IStudyTopicRequest): Promise<IStudyTopic> => {
  const userRepository = AppDataSource.getRepository(User);
  const categoryRepository = AppDataSource.getRepository(Category);
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const studyTopicCategoryRepository = AppDataSource.getRepository(StudyTopicCategory);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newStudyTopic = studyTopicRepository.create({
    name,
    user
  });
  await studyTopicRepository.save(newStudyTopic);

  const { id, lessons, createdAt, updatedAt } = newStudyTopic;

  const categoriesList: ICategories[] = [];

  for (const category of categories) {
    const currentCategory = await categoryRepository.findOneBy({
      name: category
    });

    if (!currentCategory) {
      throw new AppError("Category not found", 404);
    }

    categoriesList.push(currentCategory);
  }

  categoriesList.forEach(async (category) => {
    await studyTopicCategoryRepository.save({
      studyTopic: newStudyTopic,
      category
    });
  });

  const studyTopic = {
    id,
    name,
    categories: categoriesList,
    lessons,
    user,
    createdAt,
    updatedAt,
  };

  return studyTopic;
};

export default createStudyTopicService;