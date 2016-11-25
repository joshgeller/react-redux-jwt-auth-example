import bcrypt from 'bcrypt';

function debug(...args) {
  console.error('DEBUG:', ...args);
}

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

function checkPasswordAgainstRecord(password, record) {
  debug('Checking Password');
  if (!record) {
    return Promise.reject('Invalid Record');
  }
  return new Promise(function(resolve, reject) {
    debug('Checking Record');
    checkPasswordHash(password, record.hashedPassword)
      .then(isGoodPassword => {
        if (isGoodPassword) {
          debug('Password is good');
          const payload = {
            userName: record.name
          };
          resolve(payload);
        } else {
          reject('Incorrect Password');
        }
     }, (error) => reject('Invalid Password ' + error));
  });
}
function checkPasswordHash(password, hash) {
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
  checkPasswordAgainstRecord
}
