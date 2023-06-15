import { ICategory } from "./categories.interfaces";
import { ILesson } from "./lessons.interface";
import { IUser } from "./users.interfaces";

export interface IStudyTopicRequest {
  title: string;
  description: string;
  categories?: string[];
}

export interface IStudyTopic {
  id: string;
  title: string;
  description: string;
  user: IUser;
  lessons?: ILesson[];
  categories?: ICategory[];
}

export interface IStudyTopicList {
  id: string;
  title: string;
  description: string;
  user: IUser;
  lessons?: ILesson[];
  categories?: (string | undefined)[];
}

export interface IStudyTopicUpdate {
  title?: string;
  description: string;
  categories?: string[];
}
