import connectMongo from './connectMongo';
import partial from 'partial-any';
import { hashPassword } from './doBcrypt';

function mongoFind(collection, query) {
  return new Promise(function(resolve, reject) {
    collection.find(query).toArray((err, results) => {
      if (err) {
        reject('mongoFind ERR:', err);
      } else {
        resolve(results);
      }
    });
  });
}
export default function registerNewUser(user) {
  return new Promise(function(resolve, reject) {
    connectMongo()
      .then(db => {
        let collection = db.collection('users');
        // Perform validation here
        mongoFind(collection, {email: user.email})
          .then(results => {
            if (results.length > 0) {
              reject('Registration ERR: Email address already in use');
            } else {
              console.info('Attempting to register:', user);
              hashPassword(user.password)
                .then(hash => {
                  const insertUser = {
                    name: user.name,
                    email: user.email,
                    hashedPassword: hash
                  }
                  collection.insert(insertUser, (err, results) => {
                    if (err) {
                      reject('collection.insert Error:', err)
                      return;
                    } else {
                      resolve(results);
                    }
                  });
                })
                .catch(partial(console.error, 'hashPassword ERR:'));
            }
          })
          .catch(partial(console.error, 'Registration ERR:'));
      });
    });
}
