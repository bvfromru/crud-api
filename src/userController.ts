import { IRequest, IResponse } from "./types";

const users = [
  { id: 1, name: "vasya" },
  { id: 2, name: "dima" },
];

const getUsers = (req: IRequest, res: IResponse) => {
  res.send!(users);
};

const createUser = (req: IRequest, res: IResponse) => {
  // if (req.body) {}
  console.log(req.body);
  const user = req.body;
  // users.push(user)
  res.send!(user);
};

export default {
  getUsers,
  createUser,
};
