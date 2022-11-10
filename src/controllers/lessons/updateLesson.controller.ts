import { Request, Response } from "express";
import { ILessonUpdate } from "../../interfaces/lessons.interface";
import updateLessonService from "../../services/lessons/updateLesson.service";

const updateLessonController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const lesson: ILessonUpdate = req.body;
  const updatedLesson = await updateLessonService(id, lesson);
  
  return res.status(200).json(updatedLesson);
};

export default updateLessonController;
