import { Request, Response } from "express";
import { ITextUpdate } from "../../interfaces/texts.interface";
import updateTextService from "../../services/texts/updateText.service";

const updateTextController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: ITextUpdate = req.body;
  const updatedText = await updateTextService(id, data);
  return res.status(200).json(updatedText);
};

export default updateTextController;
