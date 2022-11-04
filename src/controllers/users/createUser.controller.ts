<<<<<<< HEAD
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users.interfaces";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);

  return res.status(201).json(instanceToPlain(createdUser));
};

=======
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users.interfaces";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);

  return res.status(201).json(instanceToPlain(createdUser));
};

>>>>>>> ff75967 (feat: studyTopics incomplete)
export default createUserController;