import { Request, Response } from "express";
import deleteLessonService from "../../services/lessons/deleteLesson.service";

const deleteLessonController = async (req:Request, res:Response) => {
  const id = req.params.id;
  await deleteLessonService(id);
  return res.status(204).send();
};

export default deleteLessonController;