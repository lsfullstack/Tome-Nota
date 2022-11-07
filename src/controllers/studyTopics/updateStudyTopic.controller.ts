import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import updateStudyTopicService from "../../services/studyTopics/updateStudyTopic.service";

const updateStudyTopicController = async (req: Request, res: Response) => {
  const studyTopicId = req.params.id;
  const studyTopic = req.body;

  const updatedStudyTopic = await updateStudyTopicService(
    studyTopicId,
    studyTopic
  );

  return res.status(200).json(instanceToPlain(updatedStudyTopic));
};

export default updateStudyTopicController;
