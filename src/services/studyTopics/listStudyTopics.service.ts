import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { IStudyTopicList } from "../../interfaces/studyTopics.interfaces";

const listStudyTopicsService = async (id: string): Promise<IStudyTopicList[]> => {
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const categoryRepository = AppDataSource.getRepository(Category);
  const findStudyTopic = await studyTopicRepository.find({
    where: {
      user: { id },
    },
    relations: {
      user: true,
      lessons: true,
      studyTopicCategories: true
    }
  });

  const returnableArray = [];

  for(const currentStudyTopic of findStudyTopic){
    const { id, title, description, lessons, user, createdAt, updatedAt } = currentStudyTopic;
    const currentStudyTopicCategories = [];
    for(const currentCategory of currentStudyTopic.studyTopicCategories){
      const findCategory = await categoryRepository.findOne({
        where:{
          studyTopicCategories: currentCategory
        }
      });
      currentStudyTopicCategories.push(findCategory?.name);
    }
    const studyTopic = {
      id, 
      title,
      description,
      lessons,
      user, 
      createdAt, 
      updatedAt,
      categories: currentStudyTopicCategories
    };
    returnableArray.push(studyTopic);
  } 

  return returnableArray;
};

export default listStudyTopicsService;
