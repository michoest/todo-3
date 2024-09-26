// routes/tasks.js
import express from "express";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import webpush from "web-push";

import { populate, getDbCollections } from "../db/db.js";
import { asyncWrapper } from "../utils/utils.js";

const router = express.Router();

dotenv.config();

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (!vapidPublicKey || !vapidPrivateKey) {
  console.error(
    "VAPID keys are not set. Please check your environment variables."
  );
  process.exit(1);
}

webpush.setVapidDetails(
  "mailto:mail@michoest.com",
  vapidPublicKey,
  vapidPrivateKey
);

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
    const notification = JSON.stringify({
      title: `Task ${task.title} updated`,
      body: JSON.stringify(req.body),
      data: task,
    });

    await Promise.all(
      Accounts.find({ id: { $in: task.accessAccounts } }).map(
        async (account) => {
            // console.log(account.subscriptions);
          await Promise.all(
            Object.entries(account.subscriptions).map(
              async ([endpoint, keys]) => {
                const subscription = { endpoint, keys };
                console.log(endpoint, req.pushEndpoint);
                if (endpoint != req.pushEndpoint) {
                    console.log(1);
                  try {
                    await webpush.sendNotification(subscription, notification);
                  } catch (err) {
                    console.log(`Pushing to ${subscription.endpoint} failed!`);
                    delete account.subscriptions[endpoint];
                  }
                }
              }
            )
          );
          Accounts.update(account);
        }
      )
    );

    task = populate(Tasks, task, Accounts, "accessAccounts", "accessAccounts");
    task = populate(Tasks, task, Accounts, "owner", "owner");

    return res.json({ task });
  })
);

export default router;
