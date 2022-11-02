import AppDataSource from "../data-source"
import { User } from "../entities/user.entity"
import { AppError } from "../errors/AppError"
import { IUser } from "../interfaces/users.interfaces"

const listUsersService = async (isAdm : boolean): Promise<IUser[]> => {
    
    if(!isAdm){
        throw new AppError("User must be adm to access thies route", 403)
    }

    const userRepository = AppDataSource.getRepository(User)

    const users = userRepository.find()

    return users
}

export default listUsersService