import { Request, Response } from "express";
import listTimelinesService from "../../services/timeline/listTimelines.service";

const listTimelineController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const timeline = await listTimelinesService(id);

  return res.status(200).json(timeline);
};

export default listTimelineController;
