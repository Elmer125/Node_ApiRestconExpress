
const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$JwZG2WT5ERdhUJOBBPNF9udl1PFYGqL8.0ktIn5rcKGYpbj0c5tdS';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
