import AppDataSource from "../../data-source";
import { Paragraph } from "../../entities/paragraph.entity";
import { AppError } from "../../errors/AppError";
import { IParagraph, IParagraphUpdate } from "../../interfaces/paragraphs.interface";

const updateParagraphService = async (id: string, data: IParagraphUpdate): Promise<IParagraph> => {
  const { description } = data;
  const paragraphRepository = AppDataSource.getRepository(Paragraph);
  const paragraph = await paragraphRepository.findOneBy({ id });
  const verifyBlockedFields = Object.keys(data).some(e => e !== "description");

  if (verifyBlockedFields) {
    throw new AppError("Only the description field can be send", 401);
  }
  if (!paragraph) {
    throw new AppError("Paragraph not found", 404);
  }

  await paragraphRepository.update(id, {
    description
  });

  const updatedParagraph = await paragraphRepository.findOne({
    where: {
      id
    },
    relations: {
      text: true
    }
  });

  return updatedParagraph!;
};

export default updateParagraphService;
