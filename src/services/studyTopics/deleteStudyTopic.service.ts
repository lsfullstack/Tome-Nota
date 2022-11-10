import AppDataSource from "../../data-source";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { AppError } from "../../errors/AppError";

const deleteStudyTopicService = async (id: string): Promise<void> => {
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const findStudyTopic = await studyTopicRepository.findOneBy({ id });

  if (!findStudyTopic) {
    throw new AppError("Study topic not found", 404);
  }

  await studyTopicRepository.delete({ id });
};

export default deleteStudyTopicService;
