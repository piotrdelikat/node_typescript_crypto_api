"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("./helpers");
const Crypt = require('hybrid-crypto-js').Crypt;
const crypt = new Crypt();
const pdfFilePath = path_1.default.join(__dirname, '..', '..', 'files', 'sample.pdf');
const encryptController = function (req, res) {
    const { currentUserEmail } = res.locals;
    const { usersData } = res.app.locals;
    const currentUser = helpers_1.getCurrentUser(usersData, currentUserEmail);
    if (currentUser && currentUser.pubKey) {
        fs_1.default.readFile(pdfFilePath, (err, pdfBuffer) => {
            if (err) {
                res.json({ "message": "Unable to load file" });
            }
            const buffer = Buffer.from(pdfBuffer);
            const encrypted = crypt.encrypt(currentUser.pubKey, buffer);
            const encryptedPdfContent = JSON.parse(encrypted).cipher;
            res.send(encryptedPdfContent.toString("base64"));
        });
    }
    else {
        res.json({ "message": "First generate encryption keys" });
    }
};
exports.encryptController = encryptController;
//# sourceMappingURL=encrypt.controller.js.map