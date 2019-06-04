"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (app) {
    app.get("/", function (req, res) {
        console.log("-- / (health)");
        res.status(200).json({ status: "ok" });
    });
    return function (req, res, next) {
        next();
    };
});
//# sourceMappingURL=index.js.map