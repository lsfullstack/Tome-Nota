import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const retrieveUserService = async (id: string, adm:boolean) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  if(!findUser) {
    throw new AppError("User not found", 404);
  }

  if(adm){
    return findUser;
  }
  const {isAdm, isActive, password, ...resto} = findUser;
  return resto;
};


export default retrieveUserService;