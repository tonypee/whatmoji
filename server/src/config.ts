const isLocal = process.env.LOCALDEV == "true";

export const config = {
  dbConnectionString: {
    host: "localhost",
    port: 5432,
    database: "whatmoji", //postgres,
    user: "postgres", //"api_accessor",
    password: "whatmoji" //"secret"
  },
  jwtSecret: "sssshok2"
};
