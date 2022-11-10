import { IStudyTopic } from "./studyTopics.interfaces";
import { IVideo } from "./video.interface";

export interface ILessonRequest {
  name: string;
}
export interface ILesson {
  id: string;
  name: string;
  studyTopic?: IStudyTopic;
  video?: IVideo;
}

export interface ILessonUpdate {
  name?: string;
}
