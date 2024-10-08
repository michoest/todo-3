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
  let { Accounts, Users, Tasks, Projects } = getDbCollections();

  if (Tasks === null) {
    Tasks = db.addCollection("tasks", { indices: ["id"] });
  }
  if (Projects === null) {
    Projects = db.addCollection("projects", { indices: ["id"] });
  }
  if (Accounts === null) {
    Accounts = db.addCollection("accounts", { indices: ["id"] });
  }
  if (Users === null) {
    Users = db.addCollection("users", { indices: ["id", "email"] });
  }

  // If the collections are empty, load and process initial data
  if (Users.count() + Accounts.count() + Tasks.count() + Projects.count == 0) {
    const { default: initialData } = await import("./db.init.old.js");
    await loadInitialData(initialData);
  }

  console.log("Database initialized.");
}

async function loadInitialData(data) {
  const { Users, Accounts, Tasks, Projects } = getDbCollections();

  // Process and insert accounts first
  const accountIds = data.accounts.map((account) => {
    const accountObj = {
      id: uuid(),
      name: account.name,
      subscriptions: {},
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
        accounts: user.accounts.map((account) => ({
          description: account.description,
          account: accountIds[account.accountIndex],
        })),
        subscriptions: {},
      };
      Users.insert(userObj);
    })
  );

  // Process and insert tasks
  const taskIds = data.tasks.map((task) => {
    const taskObj = {
      id: uuid(),
      title: task.title,
      details: task.details,
      tags: task.tags,
      links: task.links,
      owner: accountIds[task.ownerIndex],
      due: new Date(task.due),
      status: task.status,
    };
    Tasks.insert(taskObj);
    return taskObj.id;
  });

  // Process and insert projects
  data.projects.map(project => {
    const projectObj = {
      id: uuid(),
      name: project.name,
      details: project.details,
      tasks: project.taskIndices.map(index => taskIds[index]),
      members: project.memberIndices.map(index => memberIds[index]),
    };
    Projects.insert(projectObj);
  });

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
    Projects: "projects"
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
