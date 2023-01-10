import dotenv from "dotenv";
import Application from "./framework/Application.js";
import parseJson from "./framework/parseJson.js";
import parseUrl from "./framework/parseUrl.js";
import { userRouter } from "./userRouter.js";

dotenv.config();
const PORT = Number(process.env.PORT) || 5000;

const app = new Application();

app.use(parseJson);
// TODO Change magic string
app.use(parseUrl("http://localhost:4000"));

app.addRouter(userRouter);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
