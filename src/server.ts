import Application from "./framework/Application";
import parseJson from "./framework/parseJson";
import parseUrl from "./framework/parseUrl";
import { usersRouter } from "./usersRouter";

export const startServer = (port: number, startMsg: string) => {
  const app = new Application();

  app.use(parseJson);
  app.use(parseUrl);
  app.addRouter(usersRouter);
  app.listen(port, () => {
    console.log(startMsg);
  });
};
