import AppDataSource from "../../data-source";
import { Timeline } from "../../entities/timeline.entity";
import { AppError } from "../../errors/AppError";

const deleteTimelineService = async (id: string): Promise<void> => {
  const timelineRepository = AppDataSource.getRepository(Timeline);
  const findTimeline = await timelineRepository.findOneBy({ id });

  if (!findTimeline) {
    throw new AppError("Chapter not found", 404);
  }

  await timelineRepository.delete({ id });
};

export default deleteTimelineService;
