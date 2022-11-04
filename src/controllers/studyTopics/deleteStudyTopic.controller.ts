import { Request, Response } from "express";
import deleteStudyTopicService from "../../services/studyTopics/deleteStudyTopic.service";

const deleteStudyTopicController = async (req: Request, res: Response) => {
  const studyTopicId: string = req.params.id;
  console.log(studyTopicId);
  await deleteStudyTopicService(studyTopicId);

  return res.status(204).send();
};

export default deleteStudyTopicController;