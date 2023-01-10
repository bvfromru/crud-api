import Router from "./framework/Router.js";
import userController from "./userController.js";

export const userRouter = new Router();

userRouter.get("/api/users", userController.getUsers);

userRouter.post("/api/users", userController.createUser);
