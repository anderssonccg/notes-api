import express from "express";
import { getFonts } from "../controllers/fontControllers.js";

const router = express.Router();

router.get("/", getFonts);

export default router;
