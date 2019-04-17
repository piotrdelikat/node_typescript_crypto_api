import { Request, Response } from 'express';
import { associatePubKeyWithUser, generateRSAKeyPair } from './helpers';

const encryptionKeyPairController = function (req: Request, res: Response) {
  const { currentUserEmail } = res.locals;
  const { usersData } = res.app.locals;

  const { publicKey, privateKey } = generateRSAKeyPair();
  associatePubKeyWithUser(usersData, currentUserEmail, publicKey);

  const result = {
    "privKey": privateKey,
    "pubKey": publicKey
  }
  res.setHeader('Content-Type', 'application/json');
  return res.json(result)
}

export { encryptionKeyPairController };