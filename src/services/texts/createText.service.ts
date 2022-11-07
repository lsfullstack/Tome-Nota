import AppDataSource from "../../data-source";
import { Text } from "../../entities/text.entity";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";
import { IText, ITextRequest } from "../../interfaces/texts.interface";

const createTextService = async ({ title }: ITextRequest, lessonId: string): Promise<IText> => {
  const textRepository = AppDataSource.getRepository(Text);
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const lesson = await lessonRepository.findOneBy({
    id: lessonId
  });

  if (!lesson) {
    throw new AppError("Lesson not found", 404);
  }

  const newText = textRepository.create({
    title,
    paragraphs: [],
    lesson,
  });

  await textRepository.save(newText);

  return newText;
};

export default createTextService;
