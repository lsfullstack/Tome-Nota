import { Request, Response } from "express";
import listLessonsService from "../../services/lessons/listLessons.service";

const listLessonsController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const lessonIdStudyTopic = await listLessonsService(id);
  return res.status(200).json(lessonIdStudyTopic);
};

export default listLessonsController;