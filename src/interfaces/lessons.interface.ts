import {IStudyTopic} from "./studyTopics.interfaces";

export interface ILessonRequest{
  name: string;
}
export interface ILesson{
    name :string;
    studyTopic: IStudyTopic;
}

export interface ILessonUpdate{
  name :string;
}