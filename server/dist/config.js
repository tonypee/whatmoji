"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useTunnel = process.env.LOCALDEV == "true";
exports.config = {
    dbConnectionString: {
        host: useTunnel
            ? "localhost"
            : "iot-production-database.cos815qpysaa.ap-southeast-2.rds.amazonaws.com",
        port: useTunnel ? 5432 : 5432,
        database: "whatmoji",
        user: "postgres",
        password: "whatmoji"
    },
    jwtSecret: "sssshok2"
};
//# sourceMappingURL=config.js.map