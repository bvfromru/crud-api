import { ServerResponse } from "http";
import { endpoints } from "../constants.js";
import { IRequest } from "../types";

export default (req: IRequest, res: ServerResponse) => {
  let pathName = req.url!;
  if (pathName.endsWith("/")) {
    pathName = pathName.slice(0, pathName.length - 1);
  }

  Object.values(endpoints).forEach((endpoint) => {
    if (pathName.includes(endpoint)) {
      req.pathname = endpoint;
    }
    const id = pathName.replace(`/${endpoint}`, "");
    if (id) {
      req.id = id.slice(1);
    }
    console.log(req.pathname);
    console.log(req.id);
  });
};
