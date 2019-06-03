const useTunnel = process.env.LOCALDEV == "true";

export const config = {
  dbConnectionString: {
    host: useTunnel
      ? "localhost"
      : "iot-production-database.cos815qpysaa.ap-southeast-2.rds.amazonaws.com",
    port: useTunnel ? 5432 : 5432,
    database: "whatmoji", //postgres,
    user: "postgres", //"api_accessor",
    password: "whatmoji" //"secret"
  },
  jwtSecret: "sssshok2"
};
