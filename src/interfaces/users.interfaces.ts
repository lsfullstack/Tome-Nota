export interface IUserRequest {
    name: string
    email: string
    password: string
    isAdm: boolean
}

export interface IUser {
    name: string
    email: string
    isAdm: boolean
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    password: string
}


export interface IUserLogin {
    email: string
    password: string
}

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
}