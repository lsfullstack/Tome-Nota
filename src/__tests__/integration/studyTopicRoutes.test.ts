import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import {
  adminLoginMock,
  adminMock,
  categoryMock,
  studyTopicMock,
  userLoginMock,
  userMock,
} from "../mocks";

describe("/study-topics", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(userMock);
    await request(app).post("/users").send(adminMock);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(categoryMock);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /study-topics - Should be able to create a study topic", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .post("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(studyTopicMock);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("categories");
    expect(response.body).toHaveProperty("lessons");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.status).toBe(201);
  });

  // test("POST /properties -  should not be able to create property that already exists", async () => {
  //   const categories = await request(app).get("/categories");
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   mockedProperty.categoryId = categories.body[0].id;
  //   const response = await request(app)
  //     .post("/properties")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
  //     .send(mockedProperty);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(400);
  // });

  // test("POST /properties -  should not be able to create property not being admin", async () => {
  //   const categories = await request(app).get("/categories");
  //   const userLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedUserLogin);
  //   mockedProperty.categoryId = categories.body[0].id;
  //   const response = await request(app)
  //     .post("/properties")
  //     .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  //     .send(mockedProperty);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(403);
  // });

  // test("POST /properties -  should not be able to create property without authentication", async () => {
  //   const categories = await request(app).get("/categories");
  //   mockedProperty.categoryId = categories.body[0].id;
  //   const response = await request(app)
  //     .post("/properties")
  //     .send(mockedProperty);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(401);
  // });

  // test("POST /properties -  should not be able to create property with invalid categoryId", async () => {
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   const response = await request(app)
  //     .post("/properties")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
  //     .send(mockedPropertyInvalidCategoryId);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(404);
  // });

  // test("POST /properties -  must not be able to create a property with invalid zipCode", async () => {
  //   const categories = await request(app).get("/categories");
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   mockedPropertyInvalidZipCode.categoryId = categories.body[0].id;
  //   const response = await request(app)
  //     .post("/properties")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
  //     .send(mockedPropertyInvalidZipCode);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(400);
  // });

  // test("POST /properties -  must not be able to create a property with invalid state", async () => {
  //   const categories = await request(app).get("/categories");
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   mockedPropertyInvalidState.categoryId = categories.body[0].id;
  //   const response = await request(app)
  //     .post("/properties")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
  //     .send(mockedPropertyInvalidState);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(400);
  // });

  // test("GET /properties -  Must be able to list all properties", async () => {
  //   const response = await request(app).get("/properties");
  //   expect(response.body).toHaveLength(1);
  //   expect(response.status).toBe(200);
  // });
});
