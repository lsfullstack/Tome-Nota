import { AppError } from "../errors/AppError"
import { Request, Response, NextFunction } from 'express'

const ensureIsAdm = (req: Request, res: Response, next: NextFunction) => {
    const isAdm = req.user.isAdm

    if(!isAdm){
        throw new AppError("User is not admin", 401)
    }

    next()
}

export default ensureIsAdm