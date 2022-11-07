import AppDataSource from "../../data-source";
import { ExtraContent } from "../../entities/extraContent.entity";
import { AppError } from "../../errors/AppError";
import { IExtraContent } from "../../interfaces/extraContents.interface";

const updateExtraContentService = async (
  id: string,
  name: string,
  link: string
): Promise<IExtraContent> => {
  const extraContentRepository = AppDataSource.getRepository(ExtraContent);
  const extraContent = await extraContentRepository.findOneBy({ id });

  if (!extraContent) {
    throw new AppError("ExtraContent not found", 404);
  }

  await extraContentRepository.update(id, {
    name,
    link,
  });

  const updatedExtraContent = await extraContentRepository.findOne({
    where: {
      id,
    },
    relations: {
      lesson: true,
    },
  });

  return updatedExtraContent!;
};

export default updateExtraContentService;
