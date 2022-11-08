import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IStudyTopicUpdate } from "../../interfaces/studyTopics.interfaces";
import updateStudyTopicService from "../../services/studyTopics/updateStudyTopic.service";

const updateStudyTopicController = async (req: Request, res: Response) => {
  const studyTopicId: string = req.params.id;
  const studyTopic: IStudyTopicUpdate = req.body;

  const updatedStudyTopic = await updateStudyTopicService(
    studyTopicId,
    studyTopic
  );

  return res.status(200).json(instanceToPlain(updatedStudyTopic));
};

export default updateStudyTopicController;
