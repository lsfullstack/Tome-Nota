import AppDataSource from "../../data-source";
import { ExtraContent } from "../../entities/extraContent.entity";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";
import { IExtraContent } from "../../interfaces/extraContents.interface";

const listExtraContentsService = async (
  id: string
): Promise<IExtraContent[]> => {
  const extraContentRepository = AppDataSource.getRepository(ExtraContent);
  const studyTopicRepository = AppDataSource.getRepository(Lesson);

  const findLesson = await studyTopicRepository.findOneBy({ id });

  if (!findLesson) {
    throw new AppError("Lesson not found", 404);
  }

  const extraContents = await extraContentRepository.find({
    where: {
      lesson: {
        id: findLesson.id,
      },
    },
    relations: {
      lesson: true,
    },
  });

  return extraContents;
};

export default listExtraContentsService;
