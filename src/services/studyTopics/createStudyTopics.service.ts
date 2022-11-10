import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { StudyTopicCategory } from "../../entities/studyTopicCategory.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { ICategory } from "../../interfaces/categories.interfaces";
import { IStudyTopic, IStudyTopicRequest } from "../../interfaces/studyTopics.interfaces";

const createStudyTopicService = async (userId: string, data: IStudyTopicRequest): Promise<IStudyTopic> => {
  const { name, categories } = data;
  const userRepository = AppDataSource.getRepository(User);
  const categoryRepository = AppDataSource.getRepository(Category);
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const studyTopicCategoryRepository = AppDataSource.getRepository(StudyTopicCategory);
  const user = await userRepository.findOneBy({ id: userId });

  const verifyBlockedFields = Object.keys(data).some(e => e !== "name" && e !== "categories");

  if (verifyBlockedFields) {
    throw new AppError("Only the name and categories fields can be send");
  }

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newStudyTopic = studyTopicRepository.create({
    name,
    lessons: [],
    user: user
  });
  await studyTopicRepository.save(newStudyTopic);

  const { id, lessons, createdAt, updatedAt } = newStudyTopic;

  const categoriesList: ICategory[] = [];

  if (categories && categories.length > 0) {
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
  }

  const studyTopic = {
    id,
    name,
    categories: categoriesList,
    lessons,
    user,
    createdAt,
    updatedAt
  };

  return studyTopic;
};

export default createStudyTopicService;
