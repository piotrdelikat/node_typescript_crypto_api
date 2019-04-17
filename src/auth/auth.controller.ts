import JWT from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from './../models/user';
import { TokenPayload } from './../models/tokenPayload';
import { getEncryptedPassword } from './helpers';
import config from './../config';
const { JWT_SECRET, expiresIn } = config

const authController = async function (req: Request, res: Response) {
  try {
    const { email, password }: User = req.body

    req.app.locals.usersData.push({ email, password: await getEncryptedPassword(password) })

    const payload: TokenPayload = {
      "email": email
    }

    const token = JWT.sign(payload, JWT_SECRET, { expiresIn: expiresIn });

    res.setHeader('Content-Type', 'application/json');
    res.send({ 'authToken': token });

  } catch (error) {
    throw error;
  }
}

export { authController };

