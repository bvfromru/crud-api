import { IncomingMessage, ServerResponse } from "http";

export interface IResponse extends ServerResponse {
  // TODO Get rid of "any"
  send?: (data: any, code: number) => void;
}

export interface IRequest extends IncomingMessage {
  body?: JSON;
  pathname?: string;
  id?: string;
}

export type THandler = (req: IRequest, res: IResponse) => void;

export interface IRouter {
  [path: string]: {
    [method: string]: THandler;
  };
}

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export enum Messages {
  serverError = "Internal server error",
  invalidBody = "Request body does not contain required fields",
  userDoesntExist = "User doesn't exist",
  invalidUserId = "User id is invalid",
  userDeleted = "User deleted",
}

export enum Codes {
  ok = 200,
  create = 201,
  delete = 204,
  invalid = 400,
  notFound = 404,
  serverError = 500,
}
