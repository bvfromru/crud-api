import Router from "./framework/Router.js";
import userController from "./usersController.js";

export const usersRouter = new Router();

usersRouter.get("api/users", userController.getUsers);
usersRouter.post("api/users", userController.createUser);
usersRouter.put("api/users", userController.updateUser);
usersRouter.delete("api/users", userController.deleteUser);
