import { Request, Response } from "express";
import deleteTimelineService from "../../services/timeline/deleteTimeline.service";

const deleteTimelineController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteTimelineService(id);

  return res.status(204).send();
};

export default deleteTimelineController;
