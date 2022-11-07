export interface IVideoRequest {
  name: string;
  link: string;
}

export interface IVideo {
  id: string;
  name: string;
  link: string;
}

export interface IVideoUpdate {
  name?: string;
  link?: string;
}