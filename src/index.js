import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./prismaClient.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/notes", noteRoutes);

connect();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
