import { Request, Response } from "express";
import listParagraphsService from "../../services/paragraphs/listParagraphs.service";

const listParagraphsController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const paragraphId = await listParagraphsService(id);
  
  return res.status(200).json(paragraphId);
};

export default listParagraphsController;
