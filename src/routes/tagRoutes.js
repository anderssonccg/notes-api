import express from "express";
import {
  createTag,
  deleteTag,
  getTagById,
  getTags,
  updateTag,
} from "../controllers/tagsController.js";

const router = express.Router();

router.get("/", getTags);
router.get("/:id", getTagById);
router.post("/", createTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;
