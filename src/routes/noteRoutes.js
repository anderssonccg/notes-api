import express from "express";
import {
  getNotes,
  getNoteById,
  createNote,
} from "../controllers/noteControllers.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);

export default router;
