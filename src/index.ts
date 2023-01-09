import dotenv from "dotenv";
import { IncomingMessage, ServerResponse, createServer } from "http";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(req.url);
  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/api/users":
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("Hi!");
          break;
      }
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
