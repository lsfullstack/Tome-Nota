import { Request, Response } from "express";
import { ILessonRequest } from "../../interfaces/lessons.interface";
import createLessonService from "../../services/lessons/createLesson.service";
const createLessonController = async(req:Request, res:Response) => {
  const data: ILessonRequest = req.body;
  const studyTopicId: string = req.params.id;
  const createdLesson = await createLessonService(data, studyTopicId);

  return res.status(201).json(createdLesson);
};
export default createLessonController;