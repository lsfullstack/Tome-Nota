import { Request, Response } from "express";
import deleteExtraContentService from "../../services/extraContents/deleteExtraContent.service";

const deleteExtraContentController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteExtraContentService(id);

  return res.status(204).send();
};

export default deleteExtraContentController;
