import { Request, Response } from "express";
import listTextsService from "../../services/texts/listTexts.service";

const listTextsController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const textIdStudyTopic = await listTextsService(id);
  
  return res.status(200).json(textIdStudyTopic);
};

export default listTextsController;
