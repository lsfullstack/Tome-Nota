import AppDataSource from "../../data-source";
import { ExtraContent } from "../../entities/extraContent.entity";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";
import {
  IExtraContent,
  IExtraContentRequest,
} from "../../interfaces/extraContents.interface";

const createExtraContentService = async (
  { name, link }: IExtraContentRequest,
  lessonId: string
): Promise<IExtraContent> => {
  const extraContentRepository = AppDataSource.getRepository(ExtraContent);
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const lesson = await lessonRepository.findOneBy({
    id: lessonId,
  });

  if (!lesson) {
    throw new AppError("Study topic not found", 404);
  }

  const newExtraContent = extraContentRepository.create({
    name,
    link,
    lesson,
  });

  await extraContentRepository.save(newExtraContent);

  return newExtraContent;
};

export default createExtraContentService;
