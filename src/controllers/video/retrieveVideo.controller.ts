import { Request, Response } from "express";
import { IVideo } from "../../interfaces/video.interface";
import retrieveVideoService from "../../services/video/retrieveVideo.service";

const retrieveVideoController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const video: IVideo = await retrieveVideoService(id);

  return res.status(200).json(video);
};

export default retrieveVideoController;