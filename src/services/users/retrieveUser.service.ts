import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUser } from "../../interfaces/users.interfaces";

const retrieveUserService = async (
  id: string,
  adm: boolean
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if ((!adm && findUser.isAdm) || (!adm && findUser.isActive == false)) {
    throw new AppError("User is not admin", 401);
  }

  return findUser;
};

export default retrieveUserService;
