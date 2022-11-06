import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";

const retriveLessonService = async (id: string) => {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const lesson = await lessonRepository.findOne({
    where: {
      id,
    },

    relations: {
      studyTopic: true,
    },
  });

  if (!lesson) {
    throw new AppError("Lesson not found", 404);
  }

  return lesson;
};

export default retriveLessonService;
