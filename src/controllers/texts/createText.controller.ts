import { Request, Response } from "express";
import { ITextRequest } from "../../interfaces/texts.interface";
import createTextService from "../../services/texts/createText.service";

const createTextController = async (req: Request, res: Response) => {
  const data: ITextRequest = req.body;
  const lessonId: string = req.params.id;
  const createdText = await createTextService(data, lessonId);

  return res.status(201).json(createdText);
};
export default createTextController;
