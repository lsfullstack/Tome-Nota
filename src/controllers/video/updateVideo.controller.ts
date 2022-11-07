import { Request, Response } from "express";
import { IVideoUpdate } from "../../interfaces/video.interface";
import updateVideoService from "../../services/video/updateVideo.service";

const updateVideoController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: IVideoUpdate = req.body;
  const video = await updateVideoService(id, data);

  return res.status(200).json(video);
};

export default updateVideoController;