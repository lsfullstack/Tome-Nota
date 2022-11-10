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

export interface IStudyTopicList {
  id: string;
  name: string;
  user: IUser;
  lessons?: ILesson[];
  categories?: (string | undefined)[];
}

export interface IStudyTopicUpdate {
  name?: string;
  categories?: string[];
}
