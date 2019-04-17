import findIndex from 'lodash/findIndex'
import crypto from 'crypto';
import { User } from './../models/user';

export function associatePubKeyWithUser(usersData: User[], currentUserEmail: string, publicKey: string): void {
  const userIndex = findIndex(usersData, { 'email': currentUserEmail })
  if (userIndex > -1) {
    usersData[userIndex].pubKey = publicKey
  }
}

export function generateRSAKeyPair() {
  return crypto.generateKeyPairSync('rsa', {
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

export function getCurrentUser(usersData: User[], currentUserEmail: string) {
  return usersData[findIndex(usersData, { 'email': currentUserEmail })];
}