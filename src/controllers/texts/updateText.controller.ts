import { Request, Response } from "express";
import updateTextService from "../../services/texts/updateText.service";

const updateTextController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const updatedText = await updateTextService(id, title);
  return res.status(200).json(updatedText);
};

export default updateTextController;
