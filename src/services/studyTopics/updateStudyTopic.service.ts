import { CustomRepositoryCannotInheritRepositoryError } from "typeorm";
import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { StudyTopicCategory } from "../../entities/studyTopicCategory.entity";
import { AppError } from "../../errors/AppError";

const updateStudyTopicService = async (studyTopic: any, id: string) => {
  const {name, category} = studyTopic;
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const categoryRepository = AppDataSource.getRepository(Category);
  const studyTopicCategoryRepository = AppDataSource.getRepository(StudyTopicCategory);
  
  const verifyBlockedFields = Object.keys(studyTopic).some(e => e === "lessons" || e === "id" || e === "user" || e === "createdAt" || e === "updatedAt");
  
  if(verifyBlockedFields){
    throw new AppError("Fields isAdm, id and isActive cannot be changed", 401);
  }
  
  const findStudyTopic = await studyTopicRepository.find({
    where: {
      id
    },
    relations: {
      studyTopicCategories: true
    }
  });

  const findStudyTopicCategory = await studyTopicCategoryRepository.find({
    where:{
      studyTopic:{id}
    },
    // relations:{
    //   category: true,
    //   studyTopic: true
    // }
  });

  if(!findStudyTopic){
    throw new AppError("Study topic not found", 404);
  }

  const newCategories = [];

  for(const categoryName of category){
    const findCategory = await categoryRepository.find({
      where: {
        name: categoryName
      }
    });

    newCategories.push(findCategory);
  }

  // for(const pivotData of findStudyTopicCategory){
  //   await studyTopicCategoryRepository.delete(pivotData);
  // }

  newCategories.forEach((elem, index) => {
    // console.log(elem[0]);
    // studyTopicCategoryRepository.create({
    //   category: elem[0]
    // });
  });
  console.log(findStudyTopicCategory[0].id);
  console.log(newCategories);

  for(const newData of newCategories){
    // console.log(newData);
    console.log(newData[0]);
    await studyTopicCategoryRepository.save({
      studyTopic: findStudyTopicCategory[0],
      category: newData[0]
    });
  }

  // if(name){
  //   await studyTopicRepository.update(
  //     id,
  //     {
  //       name,
  //     }
  //   );
  // }

  const updatedStudyTopic = await studyTopicRepository.findOneBy({
    id
  });

  return updatedStudyTopic;
};

export default updateStudyTopicService;