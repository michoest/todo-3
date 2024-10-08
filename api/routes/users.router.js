import express from "express";

import { populate, getDbCollections } from "../db/db.js";
import { asyncWrapper } from "../utils/utils.js";

const router = express.Router();

router.get("/users", (req, res) => {
  const users = req.db.getCollection("users");
  res.json(users.find());
});

router.get("/accounts", (req, res) => {
  const accounts = req.db.getCollection("accounts");
  res.json(accounts.find());
});

router.get("/account/:id/users", asyncWrapper(async (req, res, next) => {
    const { Users } = getDbCollections();
    
    const users = Users.find({ accounts: { '$contains': req.params.id } });
    res.json({ users });
  }));

// Add more routes for user and account management

export default router;
