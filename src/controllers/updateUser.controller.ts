import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import updateUserService from "../services/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
    const isAdm = req.user.isAdm
    const idTargetUser  = req.params.id
    const user = req.body
    const idLoggedUser = req.user.id

    const updatedUser = await updateUserService(isAdm, idTargetUser, user, idLoggedUser);

    return res.status(200).json(instanceToPlain(updatedUser));  
};

export default updateUserController