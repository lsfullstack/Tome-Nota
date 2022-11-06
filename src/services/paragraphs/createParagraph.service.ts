import AppDataSource from "../../data-source";
import { Paragraph } from "../../entities/paragraph.entity";
import { Text } from "../../entities/text.entity";
import { AppError } from "../../errors/AppError";
import {
  IParagraph,
  IParagraphRequest,
} from "../../interfaces/paragraphs.interface";

const createParagraphService = async ({ description }: IParagraphRequest, textId: string): Promise<IParagraph> => {
  const paragraphRepository = AppDataSource.getRepository(Paragraph);
  const textRepository = AppDataSource.getRepository(Text);
  const text = await textRepository.findOneBy({
    id: textId,
  });

  if (!text) {
    throw new AppError("Text not found");
  }

  const newParagraph = paragraphRepository.create({
    description,
    text,
  });

  await paragraphRepository.save(newParagraph);

  return newParagraph;
};

export default createParagraphService;
