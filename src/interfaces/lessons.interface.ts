import { IStudyTopic } from "./studyTopics.interfaces";
import { IVideo } from "./video.interface";

export interface ILessonRequest {
  name: string;
}
export interface ILesson {
  name: string;
  studyTopic?: IStudyTopic;
  video?: IVideo;
}

export interface ILessonUpdate {
  name?: string;
}
