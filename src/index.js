import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./prismaClient.js";
import noteRoutes from "./routes/noteRoutes.js";
import colorRoutes from "./routes/colorRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PATH = "/api/v1";

app.use(PATH + "/notes", noteRoutes);
app.use(PATH + "/colors", colorRoutes);
app.use(PATH + "/tags", tagRoutes);

connect();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running`);
});
