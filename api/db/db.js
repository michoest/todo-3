import loki from "lokijs";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Setup
dotenv.config();

const dbFile = process.env.DB_FILE;

let db;

export async function initDatabase() {
  db = new loki(dbFile, {
    autoload: true,
    autoloadCallback: databaseInitialized,
    autosave: true,
    autosaveInterval: 4000,
  });

  return db;
}

async function databaseInitialized() {
  let { Users, Accounts, Tasks } = getDbCollections();

  if (Users === null) {
    Users = db.addCollection("users", { indices: ["id", "email"] });
  }
  if (Accounts === null) {
    Accounts = db.addCollection("accounts", { indices: ["id"] });
  }
  if (Tasks === null) {
    Tasks = db.addCollection("tasks", { indices: ["id"] });
  }

  // If the collections are empty, load and process initial data
  if (Users.count() + Accounts.count() + Tasks.count() == 0) {
    const { default: initialData } = await import("./db.init.js");
    await loadInitialData(initialData);
  }

  console.log("Database initialized.");
}

async function loadInitialData(data) {
  const { Users, Accounts, Tasks } = getDbCollections();

  // Process and insert accounts first
  const accountIds = data.accounts.map((account) => {
    const accountObj = {
      id: uuid(),
      description: account.description,
      subscriptions: [],
    };
    Accounts.insert(accountObj);
    return accountObj.id;
  });

  // Process and insert users
  await Promise.all(
    data.users.map(async (user) => {
      const userObj = {
        id: uuid(),
        email: user.email,
        name: user.name,
        passwordHash: await bcrypt.hash(user.password, 10),
        accounts: user.accountIndices.map((index) => accountIds[index]),
        subscriptions: [],
      };
      Users.insert(userObj);
    })
  );

  // Process and insert tasks
  await Promise.all(
    data.tasks.map(async (task) => {
      const taskObj = {
        id: uuid(),
        title: task.title,
        tags: task.tags,
        status: task.status,
        owner: accountIds[task.ownerIndex],
        dueDate: new Date(task.dueDate),
        accessAccounts: task.accessIndices.map((index) => accountIds[index]),
      };
      Tasks.insert(taskObj);
    })
  );

  console.log("Initial data loaded.");
}

export function getDb() {
  return db;
}

export function getDbCollections() {
  const collections = {
    Users: "users",
    Accounts: "accounts",
    Tasks: "tasks",
  };

  return Object.fromEntries(
    Object.entries(collections).map(([key, value]) => [
      key,
      db.getCollection(value),
    ])
  );
}

export function populate(
  sourceCollection,
  sourceDoc,
  targetCollection,
  foreignKey,
  asProperty
) {
  if (Array.isArray(sourceDoc)) {
    return sourceDoc.map((doc) =>
      populate(sourceCollection, doc, targetCollection, foreignKey, asProperty)
    );
  }

  const populatedDoc = { ...sourceDoc };

  if (Array.isArray(sourceDoc[foreignKey])) {
    // Handle array of references
    populatedDoc[asProperty] = sourceDoc[foreignKey]
      .map((id) => targetCollection.findOne({ id: id }))
      .filter((doc) => doc !== null);
  } else {
    // Handle single reference
    const targetDoc = targetCollection.findOne({ id: sourceDoc[foreignKey] });
    if (targetDoc) {
      populatedDoc[asProperty] = targetDoc;
    }
  }

  return populatedDoc;
}
