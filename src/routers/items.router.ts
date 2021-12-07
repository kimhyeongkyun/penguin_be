/**
 * Required External Modules and Interfaces
 */
import express from "express";
import { create, find, findAll, remove, update } from "../controllers/item.controller";
import { checkJwt } from "../middleware/authz.middleware";

/**
 * Router Definition
 */
export const itemRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemRouter.get("/",findAll);
// Protected API endpoints
// itemRouter.use(authorizationFunction);

// GET items/:id
itemRouter.get("/:id",find);

// POST items
itemRouter.post("/", create);

// PUT items/:id
itemRouter.put("/:id", update);

// DELETE items/:id
itemRouter.delete("/:id", remove);

