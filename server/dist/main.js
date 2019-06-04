"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var rest_1 = __importDefault(require("./rest"));
var apollo_1 = __importDefault(require("./apollo"));
var body_parser_1 = __importDefault(require("body-parser"));
var port = process.env.PORT || 4001;
var host = "0.0.0.0";
var app = express_1.default();
app["restPath"] = "/";
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(rest_1.default(app));
app.use(apollo_1.default(app));
app.listen({ port: port, host: host }, function () {
    console.log("Running on http://" + port + ":" + host);
});
//# sourceMappingURL=main.js.map