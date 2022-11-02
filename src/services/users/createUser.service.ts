import { hash } from 'bcrypt';
import AppDataSource from "../../data-source";
import { User } from '../../entities/user.entity';
import { IUser, IUserRequest } from '../../interfaces/users.interfaces';

const createUserService = async ({name, email, password, isAdm}: IUserRequest): Promise<IUser> => {

    const userRepository = AppDataSource.getRepository(User);

    const newUser: IUser = userRepository.create({
        name,
        email,
        isAdm,
        password: await hash(password, 10),
    });

    await userRepository.save(newUser);

    return newUser;
}

export default createUserService;