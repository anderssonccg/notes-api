import express from "express";
import { getBackgrounds } from "../controllers/backgroundControllers.js";

const router = express.Router();

router.get("/", getBackgrounds);

export default router;
