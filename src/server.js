import express from "express";
import setupMiddware from "./middleware";
import { restRouter } from "./api";
import { connect } from "./db";
import { signin, protect } from "./api/modules/auth";
// Declare an app from express
const app = express();

setupMiddware(app);

app.use("/api", protect, restRouter);
app.get("/", (req, res) => {
  res.json({ ok: true });
});

export default app;
