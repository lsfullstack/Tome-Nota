import { AppError } from "../errors/AppError";
import { Request, Response, NextFunction } from "express";

const ensurePropertiesExistsMiddleware = async ( req: Request, res: Response, next: NextFunction) => {
  const { email, name, isAdm, password } = req.body;

  if (!email || !name || isAdm == undefined || !password) {
    throw new AppError("Name, e-mail, password and isAdm are required fields");
  }

  return next();
};

export default ensurePropertiesExistsMiddleware;
