import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { Video } from "../../entities/video.entity";
import { AppError } from "../../errors/AppError";
import { IVideo, IVideoUpdate } from "../../interfaces/video.interface";

const updateVideoService = async (id: string, data: IVideoUpdate): Promise<IVideo>=> {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const videoRepository = AppDataSource.getRepository(Video);
  const findVideo = await videoRepository.findOneBy({ id });
  const { name, link } = data;
  const verifyBlockedFields = Object.keys(data).some(e => e !== "name" && e !== "link");

  if (verifyBlockedFields) {
    throw new AppError("Only the name and link fields can be changed");
  }
  
  if(!findVideo) {
    throw new AppError("Video not found", 404);
  }

  const findLesson = await lessonRepository.findOne({
    where: {
      video: {
        id
      }
    }
  });

  if(!findLesson) {
    throw new AppError("Lesson not found", 404);
  }

  await videoRepository.update(
    id,
    {
      name,
      link
    }
  );

  const video = await videoRepository.findOneBy({ id });

  if(!video) {
    throw new AppError("Video not found", 404);
  }

  const updatedVideo = {
    id: video.id,
    name: video.name,
    link: video.link,
    lesson: {
      id: findLesson.id,
      title: findLesson.title
    }
  };

  return updatedVideo;
};

export default updateVideoService;