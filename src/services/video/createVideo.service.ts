import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { Video } from "../../entities/video.entity";
import { AppError } from "../../errors/AppError";
import { IVideo, IVideoRequest } from "../../interfaces/video.interface";

const createVideoService = async (id: string, data: IVideoRequest): Promise<IVideo> => {
  const { name, link } = data;
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const videoRepository = AppDataSource.getRepository(Video);
  const findLesson = await lessonRepository.findOneBy({
    id
  });

  if(!findLesson) {
    throw new AppError("Lesson not found", 404);
  }

  const verifyBlockedFields = Object.keys(data).some(
    (e) => e !== "name" && e !== "link"
  );

  if (verifyBlockedFields) {
    throw new AppError("Only the name and link can be send");
  }

  const video = videoRepository.create({
    name,
    link
  });

  await videoRepository.save(video);
  await lessonRepository.update(
    id, 
    {
      video
    }
  );

  const newVideo = {
    id: video.id,
    name,
    link,
    lesson: {
      id: findLesson.id,
      name: findLesson.name
    }
  };

  return newVideo;
};

export default createVideoService;