module.exports = {
  JWTHashingAlgorithm: process.env.JWT_HASHING_ALGORITHM,
  JWTSecreteOrKey: process.env.JWT_SECRETE_OR_KEY,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  databaseURL: process.env.DATABASE_URL,
  port: process.env.PORT,
};
