import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
dotenv.config();
import noteRouter from "./routes/noteRoutes.js";

connectDB();

const app = express();
const PORT = process.env.PORT || 3330;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Home");
});

app.use("/api/notes", noteRouter);

app.get("*", (req, res) => {
  return res.status(404).send("<h1>Sorry, page not found!</h1>");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
