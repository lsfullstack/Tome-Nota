import { Request, Response } from "express";
import { ITimelineUpdate } from "../../interfaces/timeline.interface";
import updateTimelineService from "../../services/timeline/updateTimeline.service";

const updateTimelineController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: ITimelineUpdate = req.body;
  const timeline = await updateTimelineService(id, data);

  return res.status(200).json(timeline);
};

export default updateTimelineController;
