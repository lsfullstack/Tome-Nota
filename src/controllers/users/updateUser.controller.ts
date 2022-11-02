import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserUpdate } from "../../interfaces/users.interfaces";
import updateUserService from "../../services/users/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
    const isAdm: boolean = req.user.isAdm;
    const idTargetUser: string = req.params.id;
    const user: IUserUpdate = req.body;
    const idLoggedUser: string = req.user.id;

    const updatedUser = await updateUserService(isAdm, idTargetUser, user, idLoggedUser);

    return res.status(200).json(instanceToPlain(updatedUser));  
};

export default updateUserController;