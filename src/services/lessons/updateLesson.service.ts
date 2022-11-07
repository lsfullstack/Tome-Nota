import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";
import { ILesson } from "../../interfaces/lessons.interface";

const updateLessonService = async (id: string, name: string): Promise<ILesson> => {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const lesson = await lessonRepository.findOneBy({ id });

  if (!lesson) {
    throw new AppError("Lesson not found", 404);
  }

  await lessonRepository.update(id, {
    name,
  });

  const updatedLesson = await lessonRepository.findOne({
    where: {
      id,
    },
    relations: {
      studyTopic: true,
    },
  });

  return updatedLesson!;
};

export default updateLessonService;
