import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { lessonMock, paragraphMock, studyTopicMock, textMock, userLoginMock, userMock} from "../mocks";

describe("/paragraphs", () => {
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

    const lesson = await request(app)
      .get(`/lesson/study-topic/${studyTopic.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(`/text/${lesson.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(textMock);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /paragraphs/:id - Should be able to create a paragraph", async () => {
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
      .post(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(paragraphMock);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("text");
    expect(response.status).toBe(201);
  });

  test("POST /paragraphs/:id - Should not be able to create a paragraph without authentication", async () => {
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
      .post(`/paragraphs/${text.body[0].id}`)
      .send(paragraphMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("POST /paragraphs/:id - Should not be able to create a paragraph with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .post("/paragraphs/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(paragraphMock);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Text not found");
    expect(response.status).toBe(404);
  });

  test("GET /paragraphs/:id - Should be able to list paragraphs", async () => {
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
      .get(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /paragraphs/:id - Should not be able to list paragraphs without authentication", async () => {
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

    const response = await request(app).get(`/paragraphs/${text.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("GET /paragraphs/:id - Should not be able to list paragraphs with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/paragraphs/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Text not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /paragraphs/:id - Should be able to update paragraph", async () => {
    const data = {
      description:
        "O método forEach( ) é usado para percorrer um Array, executando uma função em cada elemento.",
    };

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

    const paragraph = await request(app)
      .get(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/paragraphs/${paragraph.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    const updatedParagraph = await request(app)
      .get(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(updatedParagraph.body[0].description).toEqual(
      "O método forEach( ) é usado para percorrer um Array, executando uma função em cada elemento."
    );
    expect(response.status).toBe(200);
  });

  test("PATCH /paragraphs/:id - Should not be able to update paragraph without authentication", async () => {
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

    const paragraph = await request(app)
      .get(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).patch(
      `/paragraphs/${paragraph.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("PATCH /paragraphs/:id - Should not be able to update paragraph with invalid id", async () => {
    const data = {
      description:
        "O método forEach( ) é usado para percorrer um Array, executando uma função em cada elemento.",
    };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .patch("/paragraphs/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Paragraph not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /paragraphs/:id - Should not be able to update id field value", async () => {
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

    const paragraph = await request(app)
      .get(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/paragraphs/${paragraph.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Only the description field can be changed"
    );
    expect(response.status).toBe(400);
  });

  test("DELETE /paragraphs/:id - Should be able to delete paragraph", async () => {
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

    await request(app)
      .post(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(paragraphMock);

    const paragraph = await request(app)
      .get(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/paragraphs/${paragraph.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /paragraphs/:id - Should not be able to delete paragraph without authentication", async () => {
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

    await request(app)
      .post(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(paragraphMock);

    const paragraph = await request(app)
      .get(`/paragraphs/${text.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(
      `/paragraphs/${paragraph.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("DELETE /paragraphs/:id - Should not be able to delete paragraph with invalid id", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .delete("/paragraphs/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Paragraph not found");
    expect(response.status).toBe(404);
  });
});
