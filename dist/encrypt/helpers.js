"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findIndex_1 = __importDefault(require("lodash/findIndex"));
const crypto_1 = __importDefault(require("crypto"));
function associatePubKeyWithUser(usersData, currentUserEmail, publicKey) {
    const userIndex = findIndex_1.default(usersData, { 'email': currentUserEmail });
    if (userIndex > -1) {
        usersData[userIndex].pubKey = publicKey;
    }
}
exports.associatePubKeyWithUser = associatePubKeyWithUser;
function generateRSAKeyPair() {
    return crypto_1.default.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'top secret'
        }
    });
}
exports.generateRSAKeyPair = generateRSAKeyPair;
function getCurrentUser(usersData, currentUserEmail) {
    return usersData[findIndex_1.default(usersData, { 'email': currentUserEmail })];
}
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=helpers.js.map