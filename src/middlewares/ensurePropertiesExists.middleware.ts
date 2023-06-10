import { AppError } from "../errors/AppError";
import { Request, Response, NextFunction } from "express";

const ensurePropertiesExistsMiddleware = async ( req: Request, res: Response, next: NextFunction) => {
  const { email, name, username, password } = req.body;

  if (!email || !name || !username || !password) {
    throw new AppError("Name, e-mail, password and username are required fields");
  }

  return next();
};

export default ensurePropertiesExistsMiddleware;
