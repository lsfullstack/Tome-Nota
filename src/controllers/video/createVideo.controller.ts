import { Request, Response } from "express";
import { IVideoRequest } from "../../interfaces/video.interface";
import createVideoService from "../../services/video/createVideo.service";

const createVideoController = async(req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: IVideoRequest = req.body;
  const video = await createVideoService(id, data);

  return res.status(201).json(video);
};

export default createVideoController;