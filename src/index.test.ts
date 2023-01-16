import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_PORT } from "./constants";
import { startServer } from "./server";
import { Codes, IUser, Messages } from "./types";
import { validateUserId } from "./utils";

const app = startServer(DEFAULT_PORT, "Testing");

const testUser1: Omit<IUser, "id"> = {
  username: "testUser1",
  age: 33,
  hobbies: ["ski", "bike", "running"],
};

const testUser2: Omit<IUser, "id"> = {
  username: "testUser2",
  age: 42,
  hobbies: ["eat", "sleep", "sex"],
};

const testUserWithWrongBody = {
  age: 42,
  hobbies: ["eat", "sleep", "sex"],
};

const wrongID = "d8cfe98e-178c-4fc2-a68d-18ddc19f4eb2-3-3";
const nonExistId = uuidv4();

describe("Scenario 1 - Full cycle of CRUD operations with correct data", () => {
  const response = request(app.server);
  let userId: string;

  afterAll((done) => {
    app.close();
    done();
  });

  it("should get all users and return empty array", async () => {
    const res = await response.get("/api/users");
    expect(res.statusCode).toBe(Codes.ok);
    expect(res.body).toEqual([]);
  });

  it("should add new user", async () => {
    const res = await response.post("/api/users").send(testUser1);
    expect(res.statusCode).toBe(Codes.create);
    const user = res.body as IUser;
    userId = user.id;
    expect(user.username).toBe(testUser1.username);
    expect(user.age).toBe(testUser1.age);
    expect(user.hobbies).toEqual(testUser1.hobbies);
    expect(validateUserId(user.id)).toBe(true);
  });

  it("should get all users and check that our testUser was added", async () => {
    const res = await response.get("/api/users");
    expect(res.statusCode).toBe(Codes.ok);
    const users = res.body as IUser[];
    const user = users.find((u) => u.id === userId);
    expect(user?.username).toBe(testUser1.username);
    expect(user?.age).toBe(testUser1.age);
    expect(user?.hobbies).toEqual(testUser1.hobbies);
  });

  it("should get one user by userId", async () => {
    const res = await response.get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(Codes.ok);
    const user = res.body as IUser;
    expect(user?.username).toBe(testUser1.username);
    expect(user?.age).toBe(testUser1.age);
    expect(user?.hobbies).toEqual(testUser1.hobbies);
  });

  it("should update user info", async () => {
    const res = await response.put(`/api/users/${userId}`).send(testUser2);
    expect(res.statusCode).toBe(Codes.ok);
    const user = res.body as IUser;
    expect(user?.username).toBe(testUser2.username);
    expect(user?.age).toBe(testUser2.age);
    expect(user?.hobbies).toEqual(testUser2.hobbies);
  });

  it("should delete user by userId", async () => {
    const res = await response.delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(Codes.delete);
    expect(res.body).toBe("");
  });

  it("should get all users and return empty array again", async () => {
    const res = await response.get("/api/users");
    expect(res.statusCode).toBe(Codes.ok);
    expect(res.body).toEqual([]);
  });
});

describe("Scenario 2 - Operations with invalid endpoints and invalid data", () => {
  const response = request(app.server);
  let userId: string;

  afterAll((done) => {
    app.close();
    done();
  });

  it("should try invalid endpoint and get 404 error", async () => {
    const res = await response.get("/api/abcde");
    expect(res.statusCode).toBe(Codes.notFound);
    expect(res.text).toBe(Messages.invalidEndpoint);
  });

  it("should try to get user data by incorrect ID and get 400 error", async () => {
    const res = await response.get(`/api/users/${wrongID}`);
    expect(res.statusCode).toBe(Codes.invalid);
    expect(res.text).toBe(Messages.invalidUserId);
  });

  it("should try to add new user with body that does not contain required fields and get 400 error", async () => {
    const res = await response.post("/api/users").send(testUserWithWrongBody);
    expect(res.statusCode).toBe(Codes.invalid);
    expect(res.text).toBe(Messages.invalidBody);
  });

  it("should try to update user data by incorrect ID and get 400 error", async () => {
    const res = await response.put(`/api/users/${wrongID}`).send(testUser2);
    expect(res.statusCode).toBe(Codes.invalid);
    expect(res.text).toBe(Messages.invalidUserId);
  });

  it("should try to delete user by incorrect ID and get 400 error", async () => {
    const res = await response.delete(`/api/users/${wrongID}`);
    expect(res.statusCode).toBe(Codes.invalid);
    expect(res.text).toBe(Messages.invalidUserId);
  });
});

describe("Scenario 3 - Operations with non-exist users", () => {
  const response = request(app.server);

  afterAll((done) => {
    app.close();
    done();
  });

  it("should try to get user data of non-exist user and get 404 error", async () => {
    const res = await response.get(`/api/users/${nonExistId}`);
    expect(res.statusCode).toBe(Codes.notFound);
    expect(res.text).toBe(Messages.userDoesntExist);
  });

  it("should try to update user data of non-exist user and get 404 error", async () => {
    const res = await response.put(`/api/users/${nonExistId}`).send(testUser2);
    expect(res.statusCode).toBe(Codes.notFound);
    expect(res.text).toBe(Messages.userDoesntExist);
  });

  it("should try to delete non-exist user and get 404 error", async () => {
    const res = await response.delete(`/api/users/${nonExistId}`);
    expect(res.statusCode).toBe(Codes.notFound);
    expect(res.text).toBe(Messages.userDoesntExist);
  });
});
