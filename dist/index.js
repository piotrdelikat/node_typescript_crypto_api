"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
try {
    app_1.default.listen(process.env.PORT || 5500, () => {
        console.log(`✓ HTTP Server (${process.env.PORT || 5500})`);
    });
}
catch (err) {
    console.log(err);
}
//# sourceMappingURL=index.js.map