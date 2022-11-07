import { Request, Response } from "express";
import { IExtraContentRequest } from "../../interfaces/extraContents.interface";
import createExtraContentService from "../../services/extraContents/createExtraContent.service";
const createExtraContentController = async (req: Request, res: Response) => {
  const data: IExtraContentRequest = req.body;
  const lessonId: string = req.params.id;
  const createdExtraContent = await createExtraContentService(data, lessonId);

  return res.status(201).json(createdExtraContent);
};
export default createExtraContentController;
