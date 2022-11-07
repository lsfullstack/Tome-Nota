import AppDataSource from "../../data-source";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { AppError } from "../../errors/AppError";
import { IStudyTopic, IStudyTopicUpdate } from "../../interfaces/studyTopics.interfaces";

const updateStudyTopicService = async (id: string, studyTopicBody: IStudyTopicUpdate
): Promise<IStudyTopic> => {
  const { name } = studyTopicBody;
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);
  const studyTopic = await studyTopicRepository.findOneBy({ id });
  const verifyBlockedFields = Object.keys(studyTopicBody).some(e => e === "id" || e === "createdAt" || e === "updatedAt" || e === "user" || e === "lessons");

  if (verifyBlockedFields) {
    throw new AppError("Only the name and categories fields can be changed", 401);
  }

  if (!studyTopic) {
    throw new AppError("Study topic not found", 404);
  }

  await studyTopicRepository.update(id, {
    name
  });

  const updatedStudyTopic = await studyTopicRepository.findOne({
    where: {
      id
    },
    relations: {
      studyTopicCategories: true,
      lessons: true,
      user: true
    },
  });

  return updatedStudyTopic!;
};

export default updateStudyTopicService;
