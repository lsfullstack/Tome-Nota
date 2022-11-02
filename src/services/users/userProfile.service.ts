import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users.interfaces";

const userProfileService = async (id: string): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOneBy({id});

    return findUser!;
};

export default userProfileService;