import AppDataSource from "../../data-source";
import { Video } from "../../entities/video.entity";
import { Timeline } from "../../entities/timeline.entity";
import { AppError } from "../../errors/AppError";
import {
  ITimeline,
  ITimelineUpdate,
} from "../../interfaces/timeline.interface";

const updateTimelineService = async (
  id: string,
  data: ITimelineUpdate
): Promise<ITimeline> => {
  const videoRepository = AppDataSource.getRepository(Video);
  const timelineRepository = AppDataSource.getRepository(Timeline);
  const findTimeline = await timelineRepository.findOneBy({ id });
  const { time, description } = data;
  const verifyBlockedFields = Object.keys(data).some(
    (e) => e !== "time" && e !== "description"
  );

  if (verifyBlockedFields) {
    throw new AppError(
      "Only the time and description fields can be changed",
      401
    );
  }
  if (!findTimeline) {
    throw new AppError("Chapter not found", 404);
  }

  const findVideo = await videoRepository.findOne({
    where: {
      timelines: { id },
    },
  });

  if (!findVideo) {
    throw new AppError("Video not found", 404);
  }

  await timelineRepository.update(id, {
    time,
    description,
  });

  const timeline = await timelineRepository.findOneBy({ id });

  if (!timeline) {
    throw new AppError("Timeline not found", 404);
  }

  const updatedTimeline = {
    id: timeline.id,
    time: timeline.time,
    description: timeline.description,
    video: {
      id: findVideo.id,
    },
  };

  return updatedTimeline;
};

export default updateTimelineService;
