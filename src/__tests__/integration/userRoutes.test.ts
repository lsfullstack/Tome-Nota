import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { adminMock, adminLoginMock, userMock, userLoginMock } from "../mocks";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -  Must be able to create a user", async () => {
    const response = await request(app).post("/users").send(userMock);

    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Felipe");
    expect(response.body.email).toEqual("felipe@mail.com");
    expect(response.body.isAdm).toEqual(false);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("GET /users - Should be able to list users", async () => {
    await request(app).post("/users").send(adminMock);

    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("studyTopic");
    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(200);
  });

  test("GET /users - Should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("GET /users - Should not be able to list users not being admin", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User is not admin");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should be able to update user", async () => {
    const data = { name: "Felipe Kenzie", email: "felipekenzie@mail.com" };

    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${user.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    const updatedUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(updatedUser.body[0].name).toEqual("Felipe Kenzie");
    expect(updatedUser.body[0]).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("PATCH /users/:id - Should not be able to update user without authentication", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).patch(`/users/${user.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should not be able to update user with invalid id", async () => {
    const data = { name: "Lucas Kenzie", email: "lucaskenzie@mail.com" };

    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const response = await request(app)
      .patch("/users/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User not found");
    expect(response.status).toBe(404);
  });

  test("PATCH /users/:id - Should not be able to update another user not being admin", async () => {
    await request(app).post("/users").send(userMock);

    const data = { name: "Lucas" };

    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${user.body[1].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User is not admin");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should not be able to update isAdm field value", async () => {
    const data = { isAdm: false };

    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${user.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Fields isAdm, id and isActive cannot be changed"
    );
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should not be able to update id field value", async () => {
    const data = { id: "ce381027-d5b3-463a-bdea-c92884c8e362" };

    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${user.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Fields isAdm, id and isActive cannot be changed"
    );
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should not be able to update isActive field value", async () => {
    const data = { isActive: false };

    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${user.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(data);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Fields isAdm, id and isActive cannot be changed"
    );
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id - Should be able to soft delete user", async () => {
    await request(app).post("/users").send(adminMock);

    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${user.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(findUser.body[0].isActive).toBe(false);
    expect(response.status).toBe(204);
  });

  test("DELETE /users/:id - Should not be able to delete user without authentication", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(`/users/${user.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id - Should not be able to delete user with invalid id", async () => {
    await request(app).post("/users").send(adminMock);

    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const response = await request(app)
      .delete("/users/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User not found");
    expect(response.status).toBe(404);
  });

  test("DELETE /users/:id - Should not be able to delete user not being admin", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${user.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User is not admin");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id - Should not be able to delete user with isActive = false", async () => {
    await request(app).post("/users").send(adminMock);

    const loginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${user.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
