import { Request, Response } from "express";
import deleteStudyTopicService from "../../services/studyTopics/deleteStudyTopic.service";

const deleteStudyTopicController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteStudyTopicService(id);
  return res.status(204).send();
};

export default deleteStudyTopicController;
