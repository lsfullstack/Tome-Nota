import { Request, Response } from "express";
import { ITimelineRequest } from "../../interfaces/timeline.interface";
import createTimelineService from "../../services/timeline/createTimeline.service";

const createTimelineController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: ITimelineRequest = req.body;
  const timeline = await createTimelineService(id, data);

  return res.status(201).json(timeline);
};

export default createTimelineController;
