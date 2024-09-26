// Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { initDatabase, getDbCollections } from "./db/db.js";
import { verifyToken } from "./utils/jwtUtils.js";
import { asyncWrapper, APIError } from "./utils/utils.js";
import authRouter from "./routes/auth.js";
import usersAccountsRouter from "./routes/usersAccounts.js";
import tasksRouter from "./routes/tasks.js";

// Setup
dotenv.config();

const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(morgan("combined"));

// JWT Authentication middleware
app.use((req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer TOKEN
  if (token) {
    try {
      const { Users, Accounts, Tasks } = getDbCollections();
      const decoded = verifyToken(token);

      req.user = Users.findOne({ id: decoded.userId });
      req.account = Accounts.findOne({ id: decoded.accountId });
    } catch (error) {
      console.log(error);
      // Token is invalid, but we'll proceed without setting req.user or req.account
    }
  }
  next();
});

// Use routers
app.use("/auth", authRouter);
app.use("/users", usersAccountsRouter);
app.use("/tasks", tasksRouter);

// Routes
app.get(
  "/ping",
  asyncWrapper(async (req, res, next) => {
    return res.send("pong");
  })
);

app.post(
  "/subscribe",
  asyncWrapper(async (req, res, next) => {
    const { Users, Accounts } = getDbCollections();
    const subscription = req.body;

    // A client can only subscribe if there is a user logged in
    if (req.user) {
      // Insert or update existing subscription
      req.user.subscriptions[subscription.endpoint] = subscription.keys;
      Users.update(req.user);
    } else {
      throw new APIError("There must be a user logged in!");
    }

    if (req.account) {
      // Insert or update existing subscription
      req.account.subscriptions[subscription.endpoint] = subscription.keys;
      Accounts.update(req.account);
    }

    return res.json();
  })
);

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
app.get(
    "/vapid",
    asyncWrapper(async (req, res, next) => {
      res.json(vapidPublicKey);
    })
  );

// Error handling with APIError
app.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);

  return res.status(statusCode).json({
    success: false,
    notification: { message: err.message },
    ...err.info,
  });
});

const db = await initDatabase();
console.log("Database initialized, starting server...");

// Start the server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle server shutdown
const shutdown = async () => {
  console.log("Server is shutting down...");

  db.close();
  console.log("Database closed.");

  server.close();
  console.log("Server closed.");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
