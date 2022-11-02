import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users.interfaces";

const listUsersService = async (): Promise<IUser[]> => {
    const userRepository = AppDataSource.getRepository(User);

    const users = userRepository.find();

    return users;
}

export default listUsersService;