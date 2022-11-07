import { ICategory } from "./categories.interfaces";
import { ILesson } from "./lessons.interface";
import { IUser } from "./users.interfaces";

export interface IStudyTopicRequest {
  name: string;
  categories?: string[];
}

export interface IStudyTopic {
  id: string;
  name: string;
  user: IUser;
  lessons?: ILesson[];
  categories?: ICategory[];
}

export interface IStudyTopicUpdate {
  name?: string;
  categories?: ICategory[];
}
