"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const router_1 = require("./router");
class App {
    constructor() {
        this.usersData = [];
        this.express = express_1.default();
        this.express.locals.usersData = this.usersData;
        this.configureMiddleware(this.express);
        this.mountRoutes();
    }
    configureMiddleware(app) {
        app.use(bodyParser.json());
    }
    mountRoutes() {
        this.express.use('/api', router_1.router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map