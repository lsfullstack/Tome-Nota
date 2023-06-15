import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { Video } from "../../entities/video.entity";
import { AppError } from "../../errors/AppError";
import { IVideo } from "../../interfaces/video.interface";

const retrieveVideoService = async (id: string): Promise<IVideo> => {
  const videoRepository = AppDataSource.getRepository(Video);
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const findVideo = await videoRepository.findOneBy({ id });

  if(!findVideo) {
    throw new AppError("Video not found", 404);
  }

  const { name, link } = findVideo;

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

  const video = {
    id,
    name,
    link,
    lesson: {
      id: findLesson.id,
      title: findLesson.title
    }
  };

  return video;
};

export default retrieveVideoService;