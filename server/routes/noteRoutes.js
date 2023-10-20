import express from "express";
import { createNote, getAllNotes } from "../controllers/noteControllers.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getAllNotes);

export default router;
