import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { User } from "../../entities/user.entity";
import { IStudyTopicRequest } from "../../interfaces/studyTopics.interfaces";

const createStudyTopicService = async (userId: string, {name, categories}: IStudyTopicRequest): Promise<IStudyTopicRequest> => {
  
  const studyRepository = AppDataSource.getRepository(StudyTopic);
  const userRepository = AppDataSource.getRepository(User);
  const categoryRepository = AppDataSource.getRepository(Category);

  const user = await userRepository.findOneBy({
    id: userId    
  });

  const categoriesNames: string[] = [];

  categories.forEach(async (eachCategory)  => {
    const category = await categoryRepository.findOneBy({
      name: eachCategory
    });
    
    if(category){
      categoriesNames.push(category.name);
    }
  });

  const newStudyTopic = studyRepository.create({
    user: user!,
    name,
    categories: categoriesNames
  });

  //   await studyRepository.save(newStudyTopic);

  //   return newStudyTopic;
};

export default createStudyTopicService;