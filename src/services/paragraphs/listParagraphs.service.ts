import AppDataSource from "../../data-source";
import { Paragraph } from "../../entities/paragraph.entity";
import { Text } from "../../entities/text.entity";
import { AppError } from "../../errors/AppError";

const listParagraphsService = async (id: string) => {
  const paragraphRepository = AppDataSource.getRepository(Paragraph);
  const textRepository = AppDataSource.getRepository(Text);

  const findText = await textRepository.findOneBy({ id });

  if (!findText) {
    throw new AppError("Text not found", 404);
  }

  const paragraphs = await paragraphRepository.find({
    where: {
      text: {
        id: findText.id,
      },
    },
    relations: {
      text: true,
    },
  });

  return paragraphs;
};

export default listParagraphsService;
