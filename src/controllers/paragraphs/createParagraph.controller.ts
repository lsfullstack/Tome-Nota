import { Request, Response } from "express";
import { IParagraphRequest } from "../../interfaces/paragraphs.interface";
import createParagraphService from "../../services/paragraphs/createParagraph.service";

const createParagraphController = async (req: Request, res: Response) => {
  const data: IParagraphRequest = req.body;
  const lessonId: string = req.params.id;
  const createdParagraph = await createParagraphService(data, lessonId);

  return res.status(201).json(createdParagraph);
};
export default createParagraphController;
