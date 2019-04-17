"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env.NODE_ENV || 'local';
const config = require(`./${env}.js`);
exports.default = config;
//# sourceMappingURL=index.js.map