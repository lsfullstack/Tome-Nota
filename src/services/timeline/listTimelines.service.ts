import AppDataSource from "../../data-source";
import { Timeline } from "../../entities/timeline.entity";
import { Video } from "../../entities/video.entity";
import { AppError } from "../../errors/AppError";
import { ITimeline } from "../../interfaces/timeline.interface";

const listTimelinesService = async (id: string): Promise<ITimeline[]> => {
  const timelineRepository = AppDataSource.getRepository(Timeline);
  const videoRepository = AppDataSource.getRepository(Video);

  const findVideo = await videoRepository.findOneBy({ id });
  console.log(findVideo);
  if (!findVideo) {
    throw new AppError("Video not found", 404);
  }

  const timelines = await timelineRepository.find({
    where: {
      video: {
        id: findVideo.id,
      },
    },
    relations: {
      video: true,
    },
  });
  console.log(timelines);

  return timelines;
};

export default listTimelinesService;
