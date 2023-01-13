import cluster, { Worker } from "cluster";
import dotenv from "dotenv";
import { createServer, request } from "http";
import { defaultPort } from "./constants";
import Application from "./framework/Application";
import parseJson from "./framework/parseJson";
import parseUrl from "./framework/parseUrl";
import { IUser } from "./types";
import { setUsers } from "./usersDB";
import { usersRouter } from "./usersRouter";

dotenv.config();
const PORT = Number(process.env.PORT) || defaultPort;
const workers: Worker[] = [];
let currentWorkerID = 0;
const numCPUs = require("os").cpus().length;

if (process.argv[2] === "--multi") {
  // Multi thread mode

  // For Master process
  if (cluster.isPrimary) {
    console.log(`Multi cluster mode enabled. Number of CPUs is ${numCPUs} and that's great!`);

    for (let i = 0; i < numCPUs; i++) {
      const fork = cluster.fork({ WORKER_PORT: PORT + i + 1 });
      workers.push(fork);
    }

    // This event is fire when worker died
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });

    createServer(async (req, res) => {
      req.pipe(
        request(
          `http://localhost:${Number(PORT) + currentWorkerID + 1}${req.url}`,
          { method: req.method, headers: req.headers },
          (resp) => resp.pipe(res)
        )
      );

      if (currentWorkerID === numCPUs - 1) {
        currentWorkerID = 0;
      } else {
        currentWorkerID += 1;
      }
    }).listen(PORT, () => {
      console.log(`Main process with pid: ${process.pid} started. Main server is listening on port ${PORT}.`);
      console.log("Please wait few seconds to start worker processes...");
    });

    cluster.on("message", (_, db: IUser[]) => {
      workers.forEach((w) => w.send(db));
    });
  }

  // For Worker
  else {
    const app = new Application();

    app.use(parseJson);
    app.use(parseUrl);
    app.addRouter(usersRouter);
    const WORKER_PORT = Number(process.env.WORKER_PORT);
    app.listen(WORKER_PORT, () => {
      console.log(`Worker process with pid: ${process.pid} started. Server is listening on port ${WORKER_PORT}`);
    });
    process.on("message", (db: IUser[]) => {
      setUsers(db);
    });
  }
} else {
  // Single thread mode
  const app = new Application();

  app.use(parseJson);
  app.use(parseUrl);
  app.addRouter(usersRouter);
  app.listen(PORT, () => {
    console.log(`Process with pid: ${process.pid} started. Server is listening on port ${PORT}`);
  });
}
