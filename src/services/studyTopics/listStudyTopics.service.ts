import AppDataSource from "../../data-source";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { IStudyTopic } from "../../interfaces/studyTopics.interfaces";

const listStudyTopicsService = async (id: string): Promise<IStudyTopic[]> => {
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const findStudyTopic = await studyTopicRepository.find({
    where: {
      user: { id },
    },
    relations: {
      user: true,
      lessons: true
    }
  });

  return findStudyTopic;
};

export default listStudyTopicsService;
