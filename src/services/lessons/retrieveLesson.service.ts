import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";
import { ILesson } from "../../interfaces/lessons.interface";

const retriveLessonService = async (id: string): Promise<ILesson> => {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const lesson = await lessonRepository.findOne({
    where: {
      id
    },
    relations: {
      studyTopic: true
    }
  });

  if (!lesson) {
    throw new AppError("Lesson not found", 404);
  }

  return lesson;
};

export default retriveLessonService;
