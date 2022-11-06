import AppDataSource from "../../data-source";
import { StudyTopic } from "../../entities/studyTopic.entity";

const listStudyTopicsService = async (id: string) => {
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);

  const findStudyTopic = await studyTopicRepository.find({
    where: {
      user: { id },
    },
    relations: {
      user: true,
      lessons: true,
    },
  });
  console.log(findStudyTopic);

  return findStudyTopic;
};

export default listStudyTopicsService;
