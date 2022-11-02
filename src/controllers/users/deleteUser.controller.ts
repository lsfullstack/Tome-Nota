import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
    const isAdm: boolean = req.user.isAdm;
    const idTargetUser: string = req.params.id;
    const idLoggedUser: string = req.user.id;

    await deleteUserService(isAdm, idTargetUser, idLoggedUser);

    return res.status(204).send();
};

export default deleteUserController;