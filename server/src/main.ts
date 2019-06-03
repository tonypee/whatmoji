import express from "express";
import cors from "cors";
import rest from "./rest";
import apollo from "./apollo";
import bodyParser from "body-parser";

const port = process.env.LOCALDEV == "true" ? 4001 : 80;
const host = "0.0.0.0";

const app = express();
app["restPath"] = "/";
app.use(bodyParser.json());
app.use(cors());
app.use(rest(app));
app.use(apollo(app));

app.listen({ port, host }, () => {
  console.log(`Running on http://${port}:${host}`);
});
