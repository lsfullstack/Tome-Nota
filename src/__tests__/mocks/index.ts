import { ITextRequest } from "../../interfaces/texts.interface";
import { IVideoRequest } from "../../interfaces/video.interface";
import { ILessonRequest } from "../../interfaces/lessons.interface";
import { ICategoryRequest, ICategoryUpdate } from "../../interfaces/categories.interfaces";
import { IParagraphRequest } from "../../interfaces/paragraphs.interface";
import { IStudyTopicRequest } from "../../interfaces/studyTopics.interfaces";
import { IUserLogin, IUserRequest, IUserRequestTest} from "../../interfaces/users.interfaces";

export const userMock: IUserRequest = {
  name: "Felipe",
  email: "felipe@mail.com",
  password: "12345",
  isAdm: false,
};

export const adminMock: IUserRequest = {
  name: "Lucas",
  email: "lucas@mail.com",
  password: "12345",
  isAdm: true,
};

export const userLoginMock: IUserLogin = {
  email: "felipe@mail.com",
  password: "12345",
};

export const adminLoginMock: IUserLogin = {
  email: "lucas@mail.com",
  password: "12345",
};

export const userWithoutPassword: IUserRequestTest = {
  name: "Maria",
  email: "maria@mail.com",
  isAdm: false,
};

export const userWithoutIsAdm: IUserRequestTest = {
  name: "Naiane",
  email: "naiane@mail.com",
  password: "12345",
};

export const userWithoutName: IUserRequestTest = {
  email: "leticia@mail.com",
  password: "12345",
  isAdm: false,
};

export const categoryMock: ICategoryRequest = {
  name: "Desenvolvimento Web",
};

export const categoryMock2: ICategoryRequest = {
  name: "Desenvolvimento Web",
};

export const categoryMockWithoutName: ICategoryUpdate = {
  
};

export const categoryForPatch: ICategoryUpdate = {
  name: "Web Design",
};

export const studyTopicMock: IStudyTopicRequest = {
  name: "Desenvolvimento Web Front-End",
  categories: ["Desenvolvimento Web"],
};

export const lessonMock: ILessonRequest = {
  name: "JavaScript - Métodos de Array",
};

export const textMock: ITextRequest = {
  title: "Método ForEach",
};

export const paragraphMock: IParagraphRequest = {
  description:
    "O método forEach( ) executa uma dada função em cada elemento de um array.",
};

export const videoMock: IVideoRequest = {
  name: "10 Métodos de Array que todo desenvolvedor precisa conhecer",
  link: "https://www.youtube.com/watch?v=mnjQeXqA3Z0&ab_channel=MatheusBattisti-HoradeCodar",
};
