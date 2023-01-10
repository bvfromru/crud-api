import { IncomingMessage } from "http";
import { IResponse } from "../types";

export default (req: IncomingMessage, res: IResponse): void => {
  res.send = (data): void => {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(data));
  };
};
