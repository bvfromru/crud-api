import { validate as uuidValidate } from "uuid";
import { IUser } from "./types";

export const validateUserData = (user: IUser) => {
  return typeof user.username === "string" && typeof user.age === "number" && Array.isArray(user.hobbies);
};

export const validateUserId = (userId: string) => {
  return uuidValidate(userId);
};
