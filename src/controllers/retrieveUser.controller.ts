import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import retrieveUserService from "../services/retrieveUser.service";

const retrieveUserController = async (req: Request, res: Response) => {
    const id = req.params.id

    const user = await retrieveUserService(id);

    return res.status(200).json(instanceToPlain(user));
};

export default retrieveUserController