import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import retrieveStudyTopicService from "../../services/studyTopics/retrieveStudyTopic.service";

const retrieveStudyTopicController = async (req: Request, res: Response) => {
  const studyTopicId: string = req.params.id;
  const studyTopic = await retrieveStudyTopicService(studyTopicId);

  return res.status(200).json(instanceToPlain(studyTopic));
};

export default retrieveStudyTopicController;