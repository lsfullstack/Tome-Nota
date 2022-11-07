import { Request, Response } from "express";
import deleteVideoService from "../../services/video/deleteVideo.service";

const deleteVideoController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteVideoService(id);

  return res.status(204).send();
};

export default deleteVideoController;