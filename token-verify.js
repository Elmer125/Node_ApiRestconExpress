const jwt = require('jsonwebtoken');

//deberia estar en una variable de entorno
const secret = 'myCat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1MjIyMDIzMCwiZXhwIjoxNjUyMjIwMzUwfQ.V2xAERqhBPp3lAhaGZNyN1RFZLGqNE3W0xUTwOJ96bA';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
