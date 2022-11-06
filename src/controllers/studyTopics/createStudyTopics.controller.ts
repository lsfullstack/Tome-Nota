import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IStudyTopicRequest } from "../../interfaces/studyTopics.interfaces";
import createStudyTopicService from "../../services/studyTopics/createStudyTopics.service";

const createStudyTopicController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const studyTopic: IStudyTopicRequest = req.body;
  const createdStudyTopic = await createStudyTopicService(userId, studyTopic);

  return res.status(201).json(instanceToPlain(createdStudyTopic));
};

export default createStudyTopicController;