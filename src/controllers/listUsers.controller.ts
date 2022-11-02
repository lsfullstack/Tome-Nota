import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import listUsersService from '../services/listUsers.service'

const listUsersController = async (req: Request, res: Response) => {       
    const isAdm = req.user.isAdm        
    const users = await listUsersService(isAdm)

    return res.status(200).json(instanceToPlain(users))
}

export default listUsersController