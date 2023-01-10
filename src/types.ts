import { IncomingMessage, ServerResponse } from "http";

export interface IResponse extends ServerResponse {
  // TODO Get rid of "any"
  send?: (data: any) => void;
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
