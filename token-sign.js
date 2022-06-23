const jwt = require('jsonwebtoken');

//deberia estar en una variable de entorno
const secret = 'myCat';

//para hacer refresh tokens, tokens con tiempo de expiracion
//Luego lo pasamos como 3 paramtero a la funcion signtoken
const jwtConfig = {
  expiresIn: 120,
};

const payload = {
  sub: 1,
  role: 'customer',
};

function signToken(payload, secret,jwtConfig) {
  return jwt.sign(payload, secret,jwtConfig);
}

const token = signToken(payload, secret,jwtConfig);
console.log(token);
