import AppDataSource from "../../data-source";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { AppError } from "../../errors/AppError";
import { IStudyTopicUpdate } from "../../interfaces/studyTopics.interfaces";

const updateStudyTopicService = async (
  id: string,
  studyTopicBody: IStudyTopicUpdate
) => {
  const { name } = studyTopicBody;

  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);

  const studyTopic = await studyTopicRepository.findOneBy({ id });

  if (!studyTopic) {
    throw new AppError("Study Topic not found", 404);
  }

  await studyTopicRepository.update(id, {
    name,
  });

  const updatedStudyTopic = await studyTopicRepository.findOne({
    where: {
      id,
    },
    relations: {
      studyTopicCategories: true,
      lessons: true,
      user: true,
    },
  });

  return updatedStudyTopic;
};

export default updateStudyTopicService;
