const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbUrl = 'mongodb://localhost:27017/users';

export default function connectMongo() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(dbUrl, function (err, db) {
      if (err) {
        reject(err);
      } else {
        console.info('Connection established to', dbUrl);
        resolve(db);
      }
    });
  });
}

