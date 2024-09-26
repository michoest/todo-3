// routes/tasks.js
import express from "express";
import _ from "lodash";
import { v4 as uuid } from "uuid";

import { populate, getDbCollections } from "../db/db.js";
import { asyncWrapper } from "../utils/utils.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { Tasks } = getDbCollections();

  res.json(Tasks.find());
});

router.post("/", (req, res) => {
  const { Accounts, Tasks } = getDbCollections();

  const { title, tags, status, ownerId, dueDate, accessAccounts } = req.body;

  const owner = Accounts.findOne({ id: ownerId });
  if (!owner) {
    return res.status(400).json({ error: "Owner account not found" });
  }

  const newTask = {
    id: uuid(),
    title,
    tags,
    status,
    ownerId,
    dueDate: new Date(dueDate),
    accessAccounts,
  };

  Tasks.insert(newTask);

  return res.status(201).json(newTask);
});

router.put(
  "/:id",
  asyncWrapper(async (req, res, next) => {
    const { Tasks, Accounts } = getDbCollections();

    let task = Tasks.findOne({ id: req.params.id });
    _.assign(task, req.body);
    Tasks.update(task);

    // Notify all affected subscriptions (except the current one)

    const notification = {
      title: `Task ${task.title} updated`,
      body: JSON.stringify(req.body),
      data: task
    };
    await Promise.all(
      _.flatten(
        Accounts.find({ id: { $in: task.accessAccounts } }).map(
          (account) => account.subscriptions
        )
      ).map(async (subscription) => {
        if (true) {
          await webpush.sendNotification(
            subscription,
            JSON.stringify(notification)
          );
          console.log('Sending notification...');
        }
      })
    );

    task = populate(Tasks, task, Accounts, "accessAccounts", "accessAccounts");
    task = populate(Tasks, task, Accounts, "owner", "owner");

    return res.json({ task });
  })
);

export default router;
