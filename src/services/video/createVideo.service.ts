import AppDataSource from "../../data-source";
import { Lesson } from "../../entities/lesson.entity";
import { Video } from "../../entities/video.entity";
import { AppError } from "../../errors/AppError";
import { IVideo, IVideoRequest } from "../../interfaces/video.interface";
import AWS from "aws-sdk";
import * as fs from "fs";
import { ManagedUpload } from "aws-sdk/clients/s3";

const createVideoService = async (id: string,{name, link}: IVideoRequest): Promise<IVideo> => {
  const lessonRepository = AppDataSource.getRepository(Lesson);
  const videoRepository = AppDataSource.getRepository(Video);
  const findLesson = await lessonRepository.findOneBy({
    id
  });
  ///////////////////
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const fileName = "/home/felipe/Downloads/Node.js __ Dicionário do Programador.m4a";
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: fileContent
  };

  let linkReturn = "";

  const savedData = s3.upload(params, async (err: any, data: any) => {
    await console.log("@@@@@@", err, data.Location);
    linkReturn = data.Location;
  });

  console.log("######", `https://tome-nota.s3.sa-east-1.amazonaws.com/${fileName}`);

  //////////////////
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