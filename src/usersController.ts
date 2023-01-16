import { v4 as uuidv4 } from "uuid";
import { Codes, IRequest, IResponse, IUser, Messages } from "./types";
import { users } from "./usersDB";
import { validateUserData, validateUserId } from "./utils";

const usersController = {
  getUsers(req: IRequest, res: IResponse) {
    const userId = req.id;
    if (!userId) {
      return res.send!(users, Codes.ok);
    }
    if (!validateUserId(userId)) {
      return res.send!(Messages.invalidUserId, Codes.invalid);
    } else {
      const user = users.find((user) => user.id === userId);
      if (user) {
        return res.send!(user, Codes.ok);
      } else {
        return res.send!(Messages.userDoesntExist, Codes.notFound);
      }
    }
  },

  createUser(req: IRequest, res: IResponse) {
    if (req.body) {
      // TODO change typization below
      const user = req.body as unknown as IUser;
      if (validateUserData(user)) {
        user.id = uuidv4();
        users.push(user);
        // process.send!(users);
        return res.send!(user, Codes.create);
      }
    }
    return res.send!(Messages.invalidBody, Codes.invalid);
  },

  updateUser(req: IRequest, res: IResponse) {
    const userId = req.id;
    if (!userId || !validateUserId(userId)) {
      return res.send!(Messages.invalidUserId, Codes.invalid);
    }
    if (req.body) {
      // TODO change typization below
      const user = req.body as unknown as IUser;
      if (validateUserData(user)) {
        user.id = userId;
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex > -1) {
          users[userIndex] = user;
          return res.send!(user, Codes.ok);
        } else {
          return res.send!(Messages.userDoesntExist, Codes.notFound);
        }
      }
    }
    return res.send!(Messages.invalidBody, Codes.invalid);
  },

  deleteUser(req: IRequest, res: IResponse) {
    const userId = req.id;
    if (!userId || !validateUserId(userId)) {
      return res.send!(Messages.invalidUserId, Codes.invalid);
    } else {
      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex > -1) {
        users.splice(userIndex, 1);
        return res.send!(Messages.userDeleted, Codes.delete);
      } else {
        return res.send!(Messages.userDoesntExist, Codes.notFound);
      }
    }
  },
};

export default usersController;
