import { Request, Response } from "express";
import updateStudyTopicService from "../../services/studyTopics/updateStudyTopic.service";

const updateStudyTopicController = async (req: Request, res: Response) => {
  const studyTopic = req.body;
  const studyTopicId: string = req.params.id;

  const updatedStudyTopic = await updateStudyTopicService(studyTopic, studyTopicId);

  return res.status(200).json(updatedStudyTopic);
};

export default updateStudyTopicController;