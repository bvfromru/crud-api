import { createServer, IncomingMessage, ServerResponse } from "http";

const HOST = "localhost";
const PORT = 8000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log("first");
});

server.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});
