import AppDataSource from "../../data-source";
import { ExtraContent } from "../../entities/extraContent.entity";
import { AppError } from "../../errors/AppError";
import {
  IExtraContent,
  IExtraContentUpdate,
} from "../../interfaces/extraContents.interface";

const updateExtraContentService = async (
  id: string,
  data: IExtraContentUpdate
): Promise<IExtraContent> => {
  const { name, link } = data;
  const extraContentRepository = AppDataSource.getRepository(ExtraContent);
  const extraContent = await extraContentRepository.findOneBy({ id });

  if (!extraContent) {
    throw new AppError("Extra content not found", 404);
  }

  const verifyBlockedFields = Object.keys(data).some(
    (e) => e !== "name" && e !== "link"
  );

  if (verifyBlockedFields) {
    throw new AppError("Only the name and link fields can be changed", 401);
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
