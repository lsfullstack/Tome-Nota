import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors/AppError";

const createUserService = async (user: IUserRequest): Promise<IUser> => {
  const { name, email, password, isAdm } = user;

  const verifyBlockedFields = Object.keys(user).some(
    (e) => e !== "name" && e !== "email" && e !== "password" && e !== "isAdm"
  );

  if (verifyBlockedFields) {
    throw new AppError("Only name, email, password and isAdm can be sent", 403);
  }

  const userRepository = AppDataSource.getRepository(User);
  const newUser: IUser = userRepository.create({
    name,
    email,
    isAdm,
    password: await hash(password, 10),
  });

  await userRepository.save(newUser);

  return newUser;
};

export default createUserService;
