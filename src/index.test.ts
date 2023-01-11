import request from "supertest";
import { app } from ".";
import { Codes, IUser } from "./types";
import { validateUserId } from "./utils";

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

describe("Full cycle of CRUD operations with correct data", () => {
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

  it("should get all users and check that out testUser was added", async () => {
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
