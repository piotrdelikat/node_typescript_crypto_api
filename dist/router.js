"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("./auth/helpers");
const auth_controller_1 = require("./auth/auth.controller");
const keyPair_controller_1 = require("./encrypt/keyPair.controller");
const encrypt_controller_1 = require("./encrypt/encrypt.controller");
const router = express_1.default.Router();
exports.router = router;
router.all('*', function (req, res, next) {
    if (req.method === 'POST' && req.url === '/sign-in')
        return next();
    helpers_1.verifyJWTToken(req.headers.authtoken)
        .then(encodedToken => {
        res.locals.currentUserEmail = encodedToken.email;
        next();
    })
        .catch(error => {
        res.sendStatus(410);
    });
});
router.post('/sign-in', auth_controller_1.authController);
router.post('/generate-key-pair', keyPair_controller_1.encryptionKeyPairController);
router.post('/encrypt', encrypt_controller_1.encryptController);
router.get('/users', (req, res) => {
    const usersData = req.app.locals.usersData;
    res.json({
        usersData
    });
});
//# sourceMappingURL=router.js.map