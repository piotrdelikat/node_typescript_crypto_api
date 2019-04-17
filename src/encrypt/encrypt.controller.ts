import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { getCurrentUser } from './helpers';
const Crypt = require('hybrid-crypto-js').Crypt;
const crypt = new Crypt();

const pdfFilePath = path.join(__dirname, '..', '..', 'files', 'sample.pdf');

const encryptController = function (req: Request, res: Response) {
  const { currentUserEmail } = res.locals;
  const { usersData } = res.app.locals;

  const currentUser = getCurrentUser(usersData, currentUserEmail);

  if (currentUser && currentUser.pubKey) {
    fs.readFile(pdfFilePath, (err, pdfBuffer) => {
      if (err) {
        res.json({ "message": "Unable to load file" })
      }

      const buffer = Buffer.from(pdfBuffer);
      const encrypted = crypt.encrypt(currentUser.pubKey, buffer);
      const encryptedPdfContent = JSON.parse(encrypted).cipher;

      res.send(encryptedPdfContent.toString("base64"));
    });
  } else {
    res.json({ "message": "First generate encryption keys" })
  }
}

export { encryptController };