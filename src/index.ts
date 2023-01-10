import dotenv from "dotenv";
import { defaultPort } from "./constants.js";
import Application from "./framework/Application.js";
import parseJson from "./framework/parseJson.js";
import parseUrl from "./framework/parseUrl.js";
import { usersRouter } from "./usersRouter.js";

dotenv.config();
const PORT = Number(process.env.PORT) || defaultPort;

const app = new Application();

app.use(parseJson);
app.use(parseUrl);
app.addRouter(usersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
