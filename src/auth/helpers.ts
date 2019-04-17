import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from './../config';
const { JWT_SECRET } = config
const saltRounds = 12;

export async function getEncryptedPassword(password: string): Promise<string> {
  try {
    return await Bcrypt.hash(password, saltRounds);
  }
  catch (err) {
    throw err;
  }
};

export function verifyJWTToken(token): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err)
      }
      resolve(decodedToken)
    })
  })
}