import AppDataSource from "../../data-source";
import { Paragraph } from "../../entities/paragraph.entity";
import { Text } from "../../entities/text.entity";
import { AppError } from "../../errors/AppError";
import {
  IParagraph,
  IParagraphRequest,
} from "../../interfaces/paragraphs.interface";

const createParagraphService = async (data: IParagraphRequest, textId: string): Promise<IParagraph> => {
  const { description } = data;
  const paragraphRepository = AppDataSource.getRepository(Paragraph);
  const textRepository = AppDataSource.getRepository(Text);
  const text = await textRepository.findOneBy({
    id: textId,
  });

  const verifyBlockedFields = Object.keys(data).some(e => e !== "description");

  if (verifyBlockedFields) {
    throw new AppError("Only the description field can be send", 401);
  }

  if (!text) {
    throw new AppError("Text not found", 404);
  }

  const newParagraph = paragraphRepository.create({
    description,
    text,
  });

  await paragraphRepository.save(newParagraph);

  return newParagraph;
};

export default createParagraphService;
