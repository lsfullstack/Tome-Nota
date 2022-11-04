import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserUpdate } from "../../interfaces/users.interfaces";

const updateUserService = async (isAdm: boolean, id: string, user: IUserUpdate, idLoggedUser: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });
  const { name, email, password } = user;

  const verifyBlockedFields = Object.keys(user).some(e => e == "isAdm" || e === "id" || e === "isActive" || e === "createdAt" || e === "updatedAt");

  if (verifyBlockedFields) {
    throw new AppError("Only the name, email and password fields can be changed", 401);
  }

  if (id !== idLoggedUser && !isAdm) {
    throw new AppError("User is not admin", 401);
  }

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(
    id,
    {
      name: name ? name : findUser.name,
      email: email ? email : findUser.email,
      password: password ? await hash(password, 10) : findUser.password
    }
  );

  const updatedUser = await userRepository.findOneBy({
    id
  });

  return updatedUser;
};

export default updateUserService;