import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { Video } from "../../entities/video.entity";
import { AppError } from "../../errors/AppError";
import { IVideo, IVideoRequest } from "../../interfaces/video.interface";
import AWS from "aws-sdk";
import * as fs from "fs";

const createVideoService = async (id: string,{name, link}: IVideoRequest): Promise<IVideo> => {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const videoRepository = AppDataSource.getRepository(Video);
  const findLesson = await lessonRepository.findOneBy({
    id
  });
  
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const fileName = link;
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: fileContent
  };

  let linkReturn = "";

  const savedData = s3.upload(params);

  try{
    const putObjectPromise = await savedData.promise();
    linkReturn = putObjectPromise.Location;
    console.log("@@@@@@", putObjectPromise);
  }
  catch(err) {
    console.log("%%%%%%", err);
  }

  if(!findLesson) {
    throw new AppError("Lesson not found", 404);
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
    link: linkReturn,
    lesson: {
      id: findLesson.id,
      name: findLesson.name
    }
  };

  return newVideo;
};

export default createVideoService;