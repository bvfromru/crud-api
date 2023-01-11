import dotenv from "dotenv";
import { defaultPort } from "./constants";
import Application from "./framework/Application";
import parseJson from "./framework/parseJson";
import parseUrl from "./framework/parseUrl";
import { usersRouter } from "./usersRouter";

dotenv.config();
const PORT = Number(process.env.PORT) || defaultPort;

const app = new Application();

app.use(parseJson);
app.use(parseUrl);
app.addRouter(usersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
