"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isLocal = process.env.LOCALDEV == "true";
exports.config = {
    dbConnectionString: {
        host: "localhost",
        port: 5432,
        database: "whatmoji",
        user: "postgres",
        password: "whatmoji"
    },
    jwtSecret: "sssshok2"
};
//# sourceMappingURL=config.js.map