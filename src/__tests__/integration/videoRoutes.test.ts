import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { lessonMock, studyTopicMock, userLoginMock, userMock, videoMock} from "../mocks";

describe("/video", () => {
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

  test("POST /video/:id - Should be able to create a video", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/video/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(videoMock);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("link");
    expect(response.body).toHaveProperty("lesson");
    expect(response.status).toBe(201);
  });

  test("POST /video/:id - Should not be able to create a video without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post(`/video/${lesson.body[0].id}`)
      .send(videoMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("POST /video/:id - Should not be able to create a video with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .post("/video/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(videoMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Lesson not found");
    expect(response.status).toBe(404);
  });

  test("GET /video/:id - Should be able to return video by id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/video/${lesson.body[0].video.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("link");
    expect(response.body).toHaveProperty("lesson");
    expect(response.status).toBe(200);
  });

  test("GET /video/:id - Should not be able to return video by id without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).get(
      `/video/${lesson.body[0].video.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("GET /video/:id - Should not be able to return video by id with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/video/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Video not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /video/:id - Should be able to update video", async () => {
    const data = {
      name: "Métodos que irão facilitar sua vida ao trabalhar com Arrays em Java - Curso de Java - Aula 30",
    };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const video = await request(app)
      .get(`/video/${lesson.body[0].video.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/video/${video.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    const updatedVideo = await request(app)
      .get(`/video/${video.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(updatedVideo.body.name).toEqual(
      "Métodos que irão facilitar sua vida ao trabalhar com Arrays em Java - Curso de Java - Aula 30"
    );
    expect(response.status).toBe(200);
  });

  test("PATCH /video/:id - Should not be able to update video without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const video = await request(app)
      .get(`/video/${lesson.body[0].video.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).patch(`/video/${video.body.id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("PATCH /video/:id - Should not be able to update video with invalid id", async () => {
    const data = {
      name: "Métodos que irão facilitar sua vida ao trabalhar com Arrays em Java - Curso de Java - Aula 30",
    };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .patch("/video/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Video not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /video/:id - Should not be able to update id field value", async () => {
    const data = { id: "ce381027-d5b3-463a-bdea-c92884c8e362" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const video = await request(app)
      .get(`/video/${lesson.body[0].video.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/video/${video.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Only the name and link fields can be changed"
    );
    expect(response.status).toBe(400);
  });

  test("DELETE /video/:id - Should be able to delete video", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const video = await request(app)
      .get(`/video/${lesson.body[0].video.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/video/${video.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /video/:id - Should not be able to delete video without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const studyTopic = await request(app)
      .get("/study-topics")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/lesson/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(lessonMock);

    const findLesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/video/${findLesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(videoMock);

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const video = await request(app)
      .get(`/video/${lesson.body[0].video.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(`/video/${video.body.id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("DELETE /video/:id - Should not be able to delete video with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .delete("/video/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Video not found");
    expect(response.status).toBe(404);
  });
});
