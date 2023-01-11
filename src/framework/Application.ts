import EventEmitter from "events";
import { Server, createServer } from "http";
import { Codes, IRequest, IResponse, Messages, THandler } from "../types";
import Router from "./Router";

export default class Application {
  emitter: EventEmitter;
  server: Server;
  middlewares: THandler[];

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  public use(middleware: THandler) {
    this.middlewares.push(middleware);
  }

  public listen(port: number, callback: () => void) {
    this.server.listen(port, callback);
  }

  public addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];
          handler(req, res);
        });
      });
    });
  }

  private _createServer() {
    return createServer((req: IRequest, res: IResponse) => {
      try {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          try {
            if (body) {
              req.body = JSON.parse(body);
            }
            this.middlewares.forEach((middleware) => middleware(req, res));
            const emitted = this.emitter.emit(this._getRouteMask(req.pathname!, req.method!), req, res);
            if (!emitted) {
              res.send!(Messages.invalidEndpoint, Codes.notFound);
            }
          } catch (err) {
            res.writeHead(Codes.serverError);
            res.end(Messages.serverError);
          }
        });
      } catch (err) {
        // TODO Check if this working
        res.writeHead(Codes.serverError);
        res.end(Messages.serverError);
      }
    });
  }

  private _getRouteMask(path: string, method: string): string {
    return `[${path}]:[${method}]`;
  }
}
