import express from "express";
import { getAllCards } from "../controllers/cardsController.js";

const router = express.Router();

router.get("/", getAllCards);

export default router;
