import AppDataSource from "../../data-source";
import { Text } from "../../entities/text.entity";
import { Lesson } from "../../entities/lesson.entity";
import { AppError } from "../../errors/AppError";

const listTextsService = async (id: string) => {
  const textRepository = AppDataSource.getRepository(Text);
  const studyTopicRepository = AppDataSource.getRepository(Lesson);

  const findLesson = await studyTopicRepository.findOneBy({ id });

  if (!findLesson) {
    throw new AppError("Lesson not found", 404);
  }

  const texts = await textRepository.find({
    where: {
      lesson: {
        id: findLesson.id,
      },
    },
    relations: {
      paragraphs: true,
      lesson: true,
    },
  });

  return texts;
};

export default listTextsService;
