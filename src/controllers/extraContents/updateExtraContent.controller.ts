import { Request, Response } from "express";
import updateExtraContentService from "../../services/extraContents/updateExtraContent.service";

const updateExtraContentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, link } = req.body;
  const updatedExtraContent = await updateExtraContentService(id, name, link);
  return res.status(200).json(updatedExtraContent);
};

export default updateExtraContentController;
