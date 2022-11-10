import AppDataSource from "../../data-source";
import { Text } from "../../entities/text.entity";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";
import { IText, ITextRequest } from "../../interfaces/texts.interface";

const createTextService = async (data: ITextRequest, lessonId: string): Promise<IText> => {
  const { title } = data;
  const textRepository = AppDataSource.getRepository(Text);
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const lesson = await lessonRepository.findOneBy({
    id: lessonId
  });

  const verifyBlockedFields = Object.keys(data).some(e => e !== "title");

  if (verifyBlockedFields) {
    throw new AppError("Only the title field can be send");
  }

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
