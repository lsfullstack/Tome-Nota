import { Request, Response } from "express";
import { IParagraphUpdate } from "../../interfaces/paragraphs.interface";
import updateParagraphService from "../../services/paragraphs/updateParagraph.service";

const updateParagraphController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: IParagraphUpdate = req.body;
  const updatedParagraph = await updateParagraphService(id, data);
  return res.status(200).json(updatedParagraph);
};

export default updateParagraphController;
