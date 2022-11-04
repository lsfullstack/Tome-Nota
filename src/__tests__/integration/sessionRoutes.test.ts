import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { adminLoginMock, adminMock } from "../mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(adminMock);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Should be able to login with the user", async () => {
    const response = await request(app).post("/login").send(adminLoginMock);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login - Should not be able to login with the user with incorrect email or password", async () => {
    const response = await request(app).post("/login").send({
      email: "maria@mail.com",
      password: "12345",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid e-mail or password");
    expect(response.status).toBe(403);
  });
});
