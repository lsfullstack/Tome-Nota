import { Request, Response } from "express";
import deleteTextService from "../../services/texts/deleteText.service";

const deleteTextController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteTextService(id);
  
  return res.status(204).send();
};

export default deleteTextController;
