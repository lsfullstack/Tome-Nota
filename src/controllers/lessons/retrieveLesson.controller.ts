import { Request, Response } from "express";
import retriveLessonService from "../../services/lessons/retrieveLesson.service";

const retriveLessonController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const lessonId = await retriveLessonService(id);

  return res.status(200).json(lessonId);
};

export default retriveLessonController;
