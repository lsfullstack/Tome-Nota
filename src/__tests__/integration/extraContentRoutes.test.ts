import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import {
  extraContentMock,
  extraContentMockWithoutLink,
  extraContentMockWithoutName,
  lessonMock,
  studyTopicMock,
  userLoginMock,
  userMock,
} from "../mocks";

describe("/extra-content", () => {
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

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    await request(app)
      .post("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(studyTopicMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/lesson/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(lessonMock);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /extra-content/:id - Should be able to create a extra content", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(extraContentMock);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("link");
    expect(response.body).toHaveProperty("lesson");
    expect(response.status).toBe(201);
  });

  test("POST /extra-content/:id - Should not be able to create a extra content without name field value", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(extraContentMockWithoutName);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Name and link are required fields");
    expect(response.status).toBe(401);
  });

  test("POST /extra-content/:id - Should not be able to create a extra content without link field value", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(extraContentMockWithoutLink);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Name and link are required fields");
    expect(response.status).toBe(401);
  });

  test("POST /extra-content/:id - Should not be able to create a extra content without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/extra-content/${lesson.body[0].id}`)
      .send(extraContentMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("POST /extra-content/:id - Should not be able to create a extra content with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .post("/extra-content/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(extraContentMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Lesson not found");
    expect(response.status).toBe(404);
  });

  test("GET /extra-content/:id - Should be able to list extra contents", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /extra-content/:id - Should not be able to list extra contents without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).get(
      `/extra-content/${lesson.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("GET /extra-content/:id - Should not be able to list extra contents with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/extra-content/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Lesson not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /extra-content/:id - Should be able to update extra content", async () => {
    const data = { name: "ForEach - Documentação MDN" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const extraContent = await request(app)
      .get(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/extra-content/${extraContent.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    const updatedExtraContent = await request(app)
      .get(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(updatedExtraContent.body[0].name).toEqual(
      "ForEach - Documentação MDN"
    );
    expect(response.status).toBe(200);
  });

  test("PATCH /extra-content/:id - Should not be able to update extra content without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const extraContent = await request(app)
      .get(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).patch(
      `/extra-content/${extraContent.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("PATCH /extra-content/:id - Should not be able to update extra content with invalid id", async () => {
    const data = { name: "ForEach - Documentação MDN" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .patch("/extra-content/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Extra content not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /extra-content/:id - Should not be able to update id field value", async () => {
    const data = { id: "ce381027-d5b3-463a-bdea-c92884c8e362" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const extraContent = await request(app)
      .get(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/extra-content/${extraContent.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Only the name and link fields can be changed"
    );
    expect(response.status).toBe(401);
  });

  test("DELETE /extra-content/:id - Should be able to delete extra content", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(extraContentMock);

    const extraContent = await request(app)
      .get(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/extra-content/${extraContent.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /extra-content/:id - Should not be able to delete extra content without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(extraContentMock);

    const extraContent = await request(app)
      .get(`/extra-content/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(
      `/extra-content/${extraContent.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("DELETE /extra-content/:id - Should not be able to delete extra content with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .delete("/extra-content/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Extra content not found");
    expect(response.status).toBe(404);
  });
});
