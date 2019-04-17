import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { verifyJWTToken } from './auth/helpers'
import { authController } from "./auth/auth.controller"
import { encryptionKeyPairController } from "./encrypt/keyPair.controller"
import { encryptController } from "./encrypt/encrypt.controller"

const router = express.Router()

router.all('*', function (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST' && req.url === '/sign-in') return next();

  verifyJWTToken(req.headers.authtoken)
    .then(encodedToken => {
      res.locals.currentUserEmail = encodedToken.email
      next();
    })
    .catch(error => {
      res.sendStatus(410);
    })
});

router.post('/sign-in', authController)
router.post('/generate-key-pair', encryptionKeyPairController)
router.post('/encrypt', encryptController)

router.get('/users', (req: Request, res: Response) => {
  const usersData = req.app.locals.usersData

  res.json({
    usersData
  })
})

export { router }