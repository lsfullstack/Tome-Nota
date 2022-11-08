import AppDataSource from "../../data-source";
import { ExtraContent } from "../../entities/extraContent.entity";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";
import {
  IExtraContent,
  IExtraContentRequest,
} from "../../interfaces/extraContents.interface";

const createExtraContentService = async (
  data: IExtraContentRequest,
  lessonId: string
): Promise<IExtraContent> => {
  const { name, link } = data;
  const extraContentRepository = AppDataSource.getRepository(ExtraContent);
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const lesson = await lessonRepository.findOneBy({
    id: lessonId,
  });

  if (!lesson) {
    throw new AppError("Lesson not found", 404);
  }

  const verifyBlockedFields = Object.keys(data).some(
    (e) => e !== "name" && e !== "link"
  );

  if (verifyBlockedFields) {
    throw new AppError("Only the name and link fields can be send", 401);
  }

  if (!name || !link) {
    throw new AppError("Name and link are required fields", 401);
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
