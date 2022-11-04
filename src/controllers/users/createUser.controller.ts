import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users.interfaces";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);

  return res.status(201).json(instanceToPlain(createdUser));
};

export default createUserController;