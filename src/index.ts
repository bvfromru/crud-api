import cluster from "cluster";
import dotenv from "dotenv";
import { startBalancer } from "./balancer";
import { DEFAULT_PORT } from "./constants";
import { startServer } from "./server";
import { IUser } from "./types";
import { setUsers } from "./usersDB";

dotenv.config();
const PORT = Number(process.env.PORT) || DEFAULT_PORT;

try {
  if (process.argv[2] === "--multi") {
    if (cluster.isPrimary) {
      startBalancer(PORT);
    } else {
      const WORKER_PORT = Number(process.env.WORKER_PORT);
      startServer(
        WORKER_PORT,
        `Worker process with pid: ${process.pid} started. Server is listening on port ${WORKER_PORT}`
      );
      process.on("message", (db: IUser[]) => {
        setUsers(db);
      });
    }
  } else {
    startServer(PORT, `Process with pid: ${process.pid} started. Server is listening on port ${PORT}`);
  }
} catch (err) {
  console.log(err);
}
