import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUser } from "../../interfaces/users.interfaces";

const retrieveUserService = async (id: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  if(!findUser) {
    throw new AppError("User not found", 404);
  }

  return findUser;
};

export default retrieveUserService;