import { hash } from 'bcrypt'
import AppDataSource from "../data-source"

import { User } from '../entities/user.entity'
import { AppError } from '../errors/AppError'
import { IUser, IUserRequest } from '../interfaces/users.interfaces'

const createUserService = async ({name, email, password, isAdm}: IUserRequest) => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email ===email)

    if(emailAlreadyExists){
        throw new AppError("Email already exists", 400)
    }

    const newUser: IUser = userRepository.create({
        name: name,
        email: email,
        isAdm: isAdm,
        isActive: true,
        password: await hash(password, 10),
    })

    await userRepository.save(newUser)

    return newUser
}

export default createUserService