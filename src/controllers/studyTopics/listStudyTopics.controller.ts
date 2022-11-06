import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listStudyTopicsService from "../../services/studyTopics/listStudyTopics.service";

const listStudyTopicsController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const studyTopics = await listStudyTopicsService(userId);

  return res.status(200).json(instanceToPlain(studyTopics));
};

export default listStudyTopicsController;
