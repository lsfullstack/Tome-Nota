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
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("categories");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.status).toBe(201);
  });

  test("POST /study-topics - Should be able to create a study topic without a category", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .post("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        title: "Desenvolvimento Web Back-End",
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.status).toBe(201);
  });

  test("POST /study-topics - Should not be able to create a study topic without authentication", async () => {
    const response = await request(app)
      .post("/study-topics")
      .send(studyTopicMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("POST /study-topics - Should not be able to create a study topic with category that does not exist", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .post("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        title: "Desenvolvimento Web Back-End",
        categories: ["Back End"],
      });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Category not found");
    expect(response.status).toBe(404);
  });

  test("GET /study-topics/:id - Should be able to return study topic by id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/study-topics/${studyTopic.body[1].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("categories");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.status).toBe(200);
  });

  test("GET /study-topics/:id - Should not be able to return study topic without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).get(
      `/study-topics/${studyTopic.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("GET /study-topics/:id - Should not be able to return study topic with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/study-topics/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Study topic not found");
    expect(response.status).toBe(404);
  });

  test("GET /study-topics - Should be able to list study topics", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveLength(3);
    expect(response.status).toBe(200);
  });

  test("GET /study-topics - Should not be able to list study topics without authentication", async () => {
    const response = await request(app).get("/study-topics");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("PATCH /study-topics/:id - Should be able to update study topic", async () => {
    const data = { title: "Front-End" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/study-topics/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    const updatedStudyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(updatedStudyTopic.body[0].title).toEqual("Front-End");
    expect(response.status).toBe(200);
  });

  test("PATCH /study-topics/:id - Should not be able to update study topic without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).patch(
      `/study-topics/${studyTopic.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("PATCH /study-topics/:id - Should not be able to update study topic with invalid id", async () => {
    const data = { title: "Front-End" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .patch("/study-topics/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Study topic not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /study-topics/:id - Should not be able to update id field value", async () => {
    const data = { id: "ce381027-d5b3-463a-bdea-c92884c8e362" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/study-topics/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Only the title and categories fields can be changed"
    );
    expect(response.status).toBe(400);
  });

  test("PATCH /study-topics/:id - Should not be able to update user field value", async () => {
    const data = { user: { name: "Kenzie" } };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/study-topics/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Only the title and categories fields can be changed"
    );
    expect(response.status).toBe(400);
  });

  test("DELETE /study-topics/:id - Should be able to delete study topic", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    await request(app)
      .post("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(studyTopicMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/study-topics/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /study-topics/:id - Should not be able to delete study topic without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(
      `/study-topics/${studyTopic.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("DELETE /study-topics/:id - Should not be able to delete study topic with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .delete("/study-topics/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Study topic not found");
    expect(response.status).toBe(404);
  });
});
