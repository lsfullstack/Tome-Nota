import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { adminMock, adminLoginMock, userMock, userLoginMock, userWithoutPassword, userWithoutIsAdm, userWithoutName} from "../mocks";

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

  test("POST /users - Should be able to create a user", async () => {
    const resultNotAdmin = await request(app).post("/users").send(userMock);

    expect(resultNotAdmin.status).toBe(201);
    expect(resultNotAdmin.body).toHaveProperty("id");
    expect(resultNotAdmin.body).toHaveProperty("name");
    expect(resultNotAdmin.body).toHaveProperty("email");
    expect(resultNotAdmin.body).toHaveProperty("isActive");
    expect(resultNotAdmin.body).toHaveProperty("createdAt");
    expect(resultNotAdmin.body).toHaveProperty("updatedAt");
    expect(resultNotAdmin.body).toHaveProperty("isAdm");
    expect(resultNotAdmin.body).not.toHaveProperty("password");
  });

  test("POST /users - Should not be able to create a user without password field value", async () => {
    const result = await request(app).post("/users").send(userWithoutPassword);

    expect(result.status).toBe(404);
    expect(result.body).toMatchObject({
      message: "email, name, isAdm and password is required fields",
    });
  });

  test("POST /users - Should not be able to create a user without isAdm field value", async () => {
    const result = await request(app).post("/users").send(userWithoutIsAdm);

    expect(result.status).toBe(404);
    expect(result.body).toMatchObject({
      message: "email, name, isAdm and password is required fields",
    });
  });

  test("POST /users - Should not be able to create a user without name field value", async () => {
    const result = await request(app).post("/users").send(userWithoutName);

    expect(result.status).toBe(404);
    expect(result.body).toMatchObject({
      message: "email, name, isAdm and password is required fields",
    });
  });

  test("POST /users - Should not be able to create a user that already exists", async () => {
    const result = await request(app).post("/users").send(userMock);

    expect(result.status).toBe(409);
    expect(result.body).toMatchObject({
      message: "E-mail already exists",
    });
  });

  test("GET /users/profile - Should be able to return the logged user data", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(userLoginMock);

    const userData = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(userData.status).toBe(200);
    expect(userData.body).toHaveProperty("id");
    expect(userData.body).toHaveProperty("name");
    expect(userData.body).toHaveProperty("email");
    expect(userData.body).toHaveProperty("isActive");
    expect(userData.body).toHaveProperty("createdAt");
    expect(userData.body).toHaveProperty("updatedAt");
    expect(userData.body).toHaveProperty("isAdm");
    expect(userData.body).not.toHaveProperty("password");
  });

  test("GET /users/:id - Should be able to return user data from id", async () => {
    const userSearch = await request(app).post("/login").send(userLoginMock);

    const userSearchData = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userSearch.body.token}`);

    const userData = await request(app)
      .get(`/users/${userSearchData.body.id}`)
      .set("Authorization", `Bearer ${userSearch.body.token}`);

    expect(userData.status).toBe(200);
    expect(userData.body).toHaveProperty("id");
    expect(userData.body).toHaveProperty("name");
    expect(userData.body).toHaveProperty("email");
    expect(userData.body).toHaveProperty("isActive");
    expect(userData.body).toHaveProperty("createdAt");
    expect(userData.body).toHaveProperty("updatedAt");
    expect(userData.body).toHaveProperty("isAdm");
    expect(userData.body).not.toHaveProperty("password");
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
      "Only the name, email and password fields can be changed"
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
      "Only the name, email and password fields can be changed"
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
      "Only the name, email and password fields can be changed"
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
