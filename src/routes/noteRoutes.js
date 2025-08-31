import express from "express";
import { getNotes, getNoteById } from "../controllers/noteControllers.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);

export default router;
