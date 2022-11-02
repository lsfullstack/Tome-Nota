import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users.interfaces";
import createUserService from "../services/createUser.service";

const createUserController = async (req: Request, res: Response) => {
    console.log(req.body)
    const user: IUserRequest = req.body
    const createdUser = await createUserService(user)

    return res.status(201).json(instanceToPlain(createdUser))
}

export default createUserController 