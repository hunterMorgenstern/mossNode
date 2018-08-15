import express from "express";
import setupMiddware from "./middleware";
import { restRouter, graphQLRouter } from "./api";
import { graphiqlExpress } from "apollo-server-express";
import { connect } from "./db";
import { signin, protect } from "./api/modules/auth";
// Declare an app from express
const app = express();

setupMiddware(app);

app.use("/api", protect, restRouter);
app.use("/graphql", graphQLRouter);
app.use("/docs", graphiqlExpress({ endpointURL: "/graphql" }));
app.get("/", (req, res) => {
  res.json({ ok: true });
});

export default app;
