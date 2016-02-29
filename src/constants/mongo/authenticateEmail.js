'use strict';
import connectMongo from './connectMongo';
import partial from 'partial-any';
import { checkPasswordAgainstRecord } from './doBcrypt';
import fs from 'fs';
import path from 'path';
const jwt = require('jsonwebtoken');
// function executor(collection, operation, payload, resolve, reject) {
//   collection[operation](payload, (err, result) => {
//     if (err) {
//       reject(result);
//     } else {
//       resolve(result);
//     }
//   });
// }
// function insertUsers(collection, users) {
//   return new Promise(partial(executor, collection, 'insert', users));
// }

function debug(...args) {
  console.error('DEBUG:', ...args);
}

function checkEmailPromise(email, db) {
  return new Promise(function(resolve, reject) {
    debug('Promise 1: Getting Documents');
    let collection = db.collection('users');
    collection.find({email: email}).limit(1).toArray((err, documents) => {
      if (err) {
        reject(err)
      } else {
        if (!documents.length) {
          reject('Authentication Error: No user with that email');
        } else {
          resolve(documents[0]);
        }
      }
    });
  })
}

function signJWTPromise(payload) {
  debug('Promise 3: Got Payload', payload);
  if (!payload) {
    return Promise.reject('Invalid Payload');
  }
  return new Promise(function(resolve, reject) {
    debug('Promise 3.5: Signing with secret key');
    fs.readFile(path.resolve('src/constants/mongo/secretKey.pem'), 'utf-8', (error, secret) => {
      if (error) {
        reject('Error reading secret key' + error);
      } else {
        debug('Loaded secret key:', secret);
        const token = jwt.sign(payload, secret);
        resolve(token);
      }
    });
  });
}

export default function authenticateEmail(email, password) {
  console.info(`Attempting to authenticate ${email} : ${password}`)
  return new Promise(function(resolve, reject) {
    connectMongo().then(db => {
      checkEmailPromise(email, db).then(record => {
        checkPasswordAgainstRecord(password, record).then(payload => {
          signJWTPromise(payload).then(resolve, reject)
        }, reject);
      }, reject);
    }, reject);
  });
}
