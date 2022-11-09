import AppDataSource from "../../data-source";
import { Text } from "../../entities/text.entity";
import { AppError } from "../../errors/AppError";
import { IText, ITextUpdate } from "../../interfaces/texts.interface";

const updateTextService = async (id: string, data: ITextUpdate): Promise<IText> => {
  const { title } = data;
  const textRepository = AppDataSource.getRepository(Text);
  const text = await textRepository.findOneBy({ id });
  const verifyBlockedFields = Object.keys(data).some(e => e !== "title");

  if (verifyBlockedFields) {
    throw new AppError("Only the title field can be changed");
  }

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
