import { IStudyTopic } from "./studyTopics.interfaces";
import { IVideo } from "./video.interface";

export interface ILessonRequest {
  title: string;
}
export interface ILesson {
  id: string;
  title: string;
  studyTopic?: IStudyTopic;
  video?: IVideo;
}

export interface ILessonUpdate {
  title?: string;
}
