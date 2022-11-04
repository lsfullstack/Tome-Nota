import {IUserLogin,IUserRequest,IUserRequestTest} from "../../interfaces/users.interfaces";

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
