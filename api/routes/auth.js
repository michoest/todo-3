import express from "express";
import bcrypt from "bcrypt";
import _ from "lodash";

import { generateToken } from "../utils/jwtUtils.js";
import { asyncWrapper, APIError } from "../utils/utils.js";
import { populate, getDbCollections } from "../db/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { Users, Accounts, Tasks } = getDbCollections();

  const { email, password } = req.body;
  let user = Users.findOne({ email });

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    const account = user.defaultAccount
      ? Accounts.findOne({ id: user.defaultAccount })
      : null;
    const token = generateToken(user.id, account?.id);

    user = populate(Users, user, Accounts, "accounts", "accounts");
    user = _.pick(user, ["id", "email", "name", "accounts", "defaultAccount"]);

    if (account) {
      const tasks = Tasks.find({ accessAccounts: { $contains: account.id } });

      return res.json({ user, account, token, tasks });
    } else {
      return res.json({ user, token });
    }
  } else {
    return res
      .status(401)
      .json({ notification: { message: "Invalid credentials" } });
  }
});

router.post("/login/account", async (req, res) => {
  const { Users, Accounts, Tasks } = getDbCollections();

  if (req.user) {
    const { accountId, setAsDefaultAccount } = req.body;

    if (req.user.accounts.includes(accountId)) {
      const account = Accounts.findOne({ id: accountId });

      if (account) {
        if (setAsDefaultAccount) {
          req.user.defaultAccount = accountId;

          Users.update(req.user);
        }

        const token = generateToken(req.user.id, account.id);

        let tasks = Tasks.find({ accessAccounts: { $contains: account.id } });
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
        user = _.pick(user, [
          "id",
          "email",
          "name",
          "accounts",
          "defaultAccount",
        ]);

        return res.json({ user, account, token, tasks });
      } else {
        return res
          .status(404)
          .json({ notification: { message: "Account not found" } });
      }
    } else {
      return res
        .status(401)
        .json({ notification: { message: "Not authorized" } });
    }
  } else {
    return res
      .status(401)
      .json({ notification: { message: "Invalid credentials" } });
  }
});

router.post("/logout", (req, res) => {
  // JWT doesn't require server-side logout, but you can implement token invalidation if needed
  res.send("Logged out successfully");
});

router.post(
  "/default",
  asyncWrapper(async (req, res, next) => {
    const { Users } = getDbCollections();

    if (req.body.id == null || req.user.accounts.includes(req.body.id)) {
      req.user.defaultAccount = req.body.id;
      Users.update(req.user);

      return res.json();
    } else {
      throw new APIError("Invalid account!");
    }
  })
);

router.get("/data", async (req, res, next) => {
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

    return res.json({ user, account, tasks });
  } else {
    return res
      .status(404)
      .json({ notification: { message: "Invalid token!" } });
  }
});

export default router;
