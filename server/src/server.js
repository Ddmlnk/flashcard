import express from "express";
import cors from "cors";
import cardsRouter from "./routes/cards.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/cards", cardsRouter);

app.get("/api/helth", (req, res) => {
  res.json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Щось пішло не так" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
