import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import userProfileService from "../services/userProfile.service";

const userProfileController = async (req: Request, res: Response) => {
    const idLoggedUser = req.user.id

    const user = await userProfileService(idLoggedUser)

    return res.status(200).json(instanceToPlain(user))
}

export default userProfileController