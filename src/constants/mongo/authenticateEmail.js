'use strict';
import connectMongo from './connectMongo';
import partial from 'partial-any';
import { checkPassword } from './doBcrypt';
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

export default function authenticateEmail(email, password) {
  console.info(`Attempting to authenticate ${email} : ${password}`)
  return new Promise(function(resolve, reject) {
    connectMongo()
      .then(db => {
        let collection = db.collection('users');
        collection.find({email: email}).limit(1).toArray((err, documents) => {
          if (err) {
            reject('collection.find Error:', err)
          } else {
            if (!documents.length) {
              reject('Authentication Error: No user with that email');
            } else {
              let record = documents[0];
              checkPassword(password, record.hashedPassword)
                .then(isGoodPassword => {
                  const payload = {
                      userName: record.name
                  };
                  const token = jwt.sign(payload, 'secret-key');
                  return Promise.resolve(token);
                })
                .then(resolve)
                .catch(partial(reject, 'Authentication Error: Invalid Password'));
            }
          }
        });
      })
      .catch(partial(console.error, 'Authentication Error:'))
  });
}
