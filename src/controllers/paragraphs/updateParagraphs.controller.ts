import { Request, Response } from "express";
import updateParagraphService from "../../services/paragraphs/updateParagraph.service";

const updateParagraphController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description } = req.body;
  const updatedParagraph = await updateParagraphService(id, description);
  return res.status(200).json(updatedParagraph);
};

export default updateParagraphController;
