"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
var apollo_server_core_1 = require("apollo-server-core");
var model_1 = require("./model");
var graphql_type_json_1 = __importDefault(require("graphql-type-json"));
var graphql_iso_date_1 = require("graphql-iso-date");
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: apollo_server_core_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    scalar DateTime\n\n    scalar JSON\n\n    type User {\n      id: Int!\n      fbid: String\n      name: String\n      joined: String\n    }\n\n    type Emoji {\n      emoji: String\n      votes: Int\n      name: String\n      names: [Name]\n    }\n\n    type Name {\n      name: String\n      creator: User\n      votes: Int\n      created: DateTime\n    }\n\n    # API\n\n    type Query {\n      getEmojis: [Emoji]\n      getEmoji(emoji: String): Emoji\n      test: Boolean\n    }\n\n    type Mutation {\n      addVote(input: AddNameInput): Name\n    }\n\n    # Inputs\n\n    input AddNameInput {\n      emoji: String\n      name: String\n    }\n\n    input VoteInput {\n      emoji: String\n      name: String\n    }\n  "], ["\n    scalar DateTime\n\n    scalar JSON\n\n    type User {\n      id: Int!\n      fbid: String\n      name: String\n      joined: String\n    }\n\n    type Emoji {\n      emoji: String\n      votes: Int\n      name: String\n      names: [Name]\n    }\n\n    type Name {\n      name: String\n      creator: User\n      votes: Int\n      created: DateTime\n    }\n\n    # API\n\n    type Query {\n      getEmojis: [Emoji]\n      getEmoji(emoji: String): Emoji\n      test: Boolean\n    }\n\n    type Mutation {\n      addVote(input: AddNameInput): Name\n    }\n\n    # Inputs\n\n    input AddNameInput {\n      emoji: String\n      name: String\n    }\n\n    input VoteInput {\n      emoji: String\n      name: String\n    }\n  "]))),
    resolvers: {
        DateTime: graphql_iso_date_1.GraphQLDateTime,
        JSON: graphql_type_json_1.default,
        Query: {
            getEmojis: function (root, _a) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, model_1.model.getEmojis()];
                        case 1: return [2, _b.sent()];
                    }
                });
            }); },
            getEmoji: function (root, _a) {
                var emoji = _a.emoji;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, model_1.model.getEmoji(emoji)];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            },
            test: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, model_1.model.test()];
                        case 1: return [2, _a.sent()];
                    }
                });
            }); }
        },
        Mutation: {
            addVote: function (root, _a) {
                var input = _a.input;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, model_1.model.addVote(input.emoji, input.name, 2)];
                            case 1: return [2, _b.sent()];
                        }
                    });
                });
            }
        }
    }
});
var templateObject_1;
//# sourceMappingURL=schema.js.map