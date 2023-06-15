import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";
import { ILesson, ILessonUpdate } from "../../interfaces/lessons.interface";

const updateLessonService = async (id: string, lesson: ILessonUpdate): Promise<ILesson> => {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const findLesson = await lessonRepository.findOneBy({ id });
  const verifyBlockedFields = Object.keys(lesson).some(e => e !== "title");

  if (verifyBlockedFields) {
    throw new AppError("Only the title field can be changed");
  }
  
  if (!findLesson) {
    throw new AppError("Lesson not found", 404);
  }

  const { title } = lesson;

  await lessonRepository.update(id, {
    title: title ? title : findLesson.title
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
