import AppDataSource from "../../data-source";
import { Video } from "../../entities/video.entity";
import { Timeline } from "../../entities/timeline.entity";
import { AppError } from "../../errors/AppError";
import {
  ITimeline,
  ITimelineRequest,
} from "../../interfaces/timeline.interface";

const createTimelineService = async (
  id: string,
  data: ITimelineRequest
): Promise<ITimeline> => {
  const { time, description } = data;
  const videoRepository = AppDataSource.getRepository(Video);
  const timelineRepository = AppDataSource.getRepository(Timeline);
  const findVideo = await videoRepository.findOneBy({
    id,
  });

  if (!findVideo) {
    throw new AppError("Video not found", 404);
  }

  if (!time || !description) {
    throw new AppError("Time and description are required fields", 401);
  }

  const timeline = timelineRepository.create({
    time,
    description: `${time} - ${description}`,
    video: findVideo,
  });

  await timelineRepository.save(timeline);

  const newTimeline = {
    id: timeline.id,
    time,
    description,
    video: {
      id: findVideo.id,
      name: findVideo.name,
      link: findVideo.link,
    },
  };

  return newTimeline;
};

export default createTimelineService;
