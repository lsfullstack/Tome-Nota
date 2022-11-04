export interface ICategories {
    id: string
    name: string
}

export interface IStudyTopicRequest {
    id: string
    name: string
    categories: string[]
}
