import { IUser } from "./types";

export let users: IUser[] = [];

export const setUsers = (db: IUser[]) => {
  users = [...db];
};
