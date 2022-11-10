import { Request, Response } from "express";
import { IExtraContentUpdate } from "../../interfaces/extraContents.interface";
import updateExtraContentService from "../../services/extraContents/updateExtraContent.service";

const updateExtraContentController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: IExtraContentUpdate = req.body;
  const updatedExtraContent = await updateExtraContentService(id, data);
  
  return res.status(200).json(updatedExtraContent);
};

export default updateExtraContentController;
