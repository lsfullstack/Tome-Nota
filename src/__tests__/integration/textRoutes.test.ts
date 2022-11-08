import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { lessonMock, studyTopicMock, textMock, userLoginMock, userMock} from "../mocks";

describe("/text", () => {
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

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);


    await request(app)
      .post(`/study-topics/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(studyTopicMock);

   
    await request(app)
      .post(`/lesson/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(lessonMock);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /text/:id - Should be able to create a text", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(textMock);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("paragraphs");
    expect(response.body).toHaveProperty("lesson");
    expect(response.status).toBe(201);
  });

  test("POST /text/:id - Should not be able to create a text without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/text/${lesson.body[0].id}`)
      .send(textMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("POST /text/:id - Should not be able to create a text with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .post("/text/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(textMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Lesson not found");
    expect(response.status).toBe(404);
  });

  test("GET /text/:id - Should be able to list texts", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /text/:id - Should not be able to list texts without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).get(`/text/${lesson.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("GET /text/:id - Should not be able to list texts with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/text/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Lesson not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /text/:id - Should be able to update text", async () => {
    const data = { title: "Método de Array - ForEach" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const text = await request(app)
      .get(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/text/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    const updatedText = await request(app)
      .get(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(updatedText.body[0].title).toEqual("Método de Array - ForEach");
    expect(response.status).toBe(200);
  });

  test("PATCH /text/:id - Should not be able to update text without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const text = await request(app)
      .get(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).patch(`/text/${text.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("PATCH /text/:id - Should not be able to update text with invalid id", async () => {
    const data = { title: "Método de Array - ForEach" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .patch("/text/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Text not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /text/:id - Should not be able to update id field value", async () => {
    const data = { id: "ce381027-d5b3-463a-bdea-c92884c8e362" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const text = await request(app)
      .get(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/text/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Only the title field can be changed");
    expect(response.status).toBe(401);
  });

  test("DELETE /text/:id - Should be able to delete text", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(textMock);

    const text = await request(app)
      .get(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/text/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /text/:id - Should not be able to delete text without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(textMock);

    const text = await request(app)
      .get(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(`/text/${text.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("DELETE /text/:id - Should not be able to delete text with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .delete("/text/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Text not found");
    expect(response.status).toBe(404);
  });
});
