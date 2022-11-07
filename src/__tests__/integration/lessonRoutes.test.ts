import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { lessonMock, studyTopicMock, userLoginMock, userMock } from "../mocks";

describe("/lesson", () => {
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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /lesson/:id - Should be able to create a lesson", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/lesson/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(lessonMock);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("studyTopic");
    expect(response.status).toBe(201);
  });

  test("POST /lesson/:id - Should not be able to create a lesson without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/lesson/${studyTopic.body[0].id}`)
      .send(lessonMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("POST /lesson/:id - Should not be able to create a lesson with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .post("/lesson/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(lessonMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Study topic not found");
    expect(response.status).toBe(404);
  });

  test("GET /lesson/study-topic/:id - Should be able to list lessons", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /lesson/study-topic/:id - Should not be able to list lessons without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).get(
      `/lesson/study-topic/${studyTopic.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("GET /lesson/study-topic/:id - Should not be able to list lessons with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/lesson/study-topic/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Study topic not found");
    expect(response.status).toBe(404);
  });

  test("GET /lesson/:id - Should be able to return lesson by id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/lesson/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("studyTopic");
    expect(response.status).toBe(200);
  });

  test("GET /lesson/:id - Should not be able to return lesson without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).get(`/lesson/${lesson.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("GET /study-topics/:id - Should not be able to return lesson with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/lesson/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Lesson not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /lesson/:id - Should be able to update lesson", async () => {
    const data = { name: "Principais métodos de Array" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/lesson/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    const updatedLesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(updatedLesson.body[0].name).toEqual("Principais métodos de Array");
    expect(response.status).toBe(200);
  });

  test("PATCH /lesson/:id - Should not be able to update lesson without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).patch(`/lesson/${lesson.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("PATCH /lesson/:id - Should not be able to update lesson with invalid id", async () => {
    const data = { name: "Principais métodos de Array" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .patch("/lesson/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Lesson not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /lesson/:id - Should not be able to update id field value", async () => {
    const data = { id: "ce381027-d5b3-463a-bdea-c92884c8e362" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/lesson/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Only the name field can be changed");
    expect(response.status).toBe(401);
  });

  test("DELETE /lesson/:id - Should be able to delete lesson", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/lesson/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(lessonMock);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/lesson/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /lesson/:id - Should not be able to delete lesson without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/lesson/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(lessonMock);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(`/lesson/${lesson.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("DELETE /lesson/:id - Should not be able to delete lesson with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/lesson/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(lessonMock);

    const response = await request(app)
      .delete("/lesson/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Lesson not found");
    expect(response.status).toBe(404);
  });
});
