import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { StudyTopic } from "../../entities/studyTopic.entity";
import { AppError } from "../../errors/AppError";
import { ILesson } from "../../interfaces/lessons.interface";

const listLessonsService = async (id: string): Promise<ILesson[]> => {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const studyTopicRepository = AppDataSource.getRepository(StudyTopic);

  const findStudyTopic = await studyTopicRepository.findOneBy({ id });

  if (!findStudyTopic) {
    throw new AppError("Study topic not found", 404);
  }

  const lessons = await lessonRepository.find({
    where: {
      studyTopic: {
        id: findStudyTopic.id,
      },
    },
    relations: {
      studyTopic: true,
    },
  });

  return lessons;
};

export default listLessonsService;
