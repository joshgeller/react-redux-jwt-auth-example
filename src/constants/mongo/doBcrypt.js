import bcrypt from 'bcrypt';

function hashPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  });
}

function checkPassword(password, hash) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, hash, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export default {
  hashPassword,
  checkPassword
}
