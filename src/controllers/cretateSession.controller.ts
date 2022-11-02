import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/users.interfaces'
import createSessionService from '../services/createSession.service'

const createSessionController = async (req: Request, res: Response) => {
    const data: IUserLogin = req.body
    const token =  await createSessionService(data)

    return res.status(200).json({token})
}

export default createSessionController