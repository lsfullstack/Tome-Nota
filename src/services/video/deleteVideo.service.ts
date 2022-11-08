import AppDataSource from "../../data-source";
import { Video } from "../../entities/video.entity";
import { AppError } from "../../errors/AppError";

const deleteVideoService = async (id: string): Promise<void> => {
  const videoRepository = AppDataSource.getRepository(Video);
  const findVideo = await videoRepository.findOneBy({ id });

  if(!findVideo) {
    throw new AppError("Video not found", 404);
  }

  /* está deletando a lesson junto - Falta corrigir migration - set null? */
  await videoRepository.delete({ id });

};

export default deleteVideoService;