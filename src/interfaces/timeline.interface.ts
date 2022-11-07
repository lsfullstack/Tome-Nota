export interface ITimelineRequest {
  time: string;
  description: string;
}

export interface ITimeline {
  id: string;
  time: string;
  description: string;
}

export interface ITimelineUpdate {
  time?: string;
  description?: string;
}
