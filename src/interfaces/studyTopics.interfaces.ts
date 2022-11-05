import { IUser } from "./users.interfaces";

export interface ICategories {
    id: string
    name: string
}

export interface IStudyTopicRequest {
    id: string
    name: string
    categories: string[]
}
 
export interface IStudyTopic {
    id: string
    name: string
    user: IUser
    categories: ICategories[]
}
 