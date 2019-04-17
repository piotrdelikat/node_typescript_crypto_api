"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const encryptionKeyPairController = function (req, res) {
    const { currentUserEmail } = res.locals;
    const { usersData } = res.app.locals;
    const { publicKey, privateKey } = helpers_1.generateRSAKeyPair();
    helpers_1.associatePubKeyWithUser(usersData, currentUserEmail, publicKey);
    const result = {
        "privKey": privateKey,
        "pubKey": publicKey
    };
    res.setHeader('Content-Type', 'application/json');
    return res.json(result);
};
exports.encryptionKeyPairController = encryptionKeyPairController;
//# sourceMappingURL=keyPair.controller.js.map