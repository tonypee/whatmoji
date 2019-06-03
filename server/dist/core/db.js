"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var knex_1 = __importDefault(require("knex"));
exports.knex = knex_1.default({
    client: "pg",
    connection: config_1.config.dbConnectionString
});
//# sourceMappingURL=db.js.map