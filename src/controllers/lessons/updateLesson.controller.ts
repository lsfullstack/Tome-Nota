import { Request, Response } from "express";
import updateLessonService from "../../services/lessons/updateLesson.service";

const updateLessonController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedLesson = await updateLessonService(id, name);
  return res.status(200).json(updatedLesson);
};

export default updateLessonController;
