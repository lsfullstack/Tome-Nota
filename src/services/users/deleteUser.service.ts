import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (isAdm : boolean, id : string, idLoggedUser: string): Promise<void> => {

    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({id});
    
    if(id !== idLoggedUser && !isAdm){
        throw new AppError("User is not admin", 401);
    }

    if(!findUser || !findUser.isActive){
        throw new AppError("User not found", 404);
    }

    await userRepository.update(
        id,
        {
            isActive: false
        }
    );
}

export default deleteUserService;
