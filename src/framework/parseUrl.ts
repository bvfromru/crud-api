import { ServerResponse } from "http";
import { IRequest } from "../types";

export default (baseUrl: string) => (req: IRequest, res: ServerResponse) => {
  const parsedUrl = new URL(req.url!, baseUrl);

  req.pathname = parsedUrl.pathname;
};
