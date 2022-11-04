import AppDataSource from "../../data-source";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import "dotenv/config";

const createSessionService = async ({ email, password }: IUserLogin): Promise<string> => {

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email
  });

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign({
    isAdm: user.isAdm,
  },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id
    });

  return token;
};

export default createSessionService;
