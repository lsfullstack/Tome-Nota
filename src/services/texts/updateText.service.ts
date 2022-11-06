import AppDataSource from "../../data-source";
import { Text } from "../../entities/text.entity";
import { AppError } from "../../errors/AppError";
import { IText } from "../../interfaces/texts.interface";

const updateTextService = async (id: string, title: string): Promise<IText> => {
  const textRepository = AppDataSource.getRepository(Text);
  const text = await textRepository.findOneBy({ id });

  if (!text) {
    throw new AppError("Text not found", 404);
  }

  await textRepository.update(id, {
    title
  });

  const updatedText = await textRepository.findOne({
    where: {
      id,
    },
    relations: {
      paragraphs: true,
      lesson: true
    }
  });

  return updatedText!;
};

export default updateTextService;
