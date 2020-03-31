import jwt from 'jsonwebtoken';
import config from '../config';

const algorithm = config.JWTHashingAlgorithm;
const privateKey = config.JWTSecreteOrKey;

function generateJWTToken(payload = {}) {
  const ONE_DAY = Math.floor(Date.now() / 1000) + 86400;
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(
        payload,
        privateKey,
        { algorithm, expiresIn: ONE_DAY },
        function (err, token) {
          if (err) {
            resolve({ success: false, error: err });
          }
          resolve({ success: true, token });
        },
      );
    } catch (err) {
      reject({ success: false, error: err });
    }
  });
}

function verifyJWT(token) {
  try {
    const userDetails = jwt.verify(token, privateKey);
    return { success: true, userDetails };
  } catch (err) {
    return { success: false, error: err };
  }
  // });
}

export { generateJWTToken, verifyJWT };
