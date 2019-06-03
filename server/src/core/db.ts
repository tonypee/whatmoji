import { config } from "../config";
import { default as knexFactory } from "knex";

export const knex = knexFactory({
  client: "pg",
  connection: config.dbConnectionString
});
