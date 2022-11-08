import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { categoryMock , adminLoginMock, userMock, adminMock , categoryMockWithoutName, userLoginMock, categoryForPatch} from "../mocks";

describe("/categories", () => {
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
    

  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /categories - Should be able to create a category for adm", async () => {
    const loginResponse = await request(app).post("/login").send(adminLoginMock);

    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(categoryMock);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    
  });

  test("POST /categories - Should not be able to create a category for not adm", async () => {
    const loginResponse = await request(app).post("/login").send(userMock);

    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(categoryMock);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");  
  });

  test("POST/categories - Should not be able to create a category without name field value", async () => {
    const loginResponse = await request(app).post("/login").send(adminLoginMock);

    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(categoryMockWithoutName);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");  
  });

  test("POST/categories - Should not be able to create a category without name field value", async () => {
    const loginResponse = await request(app).post("/login").send(adminLoginMock);

    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(categoryMockWithoutName);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");  
  });


  test("GET/categories - Should be able to list categories", async () => {
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(categoryForPatch);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);  
  });

  test("GET /categories/:id - Should be able to list one category for id", async () => {
    
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const categoriesList = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/categories/${categoriesList.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
       

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.status).toBe(200);
  });


  test("GET /categories/:id - Should not be able to list one category for id without authentication", async () => {
    
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const categoriesList = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/categories/${categoriesList.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization headers");
    expect(response.status).toBe(401);
  });


  test("GET /categories/:id - Should not be able to list one category with invalid id ", async () => {
    
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const response = await request(app)
      .get("/categories/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Category not found");
    expect(response.status).toBe(404);
  });


  //

  test("PATCH /categories/:id - Should be able to update category => user Adm", async () => {
    
    const loginResponse = await request(app).post("/login").send(adminLoginMock);

    const categoriesList = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/categories/${categoriesList.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(categoryForPatch);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.status).toBe(200);
  });


  test("PATCH /categories/:id - Should not be able to update category => user not adm", async () => {
    
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const categoriesList = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/categories/${categoriesList.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);


    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });


  test("GET /categories/:id - Should not be able to update category with invalid id ", async () => {
    
    const loginResponse = await request(app).post("/login").send(adminLoginMock);

    const response = await request(app)
      .patch("/categories/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(categoryForPatch);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Category not found");
    expect(response.status).toBe(404);
  });
  
  //


  test("DELETE /categories/:id - Should be able to delete category => user Adm", async () => {
    
    const loginResponse = await request(app).post("/login").send(adminLoginMock);

    const categoriesList = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/categories/${categoriesList.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
  });


  test("DELETE /categories/:id - Should not be able to delete category => user not adm", async () => {

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(adminLoginMock);

    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(categoryMock);
    
    const loginResponse = await request(app).post("/login").send(userLoginMock);

    const categoriesList = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/categories/${categoriesList.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);


    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });


  test("DELETE /categories/:id - Should not be able to update delete with invalid id ", async () => {
    
    const loginResponse = await request(app).post("/login").send(adminLoginMock);

    const response = await request(app)
      .delete("/categories/ce381027-d5b3-463a-bdea-c92884c8e362")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(categoryForPatch);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Category not found");
    expect(response.status).toBe(404);
  });
 
});