import { Request, Response } from "express";
import deleteUserService from "../services/deleteUser.service";

const deleteUserController = async (req: Request, res: Response)=> {
    const isAdm = req.user.isAdm    
    const idTargetUser  = req.params.id
    const idLoggedUser = req.user.id

    const deletedUser = await deleteUserService(isAdm, idTargetUser, idLoggedUser);

    return res.status(204).json(deletedUser);
};

export default deleteUserController