import { Request, Response } from "express";
import listExtraContentsService from "../../services/extraContents/listExtraContents.service";

const listExtraContentsController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const extraContentIdStudyTopic = await listExtraContentsService(id);
  
  return res.status(200).json(extraContentIdStudyTopic);
};

export default listExtraContentsController;
