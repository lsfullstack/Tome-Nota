import AppDataSource from "../../data-source";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import "dotenv/config";

const createSessionService = async (data: IUserLogin): Promise<string> => {
  const { email, password } = data;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email
  });

  const verifyBlockedFields = Object.keys(data).some(e => e !== "email" && e !== "password");

  if (verifyBlockedFields) {
    throw new AppError("Only the email and password fields can be send", 401);
  }

  const passwordMatch = await compare(password, user!.password);

  if (!passwordMatch) {
    throw new AppError("Invalid e-mail or password", 403);
  }

  const token = jwt.sign({
    isAdm: user!.isAdm,
  },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user!.id
    });

  return token;
};

export default createSessionService;
