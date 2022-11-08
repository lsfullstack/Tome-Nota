import { Request, Response } from "express";
import deleteParagraphService from "../../services/paragraphs/deleteParagraph.service";

const deleteParagraphController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteParagraphService(id);
  
  return res.status(204).send();
};

export default deleteParagraphController;
