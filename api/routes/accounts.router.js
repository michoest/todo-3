import express from "express";

import { populate, getDbCollections } from "../db/db.js";
import { asyncWrapper } from "../utils/utils.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { Accounts } = getDbCollections();

  return res.json(Accounts.find());
});

router.get(
  "/:id/users",
  asyncWrapper(async (req, res, next) => {
    const { Users } = getDbCollections();

    const users = Users.find({ accounts: { $contains: req.params.id } });
    res.json({ users });
  })
);

router.get("/data", asyncWrapper(async (req, res, next) => {
    const { Users, Accounts, Tasks } = getDbCollections();
  
    if (req.user && req.account) {
      let tasks = Tasks.find({ accessAccounts: { $contains: req.account.id } });
      tasks = populate(
        Tasks,
        tasks,
        Accounts,
        "accessAccounts",
        "accessAccounts"
      );
      tasks = populate(Tasks, tasks, Accounts, "owner", "owner");
  
      let user = req.user;
      user = populate(Users, user, Accounts, "accounts", "accounts");
      user = _.pick(user, ["id", "email", "name", "accounts", "defaultAccount"]);
  
      let account = req.account;
  
      const accounts = Accounts.find();
  
      return res.json({ user, account, tasks, accounts });
    } else {
      return res
        .status(404)
        .json({ notification: { message: "Invalid token!" } });
    }
  }));

export default router;
