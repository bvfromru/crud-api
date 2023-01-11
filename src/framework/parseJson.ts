import { IncomingMessage } from "http";
import { IResponse } from "../types";

export default (req: IncomingMessage, res: IResponse): void => {
  res.send = (data: any, code: number): void => {
    res.writeHead(code, { "Content-type": "application/json" });
    res.end(JSON.stringify(data));
  };
};
