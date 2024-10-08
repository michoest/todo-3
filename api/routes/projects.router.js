import express from "express";

import { populate, getDbCollections } from "../db/db.js";
import { asyncWrapper } from "../utils/utils.js";

const router = express.Router();

export default router;
