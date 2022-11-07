import AppDataSource from "../../data-source";
import { ExtraContent } from "../../entities/extraContent.entity";
import { AppError } from "../../errors/AppError";

const deleteExtraContentService = async (id: string): Promise<void> => {
  const extraContentRepository = AppDataSource.getRepository(ExtraContent);
  const extraContent = await extraContentRepository.findOneBy({ id });

  if (!extraContent) {
    throw new AppError("ExtraContent not found", 404);
  }

  await extraContentRepository.delete({ id });
};

export default deleteExtraContentService;
