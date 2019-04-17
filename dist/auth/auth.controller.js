"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("./helpers");
const config_1 = __importDefault(require("./../config"));
const { JWT_SECRET, expiresIn } = config_1.default;
const authController = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            req.app.locals.usersData.push({ email, password: yield helpers_1.getEncryptedPassword(password) });
            const payload = {
                "email": email
            };
            const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
            res.setHeader('Content-Type', 'application/json');
            res.send({ 'authToken': token });
        }
        catch (error) {
            throw error;
        }
    });
};
exports.authController = authController;
//# sourceMappingURL=auth.controller.js.map