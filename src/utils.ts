import { validate as uuidValidate } from "uuid";
import { IUser } from "./types";

export const validateUserData = (user: IUser) => {
  return (
    Object.keys(user).length === 3 &&
    typeof user.username === "string" &&
    typeof user.age === "number" &&
    Array.isArray(user.hobbies) &&
    user.hobbies.every((hobby: string) => typeof hobby === "string")
  );
};

export const validateUserId = (userId: string) => {
  return uuidValidate(userId);
};

export const getNextWorkerId = (currentWorkerID: number, numCPUs: number) => {
  if (currentWorkerID === numCPUs - 1) {
    return 0;
  } else {
    return (currentWorkerID += 1);
  }
};

export const isMulti = () => {
  return process.argv[2] === "--multi";
};
