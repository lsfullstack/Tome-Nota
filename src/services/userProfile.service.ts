import AppDataSource from "../data-source"
import { User } from "../entities/user.entity"

const userProfileService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({id})

    return findUser
}

export default userProfileService